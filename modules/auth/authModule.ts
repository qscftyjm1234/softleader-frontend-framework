import { defineStore } from 'pinia'

export const AuthModule = {
  name: 'auth',
  install({ provide }) {
    provide('auth', useAuthStore())
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    async login(email: string, password: string) {
      this.token = 'mock-jwt-token'
      this.user = { email }
      return true
    },
    logout() {
      this.token = null
      this.user = null
    }
  }
})