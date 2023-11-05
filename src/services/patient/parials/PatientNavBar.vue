<template>
  <header class="w-full">
    <nav class="bg-white border border-gray-200 py-4">
      <div class="flex lg:flex-row flex-col-reverse items-center justify-between px-4 mx-auto">
        <BaseSearch class='w-full lg:w-1/2 lg:mt-0 mt-3'/>
        <div>
          <div class="relative inline-block text-left">
            <router-link
              :to="{ name: 'AddAppointment' }"
              class="flex text-theme-primary10 rounded justify-items-start items-center py-2 px-4 w-full space-x-2 transition-colors duration-150 text-gray-400 hover:text-white hover:bg-theme-primary20"
            >
              <HeroIcon icon-type="outline" icon-name="PlusCircleIcon" />
              <span>Оформить новый прием</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
import HeroIcon from '@/components/common/HeroIcon.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
</script>
