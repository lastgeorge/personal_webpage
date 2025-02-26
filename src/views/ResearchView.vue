<template>
  <div class="research">
    <h1 class="text-3xl font-bold mb-6 dark:text-white">Research Projects</h1>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Major Research Projects</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(project, index) in majorProjects" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 dark:shadow-gray-800">
          <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ project.title }}</h3>
          <p class="mb-4 text-gray-700 dark:text-gray-300">{{ project.description }}</p>
          <div class="flex space-x-2">
            <a :href="project.url" class="text-blue-600 dark:text-blue-400 hover:underline">Project Website</a>
            <span v-if="project.docDb" class="text-gray-400 dark:text-gray-500">|</span>
            <a v-if="project.docDb" :href="project.docDb" class="text-blue-600 dark:text-blue-400 hover:underline">Documentation</a>
          </div>
        </div>
      </div>
    </section>
    
    <section>
      <h2 class="text-2xl font-bold mb-4 border-b pb-2 dark:text-white dark:border-gray-700">Past Research Projects</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(project, index) in pastProjects" :key="index" class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 dark:shadow-gray-800">
          <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ project.title }}</h3>
          <p class="mb-4 text-gray-700 dark:text-gray-300">{{ project.description }}</p>
          <div class="flex space-x-2 flex-wrap">
            <a :href="project.url" class="text-blue-600 dark:text-blue-400 hover:underline">Project Website</a>
            <span v-if="project.additionalLinks && project.additionalLinks.length" class="text-gray-400 dark:text-gray-500">|</span>
            <template v-if="project.additionalLinks && project.additionalLinks.length">
              <div v-for="(link, linkIndex) in project.additionalLinks" :key="linkIndex" class="flex items-center">
                <a :href="link.url" class="text-blue-600 dark:text-blue-400 hover:underline">{{ link.title }}</a>
                <span v-if="linkIndex < project.additionalLinks.length - 1" class="text-gray-400 dark:text-gray-500 mx-1">|</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ResearchView',
  setup() {
    const majorProjects = ref([
      {
        title: 'Deep Underground Neutrino Experiment (DUNE)',
        description: 'A leading-edge international experiment for neutrino science and proton decay studies.',
        url: 'https://dune.bnl.gov/wiki/Main_Page',
        docDb: 'http://docs.dunescience.org:8080/cgi-bin/DocumentDatabase'
      },
      {
        title: 'Wire-Cell Tomographic Reconstruction',
        description: 'Development of advanced tomographic reconstruction techniques for Liquid Argon Time Projection Chambers.',
        url: 'http://www.phy.bnl.gov/wire-cell/',
        docDb: null
      },
      {
        title: 'MicroBooNE Experiment',
        description: 'A liquid argon time projection chamber (LArTPC) neutrino experiment studying neutrino interactions.',
        url: 'http://www-microboone.fnal.gov/',
        docDb: 'http://microboone-docdb.fnal.gov:8080/cgi-bin/DocumentDatabase/'
      },
      {
        title: 'Fundamental Properties of Liquid Argon',
        description: 'Research into the fundamental physical properties of liquid argon for neutrino detection.',
        url: 'http://lar.bnl.gov/properties/',
        docDb: null
      },
      {
        title: 'PIONEER Experiment',
        description: 'An experiment aimed at studying rare pion decay processes.',
        url: 'https://www.psi.ch/en/pioneer',
        docDb: 'https://pioneer.npl.washington.edu/cgi-bin/private/ListBy?alldocs=1'
      }
    ]);
    
    const pastProjects = ref([
      {
        title: 'Daya Bay Experiment',
        description: 'A reactor neutrino experiment designed to measure the neutrino mixing angle θ13.',
        url: 'http://www.phy.bnl.gov/edg/w/Daya_Bay',
        additionalLinks: [
          { title: 'Documentation', url: 'http://dayawane.ihep.ac.cn/cgi-bin/DocDB/DocumentDatabase' }
        ]
      },
      {
        title: 'SoLID Neutron Transversity @ 12 GeV',
        description: 'Research on neutron transversity using the SoLID detector at Jefferson Lab.',
        url: 'http://hallaweb.jlab.org/12GeV/SoLID',
        additionalLinks: [
          { title: 'PAC 34 Proposal', url: 'transversity_11gev.pdf' },
          { title: 'PAC 35 Proposal', url: 'transversity_11gev_pac35.pdf' },
          { title: 'SoLID Wiki', url: 'https://hallaweb.jlab.org/wiki/index.php/SoLID' }
        ]
      },
      {
        title: 'ATHENNA-SoLID Electroproduction of J/Psi Near Threshold',
        description: 'Study of J/Psi production near threshold using the SoLID detector.',
        url: './SoLID_JPsi_Threshold.pdf',
        additionalLinks: []
      },
      {
        title: 'Electron-Ion Collider',
        description: 'Research related to the Electron-Ion Collider project.',
        url: 'http://casa.jlab.org/research/elic/elic.shtml',
        additionalLinks: []
      },
      {
        title: 'Transversity E06-010 and E06-011',
        description: 'Experiments studying transverse spin structure of nucleons.',
        url: 'http://hallaweb.jlab.org/experiment/transversity/',
        additionalLinks: [
          { title: 'Research log', url: 'http://www.jlab.org/~xqian/TRANSVERSITY/' },
          { title: 'Analysis Page', url: 'http://nedm.tunl.duke.edu/~xq2/transversity/' },
          { title: 'Run Database', url: 'http://nedm.tunl.duke.edu/db/' }
        ]
      }
    ]);

    return {
      majorProjects,
      pastProjects
    }
  }
})
</script>