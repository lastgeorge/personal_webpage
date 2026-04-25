#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
const publicationsPath = path.join(rootDir, 'src', 'assets', 'publications.json');
const host = '127.0.0.1';
const port = Number.parseInt(process.env.PUB_EDITOR_PORT || '4177', 10);

const fieldNames = ['title', 'authors', 'arxiv', 'journal', 'journalRef', 'year'];
const categoryLabels = {
  reviewPublications: 'Reviews',
  statisticsPublications: 'Statistics/Methods',
  dunePublications: 'DUNE Experiment',
  microboonePublications: 'MicroBooNE Experiment',
  detectorPublications: 'Detector Physics and Event Reconstruction in LArTPC',
  dayaBayPublications: 'Daya Bay Experiment',
  electronScatteringPublications: 'Electron Scattering',
  ideasPublications: 'Ideas'
};

async function readPublications() {
  const raw = await fs.readFile(publicationsPath, 'utf8');
  return JSON.parse(raw);
}

async function writePublications(data) {
  await fs.writeFile(publicationsPath, `${JSON.stringify(data, null, 2)}\n`);
}

function normalizeOptional(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
}

function normalizePublication(raw) {
  const publication = {};

  for (const fieldName of fieldNames) {
    const value = normalizeOptional(raw[fieldName]);

    if (value) {
      publication[fieldName] = value;
    }
  }

  return publication;
}

function sortPublications(publications) {
  publications.sort((left, right) => {
    const leftYear = Number.parseInt(left.year || '0', 10);
    const rightYear = Number.parseInt(right.year || '0', 10);

    if (rightYear !== leftYear) {
      return rightYear - leftYear;
    }

    return String(left.title || '').localeCompare(String(right.title || ''));
  });
}

function getCategoryNames(data) {
  return Object.keys(data).filter((key) => Array.isArray(data[key]));
}

function hasDuplicate(publications, publication, ignoreIndex = -1) {
  const arxiv = normalizeOptional(publication.arxiv).toLowerCase();
  const title = normalizeOptional(publication.title).toLowerCase();

  return publications.some((existing, index) => {
    if (index === ignoreIndex) {
      return false;
    }

    const existingArxiv = normalizeOptional(existing.arxiv).toLowerCase();
    const existingTitle = normalizeOptional(existing.title).toLowerCase();

    return (arxiv && existingArxiv === arxiv) || (title && existingTitle === title);
  });
}

function validatePublication(publication) {
  const errors = [];

  if (!publication.title) {
    errors.push('Title is required.');
  }

  if (!publication.authors) {
    errors.push('Authors are required.');
  }

  if (!publication.year) {
    errors.push('Year is required.');
  } else if (!/^\d{4}$/.test(String(publication.year))) {
    errors.push('Year should be four digits, for example 2026.');
  }

  return errors;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(payload));
}

function sendHtml(response) {
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(renderEditorPage());
}

async function readRequestJson(request) {
  let body = '';

  for await (const chunk of request) {
    body += chunk;

    if (body.length > 1024 * 1024) {
      throw new Error('Request body is too large.');
    }
  }

  return JSON.parse(body || '{}');
}

function makeSummary(data) {
  return getCategoryNames(data).map((key) => ({
    key,
    label: categoryLabels[key] || key,
    count: data[key].length,
    publications: data[key].map((publication, index) => ({
      ...publication,
      index
    }))
  }));
}

async function handleApiData(response) {
  const data = await readPublications();
  sendJson(response, 200, { categories: makeSummary(data) });
}

async function handleAddPublication(request, response) {
  const payload = await readRequestJson(request);
  const category = normalizeOptional(payload.category);
  const publication = normalizePublication(payload.publication || {});
  const data = await readPublications();

  if (!Array.isArray(data[category])) {
    sendJson(response, 400, { ok: false, errors: ['Please choose a valid category.'] });
    return;
  }

  const errors = validatePublication(publication);

  if (hasDuplicate(data[category], publication)) {
    errors.push('This publication appears to already be in the selected category.');
  }

  if (errors.length) {
    sendJson(response, 400, { ok: false, errors });
    return;
  }

  data[category].push(publication);
  sortPublications(data[category]);
  await writePublications(data);

  sendJson(response, 200, {
    ok: true,
    message: `Added "${publication.title}" to ${categoryLabels[category] || category}.`,
    categories: makeSummary(data)
  });
}

async function handleUpdatePublication(request, response) {
  const payload = await readRequestJson(request);
  const originalCategory = normalizeOptional(payload.originalCategory);
  const originalIndex = Number.parseInt(payload.originalIndex, 10);
  const category = normalizeOptional(payload.category);
  const publication = normalizePublication(payload.publication || {});
  const data = await readPublications();

  if (!Array.isArray(data[originalCategory]) || !data[originalCategory][originalIndex]) {
    sendJson(response, 400, { ok: false, errors: ['The publication being edited could not be found. Reload the editor and try again.'] });
    return;
  }

  if (!Array.isArray(data[category])) {
    sendJson(response, 400, { ok: false, errors: ['Please choose a valid category.'] });
    return;
  }

  const errors = validatePublication(publication);
  const ignoreIndex = originalCategory === category ? originalIndex : -1;

  if (hasDuplicate(data[category], publication, ignoreIndex)) {
    errors.push('Another publication in the selected category already has this title or arXiv URL.');
  }

  if (errors.length) {
    sendJson(response, 400, { ok: false, errors });
    return;
  }

  if (originalCategory === category) {
    data[category][originalIndex] = publication;
    sortPublications(data[category]);
  } else {
    data[originalCategory].splice(originalIndex, 1);
    data[category].push(publication);
    sortPublications(data[originalCategory]);
    sortPublications(data[category]);
  }

  await writePublications(data);

  sendJson(response, 200, {
    ok: true,
    message: `Updated "${publication.title}".`,
    categories: makeSummary(data)
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url || '/', `http://${host}:${port}`);

  try {
    if (request.method === 'GET' && url.pathname === '/') {
      sendHtml(response);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/api/data') {
      await handleApiData(response);
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/publications') {
      await handleAddPublication(request, response);
      return;
    }

    if (request.method === 'PUT' && url.pathname === '/api/publications') {
      await handleUpdatePublication(request, response);
      return;
    }

    sendJson(response, 404, { ok: false, errors: ['Not found.'] });
  } catch (error) {
    sendJson(response, 500, { ok: false, errors: [error.message] });
  }
}

function renderEditorPage() {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Publication Editor</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #f6f8fb;
        color: #172033;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
      }

      main {
        max-width: 1120px;
        margin: 0 auto;
        padding: 32px 20px 48px;
      }

      header {
        margin-bottom: 24px;
      }

      h1 {
        margin: 0 0 6px;
        font-size: 32px;
        line-height: 1.15;
      }

      p {
        color: #4b5565;
        line-height: 1.55;
      }

      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
        gap: 22px;
        align-items: start;
      }

      .panel {
        background: white;
        border: 1px solid #dfe5ee;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        padding: 22px;
      }

      label {
        display: block;
        margin: 0 0 6px;
        font-weight: 650;
      }

      input,
      select,
      textarea {
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font: inherit;
        padding: 10px 12px;
        background: #fff;
        color: #172033;
      }

      textarea {
        min-height: 92px;
        resize: vertical;
      }

      .field {
        margin-bottom: 16px;
      }

      .actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
      }

      button {
        border: 0;
        border-radius: 6px;
        padding: 10px 14px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .primary {
        background: #1d4ed8;
        color: white;
      }

      .secondary {
        background: #e8eef7;
        color: #24324a;
      }

      .status {
        margin-top: 14px;
        border-radius: 6px;
        padding: 12px;
        display: none;
      }

      .status.ok {
        display: block;
        background: #e8f7ef;
        color: #166534;
        border: 1px solid #b7e4c7;
      }

      .status.error {
        display: block;
        background: #fff1f2;
        color: #be123c;
        border: 1px solid #fecdd3;
      }

      .category {
        border-top: 1px solid #e5eaf1;
        padding: 14px 0;
      }

      .category:first-child {
        border-top: 0;
        padding-top: 0;
      }

      .category h3 {
        margin: 0 0 4px;
        font-size: 16px;
      }

      .category p {
        margin: 0 0 10px;
        font-size: 14px;
      }

      .pub-list {
        margin: 0;
        padding-left: 18px;
        color: #344054;
        font-size: 14px;
      }

      .pub-list li {
        margin: 6px 0;
      }

      .pub-item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 8px;
        align-items: start;
      }

      .pub-title {
        min-width: 0;
      }

      .edit-button {
        background: #eef4ff;
        color: #1d4ed8;
        padding: 5px 8px;
        font-size: 13px;
      }

      .muted {
        color: #667085;
      }

      @media (max-width: 860px) {
        .layout {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Publication Editor</h1>
        <p>This local page edits <code>src/assets/publications.json</code>. It runs only on your machine at 127.0.0.1 and is not part of the deployed public website.</p>
      </header>

      <div class="layout">
        <section class="panel">
          <h2 id="form-heading">Add Publication</h2>
          <form id="publication-form">
            <div class="field">
              <label for="category">Category</label>
              <select id="category" name="category" required></select>
            </div>

            <div class="field">
              <label for="title">Title</label>
              <textarea id="title" name="title" required></textarea>
            </div>

            <div class="field">
              <label for="authors">Authors</label>
              <textarea id="authors" name="authors" required></textarea>
            </div>

            <div class="field">
              <label for="year">Year</label>
              <input id="year" name="year" inputmode="numeric" pattern="[0-9]{4}" placeholder="2026" required />
            </div>

            <div class="field">
              <label for="arxiv">arXiv URL</label>
              <input id="arxiv" name="arxiv" placeholder="https://arxiv.org/abs/2601.00001" />
            </div>

            <div class="field">
              <label for="journal">Journal URL</label>
              <input id="journal" name="journal" placeholder="https://doi.org/..." />
            </div>

            <div class="field">
              <label for="journalRef">Journal Reference</label>
              <input id="journalRef" name="journalRef" placeholder="Phys. Rev. D 112, 012345 (2026)" />
            </div>

            <div class="actions">
              <button class="primary" type="submit" id="submit-button">Add Publication</button>
              <button class="secondary" type="button" id="reset-button">Clear Form</button>
            </div>

            <div id="status" class="status"></div>
          </form>
        </section>

        <aside class="panel">
          <h2>Current Categories</h2>
          <p class="muted">Showing counts and the most recent entries in each category.</p>
          <div id="categories"></div>
        </aside>
      </div>
    </main>

    <script>
      const form = document.querySelector('#publication-form');
      const categorySelect = document.querySelector('#category');
      const categoriesEl = document.querySelector('#categories');
      const statusEl = document.querySelector('#status');
      const resetButton = document.querySelector('#reset-button');
      const submitButton = document.querySelector('#submit-button');
      const formHeading = document.querySelector('#form-heading');
      let categoriesState = [];
      let editingRecord = null;

      function setStatus(type, messages) {
        statusEl.className = 'status ' + type;
        statusEl.innerHTML = Array.isArray(messages)
          ? messages.map((message) => '<div>' + escapeHtml(message) + '</div>').join('')
          : escapeHtml(messages);
      }

      function clearStatus() {
        statusEl.className = 'status';
        statusEl.textContent = '';
      }

      function clearEditMode() {
        editingRecord = null;
        formHeading.textContent = 'Add Publication';
        submitButton.textContent = 'Add Publication';
      }

      function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        })[character]);
      }

      function renderCategories(categories) {
        categoriesState = categories;
        const selected = categorySelect.value;
        categorySelect.innerHTML = categories.map((category) => (
          '<option value="' + escapeHtml(category.key) + '">' +
          escapeHtml(category.label) + ' (' + category.count + ')' +
          '</option>'
        )).join('');

        if (selected) {
          categorySelect.value = selected;
        }

        categoriesEl.innerHTML = categories.map((category) => {
          const items = category.publications.map((publication) => (
            '<li class="pub-item">' +
            '<span class="pub-title"><strong>' + escapeHtml(publication.year || '') + '</strong> ' +
            escapeHtml(publication.title || 'Untitled') + '</span>' +
            '<button class="edit-button" type="button" data-category="' + escapeHtml(category.key) + '" data-index="' + publication.index + '">Edit</button>' +
            '</li>'
          )).join('');

          return '<section class="category">' +
            '<h3>' + escapeHtml(category.label) + '</h3>' +
            '<p>' + category.count + ' publications</p>' +
            '<ol class="pub-list">' + items + '</ol>' +
            '</section>';
        }).join('');
      }

      function findPublication(categoryKey, index) {
        const category = categoriesState.find((item) => item.key === categoryKey);

        if (!category) {
          return null;
        }

        return category.publications.find((publication) => Number(publication.index) === Number(index)) || null;
      }

      function setField(name, value) {
        const field = form.elements.namedItem(name);

        if (field) {
          field.value = value || '';
        }
      }

      function startEditing(categoryKey, index) {
        const publication = findPublication(categoryKey, index);

        if (!publication) {
          setStatus('error', 'Could not find that publication. Reload the editor and try again.');
          return;
        }

        editingRecord = { category: categoryKey, index: Number(index) };
        categorySelect.value = categoryKey;
        setField('title', publication.title);
        setField('authors', publication.authors);
        setField('year', publication.year);
        setField('arxiv', publication.arxiv);
        setField('journal', publication.journal);
        setField('journalRef', publication.journalRef);
        formHeading.textContent = 'Edit Publication';
        submitButton.textContent = 'Save Changes';
        clearStatus();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      async function loadData() {
        const response = await fetch('/api/data');
        const data = await response.json();
        renderCategories(data.categories);
      }

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearStatus();

        const formData = new FormData(form);
        const payload = {
          category: formData.get('category'),
          publication: {
            title: formData.get('title'),
            authors: formData.get('authors'),
            year: formData.get('year'),
            arxiv: formData.get('arxiv'),
            journal: formData.get('journal'),
            journalRef: formData.get('journalRef')
          }
        };
        const isEditing = Boolean(editingRecord);

        if (isEditing) {
          payload.originalCategory = editingRecord.category;
          payload.originalIndex = editingRecord.index;
        }

        const response = await fetch('/api/publications', {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (!response.ok || !result.ok) {
          setStatus('error', result.errors || ['Unable to add publication.']);
          return;
        }

        setStatus('ok', result.message);
        form.reset();
        clearEditMode();
        renderCategories(result.categories);
      });

      resetButton.addEventListener('click', () => {
        form.reset();
        clearEditMode();
        clearStatus();
      });

      categoriesEl.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-category][data-index]');

        if (!button) {
          return;
        }

        startEditing(button.dataset.category, button.dataset.index);
      });

      loadData().catch((error) => {
        setStatus('error', error.message);
      });
    </script>
  </body>
</html>`;
}

const server = http.createServer(handleRequest);

server.listen(port, host, () => {
  console.log(`Publication editor is running at http://${host}:${port}/`);
  console.log('Press Ctrl+C to stop it.');
});
