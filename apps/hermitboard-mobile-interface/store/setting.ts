import { StateCreator } from 'zustand';
import { RootStore } from './root';

// Persist application settings.
export interface AppSettingsSlice {
  bears: number
  addBear: () => void
}

export const createAppSettingsSlice: StateCreator<
  RootStore,
  [["zustand/immer", never], ["zustand/persist", unknown]],
  [],
  AppSettingsSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
})