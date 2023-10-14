<template>
  <header class="w-full">
    <nav class="bg-white border-gray-200 py-4 shadow">
      <div class="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
        <router-link :to="{ name: 'StrategyListPage' }">
          <h1 class="font-bold hidden lg:block hover:text-gray-900">Тинькофф-инвестиции</h1>
          <h1 class="font-bold lg:hidden hover:text-gray-900">Тинькофф</h1>
        </router-link>
        <div>
          <Menu v-if="true" as="div" class="relative inline-block text-left ml-2">
            <MenuButton
              class="flex items-center cursor-pointer space-x-1 text-gray-500 border group border-gray-100 p-0.5 px-2 py-1 rounded-md"
            >
              <div
                class="h-7 w-7 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
              >
                <span class="font-bold uppercase"> dfdf</span>
              </div>
              <ChevronDownIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-5 w-56 rounded-md origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="pt-6">
                  <MenuItem v-slot="{ close, active }" class="mx-6">
                    <router-link
                      @click.prevent="close"
                      :to="{ name: 'StrategyListPage' }"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-3 text-md rounded-md '
                      ]"
                      >Все Операции</router-link
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active, close }" class="mx-6">
                    <router-link
                      @click.prevent="close"
                      :to="{ name: 'StrategyOverviewPage' }"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-3 text-md rounded-md'
                      ]"
                      >Рабочий стол</router-link
                    >
                  </MenuItem>

                  <MenuItem v-slot="{ close, active }" class="mx-6 mb-6">
                    <router-link
                      @click.prevent="close"
                      :to="{ name: 'PersonalAccountPage' }"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-3 text-md rounded-md'
                      ]"
                      >Личный Кабинет</router-link
                    >
                  </MenuItem>
                  <div class="border-t">
                    <MenuItem v-slot="{ active }" class="px-10">
                      <button
                        type="button"
                        :class="[
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-3 text-left text-md'
                        ]"
                      >
                        Выйти
                      </button>
                    </MenuItem>
                  </div>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <router-link
            v-else
            :to="{ name: 'LoginPage' }"
            class="inline-flex items-center space-x-2 hover:text-blue-900"
          >
            <span class="text-black hidden sm:block"> Личный кабинет </span>
            <div class="p-2 bg-gray-100 rounded-full">
              dfdfd
            </div>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

</script>
