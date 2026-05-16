<template>
  <div class="publications">
    <h1 class="text-3xl font-bold mb-6 dark:text-white">Selected Publications</h1>
    
    <!-- Show loading or error message -->
    <div v-if="loadError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <p>{{ loadError }}</p>
      <p class="text-sm mt-2">Please make sure the publications.json file is correctly placed in the assets folder.</p>
    </div>

    <!-- Debug info -->
    <div v-if="showDebug" class="bg-gray-100 dark:bg-gray-800 p-4 mb-4 rounded text-sm dark:text-gray-300">
      <p>Data loaded: {{ dataLoaded ? 'Yes' : 'No' }}</p>
      <p>Review publications count: {{ reviewPublications.length }}</p>
      <p>Stats publications count: {{ statisticsPublications.length }}</p>
      <p>DUNE publications count: {{ dunePublications.length }}</p>
    </div>
    
    <!-- Add search bar -->
    <div class="mb-8">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search publications..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark-surface dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
      >
    </div>

    <section v-if="filteredReviewPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Reviews</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredReviewPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section v-if="filteredStatisticsPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Statistics/Methods</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredStatisticsPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <!-- Similar content structure as review publications section -->
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <!-- Same link/button structure as above -->
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section v-if="filteredDunePublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">DUNE Experiment</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredDunePublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional sections for other publication categories follow the same structure -->
    <section v-if="filteredMicroboonePublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">MicroBooNE Experiment</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredMicroboonePublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <!-- Same structure as above -->
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <!-- Links and buttons -->
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Sections for remaining publication categories -->
    <section v-if="filteredDetectorPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Detector Physics and Event Reconstruction in LArTPC</h2>
      <!-- Same grid structure for publications -->
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredDetectorPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <!-- Publication details and links -->
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <!-- Links and buttons -->
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
    <section v-if="filteredDayaBayPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Daya Bay Experiment</h2>
      <!-- Same structure for publications -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Publication items follow the same pattern -->
        <div v-for="(publication, index) in filteredDayaBayPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <!-- Links and buttons -->
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="filteredElectronScatteringPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Electron Scattering Experiment</h2>
      <!-- Same structure for publications -->
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredElectronScatteringPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <!-- Links and buttons -->
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="filteredIdeasPublications.length > 0" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Idea and Pheno Work</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(publication, index) in filteredIdeasPublications" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow hover:shadow-lg transition dark:shadow-gray-800">
          <h3 class="text-lg font-semibold dark:text-white">{{ publication.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 italic">{{ publication.authors }}</p>
          <p v-if="publication.journalRef" class="text-gray-600 dark:text-gray-400 mt-2 text-sm font-medium">{{ publication.journalRef }}</p>
          <div class="mt-3 flex flex-wrap gap-4">
            <a v-if="publication.arxiv" :href="publication.arxiv" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              arXiv
            </a>
            <a v-if="publication.journal" :href="publication.journal" class="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Journal
            </a>
            <a v-if="publication.arxiv" :href="getInspireLink(publication.arxiv)" class="text-purple-600 dark:text-purple-400 hover:underline flex items-center" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Inspire
            </a>
            <button v-if="publication.arxiv" @click="showCitation(publication)" class="text-green-600 dark:text-green-400 hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Cite
            </button>
            <span v-if="publication.year" class="text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ publication.year }}
            </span>
          </div>
        </div>
      </div>
    </section>
    
   
    
    <div v-if="noResults" class="text-center py-8 text-gray-500 dark:text-gray-400">
      No publications found matching your search.
    </div>

    <div class="text-center my-8">
      <a href="http://inspirehep.net/author/profile/Xin.Qian.1" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        View All Publications on INSPIRE
      </a>
    </div>

    <Teleport to="body">
      <!-- Add citation modal -->
      <div v-if="showCitationModal" class="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50 px-4 py-6" @click="closeCitation">
        <div class="bg-white dark:bg-dark-surface rounded-lg shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden dark:text-white" @click.stop>
          <div class="flex justify-between items-start gap-4 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
            <div>
              <p class="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">BibTeX citation</p>
              <h3 class="text-xl font-bold mt-1">Copy citation</h3>
              <p v-if="citationTitle" class="text-sm text-gray-600 dark:text-gray-300 mt-2">{{ citationTitle }}</p>
            </div>
            <button @click="closeCitation" class="shrink-0 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white" aria-label="Close citation dialog">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div v-if="loadingCitation" class="px-6 py-12 text-center">
            <div class="inline-block animate-spin rounded-full h-9 w-9 border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400"></div>
            <p class="mt-4 font-medium">Fetching citation from INSPIRE...</p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">This usually takes just a moment.</p>
          </div>
          <div v-else-if="citationError" class="px-6 py-8">
            <div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
              <p class="font-semibold">Citation not available</p>
              <p class="mt-1 text-sm">{{ citationError }}</p>
              <a v-if="citationInspireLink" :href="citationInspireLink" target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex text-sm font-medium text-red-700 underline dark:text-red-300">
                Open this record on INSPIRE
              </a>
            </div>
          </div>
          <div v-else class="px-6 py-5">
            <pre class="bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed max-h-[48vh] whitespace-pre-wrap">{{ citationText }}</pre>
            <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p class="text-sm text-gray-500 dark:text-gray-400">BibTeX from INSPIRE. You can paste it directly into your .bib file.</p>
              <button @click="copyCitation" class="inline-flex justify-center items-center rounded bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition">
                {{ copySuccess ? 'Copied' : 'Copy BibTeX' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
// Import the publications JSON (this works in Vite-based Vue projects)
import publicationsJSON from '../assets/publications.json'

// Define publication type
interface Publication {
  title: string;
  authors: string;
  arxiv: string;
  journal: string | null;
  journalRef?: string;
  year: string;
}

export default defineComponent({
  name: 'PublicationsView',
  setup() {
    const searchQuery = ref('')
    const showCitationModal = ref(false)
    const citationText = ref('')
    const citationTitle = ref('')
    const citationInspireLink = ref('')
    const loadingCitation = ref(false)
    const citationError = ref('')
    const copySuccess = ref(false)
    const dataLoaded = ref(false)
    const loadError = ref('')
    const showDebug = ref(false) // Set to true only if you need to debug
    
    // Initialize with proper types
    const reviewPublications = ref<Publication[]>([]);
    const statisticsPublications = ref<Publication[]>([]);
    const microboonePublications = ref<Publication[]>([]);
    const detectorPublications = ref<Publication[]>([]);
    const dayaBayPublications = ref<Publication[]>([]);
    const electronScatteringPublications = ref<Publication[]>([]);
    const ideasPublications = ref<Publication[]>([]);
    const dunePublications = ref<Publication[]>([]); // Add DUNE publications

    // Load data from JSON file
    onMounted(() => {
      try {
        // Assign data from the imported JSON
        reviewPublications.value = publicationsJSON.reviewPublications || [];
        statisticsPublications.value = publicationsJSON.statisticsPublications || [];
        microboonePublications.value = publicationsJSON.microboonePublications || [];
        detectorPublications.value = publicationsJSON.detectorPublications || [];
        dayaBayPublications.value = publicationsJSON.dayaBayPublications || [];
        electronScatteringPublications.value = publicationsJSON.electronScatteringPublications || [];
        ideasPublications.value = publicationsJSON.ideasPublications || [];
        dunePublications.value = publicationsJSON.dunePublications || []; // Load DUNE publications
        
        dataLoaded.value = true;
        
        // Log for debugging
        console.log("Publications data loaded from JSON:", {
          review: reviewPublications.value.length,
          statistics: statisticsPublications.value.length,
          microboone: microboonePublications.value.length,
          detector: detectorPublications.value.length,
          dayaBay: dayaBayPublications.value.length,
          electronScattering: electronScatteringPublications.value.length,
          ideas: ideasPublications.value.length,
          dune: dunePublications.value.length // Log DUNE publications count
        });
      } catch (error) {
        console.error("Error loading publications data:", error);
        loadError.value = `Failed to load publications: ${error instanceof Error ? error.message : String(error)}`;
      }
    });

    const filterPublications = (publications: Publication[]) => {
      const query = searchQuery.value.toLowerCase()
      if (!query) return publications
      return publications.filter(pub => 
        pub.title.toLowerCase().includes(query) || 
        pub.authors.toLowerCase().includes(query) || 
        (pub.journalRef && pub.journalRef.toLowerCase().includes(query)) ||
        (pub.year && pub.year.toString().includes(query))
      )
    }

    const filteredReviewPublications = computed(() => filterPublications(reviewPublications.value))
    const filteredStatisticsPublications = computed(() => filterPublications(statisticsPublications.value))
    const filteredMicroboonePublications = computed(() => filterPublications(microboonePublications.value))
    const filteredDetectorPublications = computed(() => filterPublications(detectorPublications.value))
    const filteredDayaBayPublications = computed(() => filterPublications(dayaBayPublications.value))
    const filteredElectronScatteringPublications = computed(() => filterPublications(electronScatteringPublications.value))
    const filteredIdeasPublications = computed(() => filterPublications(ideasPublications.value))
    const filteredDunePublications = computed(() => filterPublications(dunePublications.value)) // Add filtered DUNE publications

    const noResults = computed(() => {
      return !filteredReviewPublications.value.length &&
             !filteredStatisticsPublications.value.length &&
             !filteredMicroboonePublications.value.length &&
             !filteredDetectorPublications.value.length &&
             !filteredDayaBayPublications.value.length &&
             !filteredElectronScatteringPublications.value.length &&
             !filteredIdeasPublications.value.length &&
             !filteredDunePublications.value.length // Add DUNE to no results check
    })

    const extractArxivId = (arxivUrl: string) => {
      const decodedUrl = decodeURIComponent(arxivUrl.trim());
      const normalizedUrl = decodedUrl.replace(/\/$/, '');

      // Handle both new-style (2404.10948) and old-style (hep-ex/0307001) arXiv IDs.
      const arxivMatch = normalizedUrl.match(/arxiv\.org\/(?:abs|pdf)\/([a-zA-Z-]+\/\d{7}|\d{4}\.\d{4,5})(?:v\d+)?(?:\.pdf)?$/i);
      if (arxivMatch?.[1]) {
        return arxivMatch[1];
      }

      const directMatch = normalizedUrl.match(/([a-zA-Z-]+\/\d{7}|\d{4}\.\d{4,5})(?:v\d+)?(?:\.pdf)?$/);
      return directMatch?.[1] || '';
    };

    // Get InspireHEP link from arXiv URL
    const getInspireLink = (arxivUrl: string) => {
      const arxivId = extractArxivId(arxivUrl);
      return arxivId
        ? `https://inspirehep.net/literature?q=eprint:${encodeURIComponent(arxivId)}`
        : arxivUrl;
    };

    // Fetch citation from InspireHEP API
    const showCitation = async (publication: Publication) => {
      showCitationModal.value = true;
      loadingCitation.value = true;
      citationError.value = '';
      citationText.value = '';
      citationTitle.value = publication.title;
      citationInspireLink.value = '';
      copySuccess.value = false;

      try {
        const arxivId = extractArxivId(publication.arxiv);
        if (!arxivId) {
          throw new Error('The arXiv identifier could not be read for this publication.');
        }

        citationInspireLink.value = getInspireLink(publication.arxiv);
        const response = await fetch(`https://inspirehep.net/api/literature?q=eprint:${encodeURIComponent(arxivId)}`, {
          headers: {
            Accept: 'application/x-bibtex'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch citation: ${response.statusText}`);
        }

        const data = (await response.text()).trim();
        if (!data || !data.startsWith('@')) {
          throw new Error(`INSPIRE did not return a BibTeX entry for arXiv:${arxivId}.`);
        }

        citationText.value = data;
      } catch (error) {
        console.error('Error fetching citation:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        citationError.value = errorMessage;
      } finally {
        loadingCitation.value = false;
      }
    };

    const closeCitation = () => {
      showCitationModal.value = false;
      copySuccess.value = false;
    };

    const copyCitation = () => {
      navigator.clipboard.writeText(citationText.value).then(() => {
        copySuccess.value = true;
        window.setTimeout(() => {
          copySuccess.value = false;
        }, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        citationError.value = 'The citation is visible, but your browser blocked clipboard access. Please select and copy the BibTeX text manually.';
      });
    };

    return {
      searchQuery,
      reviewPublications,
      statisticsPublications,
      microboonePublications,
      detectorPublications,
      dayaBayPublications,
      electronScatteringPublications,
      ideasPublications,
      dunePublications, // Add to return
      filteredReviewPublications,
      filteredStatisticsPublications,
      filteredMicroboonePublications,
      filteredDetectorPublications,
      filteredDayaBayPublications,
      filteredElectronScatteringPublications,
      filteredIdeasPublications,
      filteredDunePublications, // Add to return
      noResults,
      getInspireLink,
      showCitation,
      closeCitation,
      showCitationModal,
      citationText,
      citationTitle,
      citationInspireLink,
      loadingCitation,
      citationError,
      copySuccess,
      copyCitation,
      dataLoaded,
      loadError,
      showDebug
    }
  }
})
</script>
