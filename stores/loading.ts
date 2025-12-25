import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    requestCount: 0
  }),
  getters: {
    isLoading: (state) => state.requestCount > 0
  },
  actions: {
    startLoading() {
      this.requestCount++
    },
    finishLoading() {
      if (this.requestCount > 0) {
        this.requestCount--
      }
    },
    resetLoading() {
      this.requestCount = 0
    }
  }
})
