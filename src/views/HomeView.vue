<template>
  <div class="home">
    <section class="mb-10">
      <h1 class="text-3xl font-bold mb-6">Dr. Xin Qian</h1>
      
      <div class="md:flex md:gap-8">
        <div class="space-y-4 md:w-2/3">
          <div>
            <h2 class="text-xl font-semibold">Position:</h2>
            <p><a href="https://www.bnl.gov/staff/xqian" class="text-blue-600 hover:underline">Senior Physicist</a></p>
            <p class="mt-1">
              <a href="http://www.phy.bnl.gov/edg/w/Electronic_Detector_Group" class="text-blue-600 hover:underline">Electronic Detector Group</a>,
              <a href="https://www.bnl.gov/physics/" class="text-blue-600 hover:underline">Physics Department</a>,
              <a href="http://www.bnl.gov" class="text-blue-600 hover:underline">Brookhaven National Laboratory</a>
            </p>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold">Position:</h2>
            <p><a href="http://www.physics.sunysb.edu/Physics/people/faculty/qian.html" class="text-blue-600 hover:underline">Adjunct Professor</a></p>
            <p class="mt-1">
              <a href="http://www.physics.sunysb.edu/Physics/" class="text-blue-600 hover:underline">Department of Physics and Astronomy</a>,
              <a href="https://www.stonybrook.edu/" class="text-blue-600 hover:underline">Stony Brook University</a>
            </p>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold">Address:</h2>
            <p>Xin Qian,<br>
               Building 510E, P.O. Box 5000<br>
               Brookhaven National Laboratory,<br>
               Upton, NY, 11973
            </p>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold">Contact:</h2>
            <p>Phone: 1-631-344-3828 (o)</p>
            <p>Fax: 1-631-344-4741</p>
            <p>E-Mail: <a href="mailto:xqian@bnl.gov" class="text-blue-600 hover:underline">xqian@bnl.gov</a></p>
          </div>
        </div>
        <div class="md:w-1/3 flex justify-center items-start mt-6 md:mt-0">
          <img src="../assets/XinQian.jpeg" alt="Dr. Xin Qian" class="rounded-lg shadow-md max-w-full" style="max-height: 400px;">
        </div>
      </div>
    </section>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Awards and Achievements</h2>
      <ul class="list-disc list-inside space-y-2">
        <li><a href="./dissertation.pdf" class="text-blue-600 hover:underline">Neutron Collins/Sivers SSA</a> (Duke University, 2010) Medium Energy Group</li>
        <li><a href="https://www.phy.duke.edu/news/xin-qian-named-2011-jefferson-lab-thesis-award-winner" class="text-blue-600 hover:underline">2011 Jefferson Lab Thesis Prize Award</a></li>
        <li><a href="https://www.bnl.gov/newsroom/news.php?a=111641" class="text-blue-600 hover:underline">2014 DOE Early Career Award</a></li>
        <li><a href="https://sambamurti.phy.bnl.gov/lecturers/2015_Qian.html" class="text-blue-600 hover:underline">2015 BNL Sambamurti Lecturer</a></li>
        <li><a href="https://breakthroughprize.org/News/29" class="text-blue-600 hover:underline">2016 Breakthrough Prize as a member of Daya Bay Collaboration</a></li>
        <li><a href="https://www.bnl.gov/newsroom/news.php?a=212308" class="text-blue-600 hover:underline">2017 EPS Young Experimental Scientist Prize</a></li>
        <li><a href="https://www.bnl.gov/newsroom/news.php?a=221600" class="text-blue-600 hover:underline">2022 BNL Science and Technology Award</a></li>
        <li><a href="https://www.bnl.gov/newsroom/news.php?a=121411" class="text-blue-600 hover:underline">2023 The High Energy and Particle Physics Prize (as a member of Daya Bay collaboration), High-Energy Division of EPS</a></li>
      </ul>
    </section>
    
    <section class="mb-10">
      <h2 class="text-2xl font-bold mb-4 border-b pb-2">Major Research Projects</h2>
      <ul class="list-disc list-inside space-y-2">
        <li>
          <a href="https://dune.bnl.gov/wiki/Main_Page" class="text-blue-600 hover:underline">Deep Underground Neutrino Experiment (DUNE)</a>
          <a href="http://docs.dunescience.org:8080/cgi-bin/DocumentDatabase" class="text-blue-600 hover:underline ml-2">doc-db</a>
        </li>
        <li>
          <a href="http://www.phy.bnl.gov/wire-cell/" class="text-blue-600 hover:underline">Wire-Cell Tomographic Reconstruction</a>
        </li>
        <li>
          <a href="http://www-microboone.fnal.gov/" class="text-blue-600 hover:underline">MicroBooNE Experiment</a>
          <a href="http://microboone-docdb.fnal.gov:8080/cgi-bin/DocumentDatabase/" class="text-blue-600 hover:underline ml-2">doc-db</a>
        </li>
        <li>
          <a href="http://lar.bnl.gov/properties/" class="text-blue-600 hover:underline">Fundamental Properties of Liquid Argon</a>
        </li>
        <li>
          <a href="https://www.psi.ch/en/pioneer" class="text-blue-600 hover:underline">PIONEER Experiment</a>
          <a href="https://pioneer.npl.washington.edu/cgi-bin/private/ListBy?alldocs=1" class="text-blue-600 hover:underline ml-2">doc-db</a>
        </li>
      </ul>
    </section>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>