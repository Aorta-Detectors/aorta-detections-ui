<template>
  <form @submit.prevent="handleSearch" class="group relative w-full">
    <HeroIcon
      icon-name="MagnifyingGlassIcon"
      icon-type="outline"
      class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-gray-500"
    />
    <input
      id="searchbox"
      :placeholder="placeholder"
      v-model="query"
      @input.prevent="handleSearch"
      @keyup.delete="handleSearch"
      @keyup.enter.prevent="handleSearch"
      :class="`${searchPyStyle}`"
      class="focus:ring-2 focus:ring-theme-primary0 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md pl-10 pr-3 ring-1 ring-gray-200 shadow-sm"
      aria-label="Search"
    />
  </form>
</template>

<script setup>
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'
import HeroIcon from '@/components/common/HeroIcon.vue'
import { useCommonStore } from '@/services/common/commonStore'

defineProps({
  placeholder: {
    type: String,
    default: 'Поиск...'
  },
  searchPyStyle: {
    type: String,
    default: 'py-2'
  }
})

const commonStore = useCommonStore()
const { searchQuery: query } = storeToRefs(commonStore)
const emits = defineEmits(['onClean', 'onSearchValue'])

onMounted(() => {
  document.getElementById('searchbox').addEventListener('search', handleClean)
})

function handleSearch() {}
function handleClean() {
  emits('onClean')
}
</script>
