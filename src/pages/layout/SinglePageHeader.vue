<script setup lang='ts'>

import NavbarComponent from '@/components/NavbarComponent.vue'
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <div class="flex-1 overflow-y-auto h-full">
      <NavbarComponent/>
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>