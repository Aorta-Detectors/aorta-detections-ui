<script >
import HeroIcon from '@/components/common/HeroIcon.vue'
import StepComponent from '@/services/patient/parials/StepComponent.vue'

export default {
  name: "SegmentationSteps",
  components: { StepComponent, HeroIcon },

  props: {
    series_statuses: Object,

  }
}
</script>

<template>
  <div class='lg:block hidden p-6 bg-white rounded-xl'>
    <ol class='relative text-gray-500 border-l-2  border-gray-200'>
      <StepComponent :step='step' v-for='step in series_statuses'/>
    </ol>
  </div>
</template>