import AsyncStorage from "@react-native-async-storage/async-storage";

import { SpendingStorageDTO } from "./SpendingStorageDTO";

import { SPENDING_COLLECTION }
  from "../storage/storageConfig";

import { spendingGetAll } from "./spendingGetAll";

import { Tax, Total } from "../utils/calculate";

export async function spendingCreate(
  newSpending: SpendingStorageDTO) {
  try {
    const taxValue = Tax(newSpending.taxCode, newSpending.invoiceValue, newSpending.state);

    const totalValue = Total(taxValue, newSpending.invoiceValue);

    const spendingWithTax = { ...newSpending, taxValue, totalValue };

    const storageSpending = await spendingGetAll()

    const storage = [...storageSpending, spendingWithTax];

    await AsyncStorage.setItem(SPENDING_COLLECTION,
      JSON.stringify(storage))
  } catch (error) {
    throw error;
  }
}