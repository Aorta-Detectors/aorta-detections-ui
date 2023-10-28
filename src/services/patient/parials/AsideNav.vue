<script setup lang="ts">
import { MenuButton, Menu, MenuItems, MenuItem } from '@headlessui/vue'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import HeroIcon from '@/components/common/HeroIcon.vue'
import LogoComponent from '@/components/common/LogoComponent.vue'
import { useUserStore } from '@/services/security/store'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onBeforeMount(async () => {
  await userStore.getMe()
})
</script>

<template>
  <nav
    class="bg-theme-primary0 hidden lg:flex flex-col justify-between w-[16rem] text-white z-10 static start-0 bottom-0 top-0"
  >
    <div class="p-3">
      <LogoComponent class="text-xl" />

      <div class="mt-8 space-y-2">
        <router-link :to="{ name: 'Dashboard' }" class="btn" active-class="active-class-nav">
          <HeroIcon icon-type="outline" icon-name="HomeIcon" />
          <span>Dashboard</span>
        </router-link>
        <router-link :to="{ name: 'PatientsHistory' }" class="btn" active-class="active-class-nav">
          <HeroIcon icon-type="outline" icon-name="ClockIcon" />
          <span>История работы</span>
        </router-link>

        <router-link :to="{ name: 'PatientList' }" class="btn" active-class="active-class-nav">
          <HeroIcon icon-type="outline" icon-name="UserGroupIcon" />
          <span>Список пациентов</span>
        </router-link>
      </div>
    </div>
    <div class="block py-2">
      <div class="px-4">
        <Menu as="div" class="relative block w-full text-left">
          <div>
            <MenuButton class="btn group text-white capitalize">
              <div class="w-8 h-8 bg-theme-primary10 rounded-full flex flex-shrink-0"></div>
              <div class="truncate">{{ user?.first_name }}</div>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 bottom-16 w-full origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1 divide-y">
                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'PersonalAccountPage' }"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-left w-full'
                    ]"
                  >
                    Личный кабинет
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    type="button"
                    @click.prevent="userStore.logout()"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-left w-full'
                    ]"
                  >
                    Выйти
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
