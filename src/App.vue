<script setup lang="ts">
import {  RouterView } from 'vue-router'

</script>

<template>
  <div class="h-screen w-full overflow-hidden">
    <router-view />
  </div>
</template>

<style lang="scss" >
.inner-bg {
  height: 100vh;
  width: 100%;
  position: relative;
  &:before {
    content: '';
    margin-top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    background-position: center;
    background-size: contain;
    background-image: url(./assets/svg/medicine.svg);
    background-repeat: no-repeat;
    transform: scale(0.9);
  }
}

.login-container {
  background-color: var(--primary80);
}
</style>