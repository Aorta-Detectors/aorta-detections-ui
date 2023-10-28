<script setup lang='ts'>
import { RouterView } from 'vue-router'
import AsideNav from '@/services/patient/parials/AsideNav.vue'
import PatientNavBar from '@/services/patient/parials/PatientNavBar.vue'
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <AsideNav/>
    <div class="flex-1 overflow-y-auto h-full">
      <PatientNavBar/>

      <main class="px-4 py-6">
        <router-view />
      </main>
    </div>
  </div>
</template>