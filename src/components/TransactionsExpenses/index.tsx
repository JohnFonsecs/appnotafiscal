import { SpendingStorageDTO }
  from "../../spending/SpendingStorageDTO";
import {
  Container,
  Description,
  Amount,
  Local,
} from "./styles";

type Props = {
  data: SpendingStorageDTO
}

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>Nota Fiscal: {data.invoice}</Description>
      <Description>Código do imposto: {data.taxCode}</Description>
      <Amount>Valor R$: {data.invoiceValue}</Amount>
        <Amount>Valor do Imposto R$: {data.taxValue}</Amount>      
        <Amount>Valor Total R$: {data.totalValue}</Amount>
      <Local>Estado: {data.state}</Local>
      <Description>Fornecedor: {data.supplier}</Description>
    </Container>
  )
}