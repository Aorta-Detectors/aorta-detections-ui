<script setup lang="ts">
import { MenuButton, Menu, MenuItems, MenuItem } from '@headlessui/vue'
import {onBeforeMount} from "vue";
import {storeToRefs} from "pinia";
import HeroIcon from '@/components/common/HeroIcon.vue'


/*const {authLogout,authGetMe } = useAuthStore()

const { userData } = storeToRefs(useAuthStore());
onBeforeMount(async () => {
  await authGetMe()
})*/

</script>

<template>
  <nav
    class="bg-gray-900 hidden lg:flex flex-col justify-between w-[16rem] text-white z-10 static start-0 bottom-0 top-0"
  >
    <div class="p-3">
      <h1 class="logo">Madouma</h1>

      <div class="mt-8 space-y-2">
        <router-link :to="{ name: 'AddPatient' }" class="btn" active-class="text-white bg-gray-800">
          <HeroIcon icon-type="outline" icon-name="HomeIcon" />
          <span>Dashboard</span>
        </router-link>
        <router-link :to="{ name: 'AddPatient' }" class="btn" active-class="text-white bg-gray-800">
          <HeroIcon icon-type="outline" icon-name="DocumentChartBarIcon" />
          <span>Resumes</span>
        </router-link>
        <router-link :to="{ name: 'AddPatient' }" class="btn" active-class="text-white bg-gray-800">
          <HeroIcon icon-type="outline" icon-name="PencilIcon" />
          <span>Notes</span>
        </router-link>
      </div>
    </div>
    <div class="block py-2">
      <div class="px-4">
        <Menu as="div" class="relative block w-full text-left">
          <div>
            <MenuButton class="btn group">
              <div class="w-8 h-8 bg-gray-800 group-hover:bg-gray-900 rounded-full"></div>
              <div>name</div>
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
                  <button
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-left w-full'
                    ]"
                  >
                    Settings
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click.prevent="authLogout()"
                    type="button"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-left w-full'
                    ]"
                  >
                    Log Out
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
