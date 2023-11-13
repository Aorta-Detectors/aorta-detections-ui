<script setup lang="ts">
defineProps({
  title: String,
  description: String
})
</script>

<template>
  <div class="flex justify-between lg:flex-row flex-col lg:items-center lg:space-y-0 space-y-4 w-full">
    <div>
      <h1 class="font-bold text-xl lg:text-2xl">{{ title }}</h1>
      <span class='text-gray-500'>{{description}}</span>
    </div>
    <slot />
  </div>
</template>
