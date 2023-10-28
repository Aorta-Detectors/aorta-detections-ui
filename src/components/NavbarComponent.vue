<template>
  <header class="w-full">
    <nav class="bg-white border-gray-200 py-4 shadow">
      <div class="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
        <router-link :to="{ name: 'HomePage' }">
          <h1 class="logo uppercase text-theme-primary0">Aorta-Detection</h1>
        </router-link>
        <div>
          <div  class="relative inline-block text-left ml-2">
            <router-link :to="{name: 'LoginPage'}">Login</router-link>
            <router-link :to="{name: 'LoginPage'}" class='ad-primary-btn'>Зарегистироваться</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>

</script>
