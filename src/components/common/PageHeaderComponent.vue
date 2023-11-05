<script setup lang="ts">
defineProps({
  title: String
})
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <h1 class="font-bold text-xl lg:text-2xl">{{ title }}</h1>
    <slot />
  </div>
</template>
