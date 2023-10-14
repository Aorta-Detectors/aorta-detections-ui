<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="text-center flex flex-col h-full justify-center items-center">
      <h1 class="text-xl">Страница не найдена</h1>
      <p class="text-sm text-gray-700 my-4">
        К сожалению, мы не смогли найти эту страницу. <br />
        перейти на
        <router-link class="text-blue-900" :to="{ name: 'HomePage' }">главную страницу</router-link>
      </p>
    </div>
  </div>
</template>
