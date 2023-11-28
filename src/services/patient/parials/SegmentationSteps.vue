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

/*
*
* {
    "series_hash": "1287d80345019b5c5825b2f5f9308f12",
    "series_statuses": [
        {
            "step_name": "Preprocessing",
            "is_ready": true,
            "is_failed": false
        },
        {
            "step_name": "Segmentation",
            "is_ready": true,
            "is_failed": false
        },
        {
            "step_name": "Resampling",
            "is_ready": true,
            "is_failed": false
        },
        {
            "step_name": "Pathline extraction",
            "is_ready": true,
            "is_failed": false
        },
        {
            "step_name": "Slicing",
            "is_ready": true,
            "is_failed": false
        }
    ]
}
* */

</script>

<template>
  <div class='lg:block hidden  border p-6 bg-white rounded-xl'>
    <ol class='relative text-gray-500 border-l ml-4 border-gray-200'>
      <StepComponent :step='step' v-for='step in series_statuses'/>
<!--      <li class='mb-5 ml-8'>
        <span
          class='absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-theme-primary60'
        >
          <HeroIcon icon-type='outline' icon-name='ArrowPathIcon' class='animate-spin' />
        </span>
        <h3 class='leading-tight'>Pre Processing</h3>
        <p class='text-xs'>Step details here</p>
      </li>
      <li class='my-5 ml-8'>
              <span
                class='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30'
              >
                2
              </span>
        <h3 class='leading-tight'>Aortic Segmentation</h3>
        <p class='text-xs'>Step details here</p>
      </li>
      <li class='mb-5 ml-8'>
              <span
                class='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30'
              >
                3
              </span>
        <h3 class='leading-tight'>Segmentation Networks</h3>
        <p class='text-xs'>Step details here</p>
      </li>
      <li class='mb-5 ml-8'>
              <span
                class='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30'
              >
                4
              </span>
        <h3 class='leading-tight'>Performance Metrics</h3>
        <p class='text-xs'>Step details here</p>
      </li>
      <li class='mb-5 ml-8'>
              <span
                class='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30'
              >
                5
              </span>
        <h3 class='leading-tight'>Performance Metrics</h3>
        <p class='text-xs'>Step details here</p>
      </li>
      <li class='ml-8'>
              <span
                class='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-theme-secondary30'
              >
                6
              </span>
        <h3 class='leading-tight'>Performance Metrics</h3>
        <p class='text-xs'>Step details here</p>
      </li>-->
    </ol>
  </div>
</template>

<style scoped>

</style>