import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import AsyncStorage
  from '@react-native-async-storage/async-storage'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { formatAmount } from '../../utils/formatAmount'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { clearSpendingStorage } from '../../spending/spendingDelete'

const validationRules = {
  taxCode: ['1234', '6789', '1708', '5952'],
  state: ['RJ', 'SP', 'MG'],
  supplier: ['Totvs', 'Microsoft']
};

export function Dashboard() {
  const [invoice, setInvoice] = useState('')
  const [taxCode, setTaxCode] = useState('')
  const [invoiceValue, setInvoiceValue] = useState('')
  const [state, setState] = useState('')
  const [supplier, setSupplier] = useState('')

  async function handleAddNewSpending() {
    if(invoice.trim() === '' || taxCode.trim() === '' || invoiceValue === '' || state.trim() === '' || supplier.trim() === ''){
      return Alert.alert('Campos incompletos', 'Favor preencher os campos corretamente.')}

    if (!validationRules.taxCode.includes(taxCode)) {
      return Alert.alert('Código do imposto', 'Aceita somente os códigos: 1234, 6789, 1708 e 5952')}

    if (!validationRules.state.includes(state.toUpperCase().trim())) {
      return Alert.alert('Estado', 'Aceita somente os estados: RJ, SP e MG')}
      
    if (!validationRules.supplier.includes(supplier.trim())) {
      return Alert.alert('Fornecedor', 'Aceita somente os fornecedores: Totvs e Microsoft')}
    
      
    const data = {
      invoice: invoice.trim(),
      taxCode: taxCode.trim(),
      invoiceValue: formatAmount(invoiceValue),
      state: state.toUpperCase().trim(),
      supplier: supplier.trim()
    }
    console.log(data)
    setInvoice('')
    setTaxCode('')
    setInvoiceValue('')
    setState('')
    setSupplier('')
    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='Aplicativo Fiscal' />

      <ScrollView>
        <Input
          placeholder='Nota Fiscal'
          placeholderTextColor='#363F5F'
          value={invoice}
          onChangeText={value => setInvoice(value)}
        />

        <Input
          placeholder='Código do Imposto'
          placeholderTextColor='#363F5F'
          value={taxCode}
          onChangeText={value => setTaxCode(value)}
        />

        <InputAmount
          placeholder='Valor da Nota'
          placeholderTextColor='#363F5F'
          value={invoiceValue}
          onChangeText={value => setInvoiceValue(value)}
        />

        <Input
          placeholder='Estado'
          placeholderTextColor='#363F5F'
          value={state}
          onChangeText={value => setState(value)}
        />

        <Input
          placeholder='Fornecedor'
          placeholderTextColor='#363F5F'
          value={supplier}
          onChangeText={value => setSupplier(value)}
        />
      </ScrollView>

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />
      <Button title='Limpar dados'
      onPress={clearSpendingStorage}
      />

    </Container>
  )
}