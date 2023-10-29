<script setup>
import { useUserStore } from '@/services/security/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore);
</script>

<template>
  <div class="overflow-hidden">
    Личный кабинет

    <div class='mt-6'>
      <pre>
        {{userInfo}}
      </pre>
    </div>
  </div>
</template>
