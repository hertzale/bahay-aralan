// src/lib/store.js
// Global state — swap mock logic with real API calls later

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    {
      name: 'bahay-aralan-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
)

// ── Role constants ─────────────────────────────────────────────
export const ROLES = {
  STUDENT:   'student',
  CARETAKER: 'caretaker',
  OWNER:     'owner',
  ADMIN:     'admin',
}

// ── Mock users for demo (remove when backend is ready) ─────────
export const DEMO_USERS = {
  'student@demo.ph':   { id:1,  name:'Sandra Fresnido', role:'student',   email:'student@demo.ph'   },
  'caretaker@demo.ph': { id:2,  name:'Jungwon Yang',    role:'caretaker', email:'caretaker@demo.ph' },
  'owner@demo.ph':     { id:3,  name:'Ricardo Lim',     role:'owner',     email:'owner@demo.ph'     },
  'admin@demo.ph':     { id:4,  name:'Dr. Ana Cruz',    role:'admin',     email:'admin@demo.ph'     },
}