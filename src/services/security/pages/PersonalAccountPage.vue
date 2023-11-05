<script setup>
import { useUserStore } from '@/services/security/store'
import { storeToRefs } from 'pinia'
import { useWorkerStatus } from '../../../utils/getRole'
import PageHeaderComponent from '@/components/common/PageHeaderComponent.vue'
import HeroIcon from '@/components/common/HeroIcon.vue'

const userStore = useUserStore()

const { userInfo } = storeToRefs(userStore)

function fullName(user) {
  if (!user) return

  return user?.first_name + ' ' + user?.second_name
}
</script>

<template>
  <div class="overflow-hidden">
    <PageHeaderComponent title="Личный кабинет">
      <button
        type="button"
        @click.prevent="userStore.logout()"
        class="text-gray-700 inline-flex items-center hover:text-theme-primary0 space-x-2 px-4 py-2 text-md text-left "
      >
        <HeroIcon icon-type="outline" icon-name="PowerIcon" />
        <span>Выйти</span>
      </button>
    </PageHeaderComponent>

    <div class="bg-white p-6 my-4">
      <div class="flex space-x-4 items-center">
        <div
          class="bg-theme-base-bg flex-shrink-0 h-20 w-20 rounded-full flex justify-center items-center"
        >
          <span class="font-bold text-3xl uppercase">{{
            userInfo && userInfo?.first_name?.charAt(0)
          }}</span>
        </div>
        <div class="">
          <h2 class="font-semibold text-md">{{ fullName(userInfo) }}</h2>
          <p class="text-gray-500 text-xs">{{ userInfo?.email }}</p>
          <p
            class="text-gray-500 text-xs mt-3 bg-yellow-100 text-center font-semibold p-1 rounded-md uppercase"
          >
            {{ useWorkerStatus(userInfo?.role) }}
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
