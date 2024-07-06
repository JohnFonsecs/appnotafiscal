import { SpendingStorageDTO }
  from "../../spending/SpendingStorageDTO";
import { calculateRegionalPrice } from "../../utils/calculate";
import {
  Container,
  Description,
  Amount,
} from "./styles";

type Props = {
  data: SpendingStorageDTO
}

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>Nome do produto: {data.name}</Description>
      <Amount>Valor unitário R$: {data.amount?.toFixed(2)}</Amount>
        <Amount>Valor na região Norte R$: {data.NorthAmount}</Amount>      
        <Amount>Valor na região Sul R$: {data.SouthAmount}</Amount>
        <Amount>Valor na região Sudeste R$: {data.SouthEastAmount}</Amount>
        <Amount>Valor na região Nordeste R$: {data.NorthEastAmount}</Amount>
    </Container>
  )
}