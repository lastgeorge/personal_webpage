<template>
  <div class="contact">
    <h1 class="text-3xl font-bold mb-6">Useful Links</h1>
    
    <div class="grid md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Affiliations</h2>
        <ul class="space-y-3">
          <li><a href="https://www.bnl.gov/staff/xqian" class="text-blue-600 hover:underline block">BNL Staff Page</a></li>
          <li><a href="http://www.phy.bnl.gov/edg/w/Electronic_Detector_Group" class="text-blue-600 hover:underline block">Electronic Detector Group</a></li>
          <li><a href="https://www.bnl.gov/physics/" class="text-blue-600 hover:underline block">BNL Physics Department</a></li>
          <li><a href="http://www.bnl.gov" class="text-blue-600 hover:underline block">Brookhaven National Laboratory</a></li>
          <li><a href="http://www.physics.sunysb.edu/Physics/people/faculty/qian.html" class="text-blue-600 hover:underline block">SBU Faculty Page</a></li>
          <li><a href="http://www.physics.sunysb.edu/Physics/" class="text-blue-600 hover:underline block">SBU Physics Department</a></li>
          <li><a href="https://www.stonybrook.edu/" class="text-blue-600 hover:underline block">Stony Brook University</a></li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Research Resources</h2>
        <ul class="space-y-3">
          <li><a href="http://inspirehep.net/author/profile/Xin.Qian.1" class="text-blue-600 hover:underline block">Publications @ INSPIRE</a></li>
          <li><a href="http://www.arxiv.org" class="text-blue-600 hover:underline block">arXiv</a></li>
          <li><a href="https://www.phy.bnl.gov/xqian/dunepublicplot/#/" class="text-blue-600 hover:underline block">DUNE Public Plot</a></li>
          <li><a href="https://indico.bnl.gov/category/121/" class="text-blue-600 hover:underline block">Wire-Cell Indico</a></li>
          <li><a href="https://indico.bnl.gov/category/117/" class="text-blue-600 hover:underline block">DUNE BNL Indico</a></li>
          <li><a href="http://www.phy.bnl.gov/~partsem/" class="text-blue-600 hover:underline block">BNL Particle Physics Seminar</a></li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Project Links</h2>
        <ul class="space-y-3">
          <li><a href="http://www.phy.bnl.gov/bnlif/cgi-bin/private/DocumentDatabase" class="text-blue-600 hover:underline block">EDG doc-db</a></li>
          <li><a href="https://elog-phy.bnl.gov/PMT+General+Logbook/" class="text-blue-600 hover:underline block">EDG E-log</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContactView'
})
</script>