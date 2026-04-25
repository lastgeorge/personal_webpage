#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rootDir = path.resolve(new URL('..', import.meta.url).pathname);
const publicationsPath = path.join(rootDir, 'src', 'assets', 'publications.json');

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

function parseArgs(argv) {
  const args = { _: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];

    if (!item.startsWith('--')) {
      args._.push(item);
      continue;
    }

    const [rawKey, rawValue] = item.slice(2).split('=');
    const key = rawKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

    if (rawValue !== undefined) {
      args[key] = rawValue;
    } else if (argv[i + 1] && !argv[i + 1].startsWith('--')) {
      args[key] = argv[i + 1];
      i += 1;
    } else {
      args[key] = true;
    }
  }

  return args;
}

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

function printCategories(data) {
  for (const category of getCategoryNames(data)) {
    const label = categoryLabels[category] || category;
    console.log(`${category.padEnd(32)} ${String(data[category].length).padStart(3)}  ${label}`);
  }
}

function validatePublication(publication, category, index) {
  const errors = [];
  const prefix = `${category}[${index}]`;

  if (!publication.title) {
    errors.push(`${prefix}: missing title`);
  }

  if (!publication.authors) {
    errors.push(`${prefix}: missing authors`);
  }

  if (!publication.year) {
    errors.push(`${prefix}: missing year`);
  } else if (!/^\d{4}$/.test(String(publication.year))) {
    errors.push(`${prefix}: year should be four digits`);
  }

  return errors;
}

function validateData(data) {
  const errors = [];

  for (const category of getCategoryNames(data)) {
    data[category].forEach((publication, index) => {
      errors.push(...validatePublication(publication, category, index));
    });
  }

  return errors;
}

function hasDuplicate(publications, publication) {
  const arxiv = normalizeOptional(publication.arxiv).toLowerCase();
  const title = normalizeOptional(publication.title).toLowerCase();

  return publications.some((existing) => {
    const existingArxiv = normalizeOptional(existing.arxiv).toLowerCase();
    const existingTitle = normalizeOptional(existing.title).toLowerCase();

    return (arxiv && existingArxiv === arxiv) || (title && existingTitle === title);
  });
}

async function promptForCategory(data, rl) {
  const categories = getCategoryNames(data);

  console.log('\nPublication categories:');
  categories.forEach((category, index) => {
    const label = categoryLabels[category] || category;
    console.log(`  ${index + 1}. ${category} - ${label}`);
  });

  while (true) {
    const answer = (await rl.question('\nCategory name or number: ')).trim();
    const selectedIndex = Number.parseInt(answer, 10);

    if (Number.isInteger(selectedIndex) && categories[selectedIndex - 1]) {
      return categories[selectedIndex - 1];
    }

    if (categories.includes(answer)) {
      return answer;
    }

    console.log('Please choose one of the listed categories.');
  }
}

async function promptForPublication(rl) {
  console.log('\nEnter the publication details. Leave optional fields blank if unavailable.');

  const publication = {};
  publication.title = await rl.question('Title: ');
  publication.authors = await rl.question('Authors: ');
  publication.arxiv = await rl.question('arXiv URL: ');
  publication.journal = await rl.question('Journal URL: ');
  publication.journalRef = await rl.question('Journal reference: ');
  publication.year = await rl.question('Year: ');

  return normalizePublication(publication);
}

async function addPublication(data, args) {
  let category = args.category;
  let publication = normalizePublication(args);

  if (!category || !publication.title || !publication.authors || !publication.year) {
    const rl = readline.createInterface({ input, output });

    try {
      if (!category) {
        category = await promptForCategory(data, rl);
      }

      publication = normalizePublication({
        ...publication,
        ...(await promptForPublication(rl))
      });
    } finally {
      rl.close();
    }
  }

  if (!Array.isArray(data[category])) {
    throw new Error(`Unknown category "${category}". Run "npm run pub:list" to see valid categories.`);
  }

  const errors = validatePublication(publication, category, data[category].length);

  if (errors.length) {
    throw new Error(`Cannot add publication:\n${errors.join('\n')}`);
  }

  if (hasDuplicate(data[category], publication)) {
    throw new Error('That publication already appears to be in this category.');
  }

  data[category].push(publication);
  sortPublications(data[category]);
  await writePublications(data);

  console.log(`Added "${publication.title}" to ${category}.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || 'help';
  const data = await readPublications();

  if (command === 'list') {
    printCategories(data);
    return;
  }

  if (command === 'validate') {
    const errors = validateData(data);

    if (errors.length) {
      console.error(errors.join('\n'));
      process.exitCode = 1;
      return;
    }

    console.log('Publication data looks good.');
    return;
  }

  if (command === 'add') {
    await addPublication(data, args);
    return;
  }

  console.log(`Usage:
  npm run pub:list
  npm run pub:validate
  npm run pub:add
  npm run pub:add -- --category dunePublications --title "Paper title" --authors "Author list" --year 2026 --arxiv "https://arxiv.org/abs/2601.00001" --journal "https://..." --journal-ref "Journal ref"

The helper updates src/assets/publications.json locally. The deployed website remains static.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
