<script setup lang="ts">
import HeroIcon from '@/components/common/HeroIcon.vue'
defineProps({
  isLoading: Boolean
})
</script>

<template>
  <span
    v-if="isLoading"
    class="flex items-center justify-center w-8 h-8 bg-green-200 rounded-full ring-theme-primary60"
  >
    <HeroIcon icon-type="outline" icon-name="ArrowPathIcon" class="animate-spin" />
  </span>
</template>
