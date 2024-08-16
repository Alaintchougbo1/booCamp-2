import { defineStore } from 'pinia'
import { reactive } from 'vue'
import bcrypt from 'bcryptjs'

export const useEventsStore = defineStore({
  id: 'events',
  state: () => ({
    events: reactive([])
  }),
  actions: {
    loadEvents() {
      const savedEvents = localStorage.getItem('events')
      if (savedEvents) {
        this.events = JSON.parse(savedEvents)
      }
    },

    saveEvents() {
      localStorage.setItem('events', JSON.stringify(this.events))
    },

    validateEvent({ title, start, end }) {
      if (!title || !start || !end) {
        throw new Error('Tous les champs doivent être remplis')
      }
      if (new Date(start) > new Date(end)) {
        throw new Error('La date de début ne peut pas être après la date de fin')
      }
      if (new Date(start) < new Date()) {
        throw new Error('La date de début ne peut pas être dans le passé')
      }
    },

    addEvent({ title, description, start, end }) {
      this.validateEvent({ title, start, end })

      const newEvent = {
        id: Date.now(),
        title,
        description,
        start,
        end
      }

      this.events.push(newEvent)
      this.saveEvents()
    },

    removeEvent(eventId) {
      this.events = this.events.filter((event) => event.id !== eventId)
      this.saveEvents()
    },

    updateEvent(eventId, updatedEvent) {
      this.validateEvent(updatedEvent)

      const index = this.events.findIndex((event) => event.id === eventId)
      if (index === -1) {
        throw new Error('Événement non trouvé')
      }

      this.events[index] = { ...this.events[index], ...updatedEvent }
      this.saveEvents()
    }
  },

  persist: true
})

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: reactive([]),
    currentUser: null
  }),
  actions: {
    loadUsers() {
      const savedUsers = localStorage.getItem('users')
      if (savedUsers) {
        this.users = JSON.parse(savedUsers)
      }

      const savedCurrentUser = localStorage.getItem('currentUser')
      if (savedCurrentUser) {
        this.currentUser = JSON.parse(savedCurrentUser)
      }
    },

    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users))
      if (this.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } else {
        localStorage.removeItem('currentUser')
      }
    },

    validateUser({ email, password }) {
      if (!email || !password) {
        throw new Error('Tous les champs doivent être remplis')
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("L'adresse e-mail est invalide")
      }
    },

    async registerUser({ email, password }) {
      this.validateUser({ email, password })

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = { email, password: hashedPassword }
      this.users.push(newUser)
      this.saveUsers()
    },

    async loginUser({ email, password }) {
      this.validateUser({ email, password })

      const user = this.users.find((u) => u.email === email)
      if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
          this.currentUser = user
          this.saveUsers()
          return true
        }
      }
      return false
    },

    logoutUser() {
      this.currentUser = null
      this.saveUsers()
    }
  },

  persist: true
})
