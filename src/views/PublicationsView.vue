<template>
  <div class="publications">
    <h1 class="text-3xl font-bold mb-6">Selected Publications</h1>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Reviews</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in reviewPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Statistics/Methods</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in statisticsPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">MicroBooNE Experiment</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in microboonePublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Detector Physics and Event Reconstruction in LArTPC</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in detectorPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Daya Bay Experiment</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in dayaBayPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Electron Scattering Experiment</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in electronScatteringPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Idea and Pheno Work</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in ideasPublications" :key="index" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 class="text-lg font-semibold">{{ publication.title }}</h3>
          <p class="text-gray-700 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <span v-if="publication.year" class="text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <div class="text-center my-8">
      <a href="http://inspirehep.net/author/profile/Xin.Qian.1" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        View All Publications on INSPIRE
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PublicationsView',
  setup() {
    const reviewPublications = ref([
      {
        title: 'Reactor Antineutrino Flux and Anomaly',
        authors: 'C. Zhang, X. Qian, and M. Fallot',
        arxiv: 'http://arxiv.org/abs/arXiv:2310.13070',
        journal: 'https://www.sciencedirect.com/science/article/pii/S0146641024000103?dgcid=coauthor',
        journalRef: 'Prog. Part. Nucl. Phys. 140, 104062 (2024)',
        year: '2024'
      },
      {
        title: 'Physics with Reactor Neutrinos',
        authors: 'X. Qian and Jen-Chieh Peng',
        arxiv: 'http://arxiv.org/abs/arXiv:1801.05386',
        journal: 'http://iopscience.iop.org/article/10.1088/1361-6633/aae881',
        journalRef: 'Rep. Prog. Phys. 82, 036201 (2019)',
        year: '2019'
      },
      {
        title: 'Long-Baseline Neutrino Experiments',
        authors: 'M. V. Diwan, V. Galymov, X. Qian, and A. Rubbia',
        arxiv: 'http://arxiv.org/abs/arXiv:1608.06237',
        journal: 'http://www.annualreviews.org/eprint/yCFIKtQWquy4t4dRAyyh/full/10.1146/annurev-nucl-102014-021939',
        journalRef: 'Annu. Rev. Nucl. Part. Sci. 66, 47 (2016)',
        year: '2016'
      },
      {
        title: 'Neutrino Mass Hierarchy',
        authors: 'Xin Qian and Petr Vogel',
        arxiv: 'http://arxiv.org/abs/1505.01891',
        journal: 'http://www.sciencedirect.com/science/article/pii/S0146641015000307',
        journalRef: 'Prog. Part. Nucl. Phys. 83, 1-30 (2015)',
        year: '2015'
      }
    ]);
    
    const statisticsPublications = ref([
      {
        title: 'Data-driven model validation for neutrino-nucleus cross section measurements',
        authors: 'MicroBooNE collaboration',
        arxiv: 'https://arxiv.org/abs/2411.03280',
        journal: null,
        year: '2024'
      },
      {
        title: 'Improving neutrino energy estimation of charged-current interaction events with recurrent neural networks in MicroBooNE',
        authors: 'MicroBooNE collaboration',
        arxiv: 'https://arxiv.org/abs/2406.10123',
        journal: 'https://journals.aps.org/prd/abstract/10.1103/PhysRevD.110.092010',
        journalRef: 'Phys. Rev. D 110, 092010 (2024)',
        year: '2024'
      },
      {
        title: 'Waveform resampling with LMN method',
        authors: 'L. Gerlach et al.',
        arxiv: 'https://arxiv.org/abs/2407.21750',
        journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/19/10/P10029',
        journalRef: 'JINST 19, P10029 (2024)',
        year: '2024'
      },
      {
        title: 'Combined Neyman-Pearson Chi-square: An Improved Approximation of Poisson-likelihood Chi-square',
        authors: 'X. Ji et al.',
        arxiv: 'https://arxiv.org/abs/1903.07185',
        journal: 'http://doi.org/10.1016/j.nima.2020.163677',
        journalRef: 'Nucl. Instrum. Methods A 961, 163677 (2020)',
        year: '2020'
      },
      {
        title: 'Data Unfolding with Wiener-SVD Method',
        authors: 'W. Tang et al.',
        arxiv: 'https://arxiv.org/abs/1705.03568',
        journal: 'https://doi.org/10.1088/1748-0221/12/10/P10002',
        journalRef: 'JINST 12, P10002 (2017)',
        year: '2017'
      },
      {
        title: 'CLs Method at Gaussian Limit to Present Searches',
        authors: 'Xin Qian et al.',
        arxiv: 'https://arxiv.org/abs/1407.5052',
        journal: 'https://doi.org/10.1016/j.nima.2016.04.089',
        journalRef: 'Nucl. Instrum. Methods A 827, 63-70 (2016)',
        year: '2016'
      },
      {
        title: 'Statistical Evaluation of Experimental Determinations of Neutrino Mass Hierarchy',
        authors: 'Xin Qian et al.',
        arxiv: 'https://arxiv.org/abs/1210.3651',
        journal: 'https://doi.org/10.1103/PhysRevD.86.113011',
        journalRef: 'Phys. Rev. D 86, 113011 (2012)',
        year: '2012'
      }
    ]);
    
    const microboonePublications = ref([
      {
        title: 'First double differential cross section of neutral-current pi0 production in neutrino-argon scattering in the MicroBooNE detector',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2404.10948',
        journal: null,
        year: '2024'
      },
      {
        title: 'First simultaneous measurement of differential muon-neutrino charged-current cross sections on argon for final states with and without protons using MicroBooNE data',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2402.19281',
        journal: 'https://doi.org/10.1103/PhysRevLett.133.041801',
        journalRef: 'PRL 113, 041801 (2024)',
        year: '2024'
      },
      {
        title: 'Inclusive cross section measurements in final states with and without protons for charged-current numu-Ar scattering in MicroBooNE',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2402.19216',
        journal: 'https://doi.org/10.1103/PhysRevD.110.013006',
        journalRef: 'PRD, 110, 013006 (2024)',
        year: '2024'
      },
      {
        title: 'Measurement of triple-differential inclusive muon-neutrino charged-current cross section on argon with the MicroBooNE detector',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2307.06413',
        journal: null,
        year: '2023'
      },
      {
        title: 'First constraints on light sterile neutrino oscillations from combined appearance and disappearance searches with the MicroBooNE detectors',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2210.10216',
        journal: 'https://doi.org/10.1103/PhysRevLett.130.011801',
        journalRef: 'Phys. Rev. Lett. 130, 011801 (2023)',
        year: '2023'
      },
      {
        title: 'Search for an Excess of Electron Neutrino Interactions in MicroBooNE using Multiple Final State Topologies',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2110.14054',
        journal: 'https://doi.org/10.1103/PhysRevLett.128.241801',
        journalRef: 'Phys. Rev. Lett. 128, 241801 (2022)',
        year: '2022'
      },
      {
        title: 'Search for an anomalous excess of inclusive charged-current electron neutrino interactions in the MicroBooNE experiment using Wire-Cell reconstruction',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2110.13978',
        journal: 'https://doi.org/10.1103/PhysRevD.105.112005',
        journalRef: 'Phys. Rev. D105, 112005 (2022)',
        year: '2022'
      },
      {
        title: 'First Measurement of Energy-dependent Inclusive Muon Neutrino Charged-Current Cross Sections on Argon with the MicroBooNE Detector',
        authors: 'MicroBooNE Collaboration',
        arxiv: 'http://arxiv.org/abs/2110.14023',
        journal: 'https://doi.org/10.1103/PhysRevLett.128.151801',
        journalRef: 'Phys. Rev. Lett. 128, 151801 (2022)',
        year: '2022'
      }
    ]);
    
    const detectorPublications = ref([
      {
      title: 'Three-dimensional Imaging for Large LArTPCs',
      authors: 'X. Qian, C. Zhang, B. Viren and M. Diwan',
      arxiv: 'http://arxiv.org/abs/1803.04850',
      journal: 'https://doi.org/10.1088/1748-0221/13/05/P05032',
      journalRef: 'JINST 13, P05032 (2018)',
      year: '2018'
      },
      {
      title: 'A hybrid 3D/2D field response calculation for liquid argon detectors with PCB based anode plane',
      authors: 'S. Martynenko et al.',
      arxiv: 'https://arxiv.org/abs/2303.10224',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/18/04/P04033',
      year: '2023'
      },
      {
      title: 'Wire-Cell 3D Pattern Recognition Techniques for Neutrino Event Reconstruction in Large LArTPCs: Algorithm Description and Quantitative Evaluation with MicroBooNE simulation',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'http://arxiv.org/abs/2110.13961',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/17/01/P01037',
      year: '2022'
      },
      {
      title: 'High-performance Generic Neutrino Detection in a LArTPC near the Earth\'s Surface with the MicroBooNE Detector',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/2012.07928',
      journal: null,
      journalRef: 'arXiv:2012.07928 (2021)',
      year: '2021'
      },
      {
      title: 'Cosmic Ray Background Rejection with Wire-Cell LArTPC Event Reconstruction in the MicroBooNE Detector',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/2101.05076',
      journal: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.15.064071',
      journalRef: 'Phys. Rev. Applied 15, 064071 (2021)',
      year: '2021'
      },
      {
      title: 'Neutrino Event Selection in the MicroBooNE Liquid Argon Time Projection Chamber using Wire-Cell 3-D Imaging, Clustering, and Charge-Light Matching',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/2011.01375',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/16/06/P06043',
      journalRef: 'JINST 16, P06043 (2021)',
      year: '2021'
      },
      {
      title: 'Augmented Signal Processing in Liquid Argon Time Projection Chamber',
      authors: 'H. Yu et al.',
      arxiv: 'https://arxiv.org/abs/2007.12743',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/16/01/P01036',
      journalRef: 'JINST 16, P01036 (2020)',
      year: '2020'
      },
      {
      title: 'Ionization Electron Signal Processing in Single Phase LArTPCs I. Algorithm Description and Quantitative Evaluation with MicroBooNE Simulation',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/1802.08709',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/13/07/P07006',
      journalRef: 'JINST 13, P07006 (2018)',
      year: '2018'
      },
      {
      title: 'Ionization Electron Signal Processing in Single Phase LArTPCs II. Data/Simulation Comparison and Performance in MicroBooNE',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/1804.02583',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/13/07/P07007',
      journalRef: 'JINST 13, P07007 (2018)',
      year: '2018'
      },
      {
      title: 'Noise Characterization and Filtering in the MicroBooNE Liquid Argon TPC',
      authors: 'MicroBooNE Collaboration',
      arxiv: 'https://arxiv.org/abs/1705.07341',
      journal: 'https://iopscience.iop.org/article/10.1088/1748-0221/12/08/P08003',
      journalRef: 'JINST 12, P08003 (2017)',
      year: '2017'
      }
    ]);

    const dayaBayPublications = ref([
      {
      title: 'Observation of electron-antineutrino disappearance at Daya Bay',
      authors: 'F. P. An et al (Daya Bay Collaboration)',
      arxiv: 'https://arxiv.org/abs/1203.1669',
      journal: 'https://doi.org/10.1103/PhysRevLett.108.171803',
      journalRef: 'Phys. Rev. Lett. 108, 171803 (2012)',
      year: '2012'
      },
      {
      title: 'New Measurement of Antineutrino Oscillation with the Full Detector Configuration at Daya Bay',
      authors: 'Daya Bay Collaboration',
      arxiv: 'https://arxiv.org/abs/1505.03456',
      journal: 'https://doi.org/10.1103/PhysRevLett.115.111802',
      journalRef: 'Phys. Rev. Lett. 115, 111802 (2015)',
      year: '2015'
      },
      {
      title: 'First Search for a Sterile Neutrino at Daya Bay',
      authors: 'Daya Bay Collaboration',
      arxiv: 'https://arxiv.org/abs/1407.7259',
      journal: 'https://doi.org/10.1103/PhysRevLett.113.141802',
      year: '2014'
      },
      {
      title: 'Measurement of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      authors: 'Daya Bay Collaboration',
      arxiv: 'https://arxiv.org/abs/1508.04233',
      journal: 'https://doi.org/10.1103/PhysRevLett.116.061801',
      year: '2016'
      },
      {
      title: 'Evolution of the Reactor Antineutrino Flux and Spectrum at Daya Bay',
      authors: 'Daya Bay Collaboration',
      arxiv: 'https://arxiv.org/abs/1704.01082',
      journal: 'https://doi.org/10.1103/PhysRevLett.118.251801',
      year: '2017'
      },
      {
        title: 'Improved Search for a Light Sterile Neutrino with the Full Configuration of the Daya Bay Experiment',
        authors: 'Daya Bay Collaboration',
        arxiv: 'https://arxiv.org/abs/1607.01174',
        journal: 'https://doi.org/10.1103/PhysRevLett.117.151802',
        journalRef: 'Phys. Rev. Lett. 117, 151802 (2016)',
        year: '2016'
      },
      {
        title: 'Limits on Active to Sterile Neutrino Oscillations from Disappearance Searches in the MINOS, Daya Bay, and Bugey-3 Experiments',
        authors: 'Daya Bay and MINOS Collaborations',
        arxiv: 'https://arxiv.org/abs/1607.01177',
        journal: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.117.151801',
        journalRef: 'Phys. Rev. Lett. 117, 151801 (2016)',
        year: '2016'
      }
    ]);

    const ideasPublications = ref([
      {
        title: 'Reactor Antieutrino Anomaly with known theta13',
        authors: 'C. Zhang, X. Qian, and P. Vogel',
        arxiv: 'http://arxiv.org/abs/1303.0900',
        journal: 'https://journals.aps.org/prd/abstract/10.1103/PhysRevD.87.073018',
        journalRef: 'Phys. Rev. D87, 073018 (2013)',
        year: '2013'
      },
      {
        title: 'Mass Hierarchy Resolution in Reactor Anti-neutrino Experiment: Parameter Degeneracies and Detector Energy Response',
        authors: 'Xin Qian et al.',
        arxiv: 'http://arxiv.org/abs/1208.1551',
        journal: 'https://journals.aps.org/prd/abstract/10.1103/PhysRevD.87.033005',
        journalRef: 'Phys. Rev. D87, 033005 (2013)',
        year: '2013'
      },
      {
        title: 'Unitarity Tests of the Neutrino Mixing Matrix',
        authors: 'X. Qian et al.',
        arxiv: 'http://arxiv.org/abs/1308.5700',
        journal: null,
        year: '2013'
      },
      {
        title: 'A Second Detector Focusing on the Second Oscillation Maximum at an Off-axis Location to Enhance the Mass Hierarchy Discovery Potential in LBNE10',
        authors: 'X. Qian et al.',
        arxiv: 'http://arxiv.org/abs/1307.7406',
        journal: null,
        year: '2013'
      }
    ]);

    const electronScatteringPublications = ref([
      {
        title: 'Single Spin Asymmetries in Charged Pion Production from Semi-Inclusive Deep Inelastic Scattering on a Transversely Polarized 3He Target',
        authors: 'X. Qian et al.',
        arxiv: 'https://arxiv.org/abs/1106.0363',
        journal: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.107.072003',
        journalRef: 'PRL 107, 072003 (2011)',
        year: '2011'
      },
      {
        title: 'Beam-Target Double-Spin Asymmetry 𝐴LT in Charged Pion Production from Deep Inelastic Scattering on a Transversely Polarized 3He Target at 1.4 <𝑄2 <2.7 GeV2',
        authors: 'J. Huang et al.',
        arxiv: 'https://arxiv.org/abs/1108.0489',
        journal: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.108.052001',
        journalRef: 'PRL 108, 052001 (2012)',
        year: '2012'
      },
      {
        title: 'Measurement of nuclear transparency for the A(e, e\') reaction',
        authors: 'B. Clasie, Xin Qian et al.',
        arxiv: 'https://arxiv.org/abs/0707.1481',
        journal: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.99.242502',
        journalRef: 'PRL 99, 242502 (2007)',
        year: '2007'
      },
      {
        title: 'Measurement of the Target-Normal Single Spin Asymmetry in the Inclusive Deep-Inelastic Scattering Region from the reaction 3He(e,e\')',
        authors: 'J. Katich, X. Qian et al.',
        arxiv: 'https://arxiv.org/abs/1311.0197',
        journal: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.113.022502',
        journalRef: 'PRL 113, 022502 (2014)',
        year: '2014'
      },
      {
        title: 'The extraction of phi-N total cross section from d(gamma,pK+K-)n',
        authors: 'X. Qian et al.',
        arxiv: 'https://arxiv.org/abs/0907.2668',
        journal: 'https://www.sciencedirect.com/science/article/abs/pii/S037026930900949X',
        journalRef: 'PLB 680, 417 (2009)',
        year: '2009'
      },
      {
        title: 'Study of the A(e,e\'pi+) Reaction on 1H, 2H, 12C, 27Al, 64Cu, and 197Au',
        authors: 'X. Qian et al.',
        arxiv: 'https://arxiv.org/abs/0908.1616',
        journal: 'https://journals.aps.org/prc/abstract/10.1103/PhysRevC.81.055209',
        journalRef: 'PRC 81, 055209 (2010)',
        year: '2010'
      },
      {
        title: 'Transverse Spin Structure of the Nucleon through Target Single Spin Asymmetry in Semi-Inclusive-Deep-Inelastic (e,e\'pi+-) Reaction at Jefferson Lab',
        authors: 'H. Gao et al.',
        arxiv: 'https://arxiv.org/abs/1009.3803',
        journal: 'https://link.springer.com/article/10.1140/epjp/i2011-11002-4',
        journalRef: 'Eur. Phys. J. Plus 126:2 (2011)',
        year: '2011'
      },
      {
        title: 'Transverse Momentum Dependent Parton Distribution/Fragmentation Functions at an Electron-Ion Collider',
        authors: 'M. Anselmino et al.',
        arxiv: 'https://arxiv.org/abs/1101.4199',
        journal: 'https://link.springer.com/article/10.1140/epja/i2011-11035-2',
        journalRef: 'Eur. Phys. J. A47, 35 (2011)',
        year: '2011'
      }
    ]);
    
    return {
      reviewPublications,
      statisticsPublications,
      microboonePublications,
      detectorPublications,
      dayaBayPublications,
      electronScatteringPublications,
      ideasPublications
    }
  }
})
</script>