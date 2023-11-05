<template>
  <header class="w-full">
    <nav class="bg-white border-gray-200 py-4 shadow">
      <div class="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
        <router-link :to="{ name: 'HomePage' }">
          <LogoComponent class="text-theme-primary0 text-md text-xl" />
        </router-link>
        <div>
          <div  class="relative inline-block text-left ml-2">
            <router-link v-if='!status.loggedIn' :to="{ name: 'LoginPage' }" class="hover:text-theme-primary0"
              >Войти</router-link
            >
            <router-link v-else :to="{name: 'Dashboard'}">Dashboard</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import LogoComponent from '@/components/common/LogoComponent.vue'
import { useUserStore } from '@/services/security/store'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const {status} = storeToRefs(userStore)
</script>
