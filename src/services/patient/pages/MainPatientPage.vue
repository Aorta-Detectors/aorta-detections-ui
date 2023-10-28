<script setup lang='ts'>

import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <div class="flex-1 overflow-y-auto h-full">
      <router-view name="header" />

      <main class="">
        <router-view name="asideNav" />
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>