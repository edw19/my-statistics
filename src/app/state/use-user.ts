import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
    user: string | null
    setUser: (user: string) => void
}

export const useUser = create<State>()(persist((set) => ({
    user: null,
    setUser: (user) => set({ user })
}), {
    name: 'user-storage',
}))