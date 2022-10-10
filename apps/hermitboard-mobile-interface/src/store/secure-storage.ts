import { StateStorage } from "zustand/middleware"
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom storage object that uses secure storage by Expo for encrypted persisted stores.
// Fallback to async storage if secure storage is not available.
export const secureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const secureStoreAvailable = await SecureStore.isAvailableAsync();
    if (secureStoreAvailable) {
      return (await SecureStore.getItemAsync(name));
    }
    return (await AsyncStorage.getItem(name))
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const secureStoreAvailable = await SecureStore.isAvailableAsync();
    if (secureStoreAvailable) {
      return (await SecureStore.setItemAsync(name, value));
    }
    return (await AsyncStorage.setItem(name, value))
  },
  removeItem: async (name: string): Promise<void> => {
    const secureStoreAvailable = await SecureStore.isAvailableAsync();
    if (secureStoreAvailable) {
      return (await SecureStore.deleteItemAsync(name));
    }
    return (await AsyncStorage.removeItem(name))
  },
}