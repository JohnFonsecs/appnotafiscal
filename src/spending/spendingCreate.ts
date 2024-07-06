import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { SpendingStorageDTO }
  from "./SpendingStorageDTO";

import { SPENDING_COLLECTION }
  from "../storage/storageConfig";
import { Alert } from "react-native";
import { spendingGetAll } from "./spendingGetAll";
import { calculateRegionalPrice } from "../utils/calculate";

export async function spendingCreate(
  newSpending: SpendingStorageDTO) {

  try {
    const NorthAmount = calculateRegionalPrice(newSpending.amount, 5);
    const SouthAmount = calculateRegionalPrice(newSpending.amount, 10);
    const SouthEastAmount = calculateRegionalPrice(newSpending.amount, 15);
    const NorthEastAmount = calculateRegionalPrice(newSpending.amount, 20);

    const RegionAmount = {
       ...newSpending,
      NorthAmount,
      SouthAmount,
      SouthEastAmount,
      NorthEastAmount
    };

    const storageSpending = await spendingGetAll()

    // ... spread operator / cópia
    const storage = [...storageSpending ,RegionAmount]

    await AsyncStorage.setItem(SPENDING_COLLECTION,
      JSON.stringify(storage))
  } catch (error) {
    Alert.alert('Atencao', 'Não foi possível fazer a gravação')
    console.log('Não foi possível fazer a gravação')
    throw error;
  }
}