import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand'
import { persist } from "zustand/middleware"
import { immer } from 'zustand/middleware/immer'

interface EnumState {
  authTypes: 
  a: string
}

// Retrieves and stores enum IDs for reference.
export const useEnumStore = create<AuthState>()(
  immer(
    persist((set) => ({
      sessionID: "",
      userID: "",
    }),
    {
      name: "enum-storage",
      getStorage: () => AsyncStorage,
    })
  ))
