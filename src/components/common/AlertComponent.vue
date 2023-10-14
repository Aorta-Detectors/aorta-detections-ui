<script>


export default {
  name: 'AlertComponent',

  computed: {
    toast(){
      return false
    }
  }
}
</script>

<template>
  <div class="flex justify-center fixed top-4 right-4 toast-z">
    <transition name="toast">
      <div
        v-if="toast"
        :class="toast?.type === 'error' ? 'bg-red-500' : 'bg-green-600'"
        class="text-white text-sm px-6 py-4 mb-[70px] sm:mb-6 shadow-sm rounded-md whitespace-nowrap"
      >
        {{ toast?.text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.toast-z {
  z-index: 1000000;
}
</style>
