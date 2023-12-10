<script>
import HeroIcon from '@/components/common/HeroIcon.vue'

export default {
  name: 'StepComponent',
  components: { HeroIcon },

  props: {
    step: {
      step_name: String,
      is_ready: Boolean,
      is_failed: Boolean
    }
  }
}
</script>

<template>
  <li class="mb-5 ml-6">
    <span
      :class="{
        'bg-green-200 ring-theme-primary60': step.is_ready,
        'bg-red-200 ring-red-300': step.is_failed
      }"
      class="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3.5 ring-4"
    >
      <HeroIcon
        icon-type="outline"
        v-if="!step.is_failed"
        :icon-name="!step.is_ready ? 'ArrowPathIcon' : 'CheckIcon'"
        :class="{ 'animate-spin': !step.is_ready }"
      />
    </span>
    <h3 class="leading-tight">{{ step.step_name }}</h3>
    <p class="text-xs"></p>
  </li>
</template>

<style scoped></style>
