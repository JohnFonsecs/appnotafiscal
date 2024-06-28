import AsyncStorage from "@react-native-async-storage/async-storage";

import { SPENDING_COLLECTION } from "../storage/storageConfig";

export async function clearSpendingStorage() {
  try {
    await AsyncStorage.removeItem(SPENDING_COLLECTION);
  } catch (error) {
    throw error;
  }
}
