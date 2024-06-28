export type SpendingStorageDTO = {
  invoice: string;
  taxCode: string;
  taxValue?: number;
  invoiceValue: number;
  totalValue?: number;
  state: string;
  supplier: string;
}