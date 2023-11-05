import { defineStore } from 'pinia'
import type {ICommonStore} from "@/shared/types/common.types";

export const useCommonStore = defineStore('common', {
  state: (): ICommonStore => ({
    searchQuery: ''
  }),

  getters: {
    searchQueryValue: (state: ICommonStore) => state.searchQuery
  },

  actions: {

  }
})
