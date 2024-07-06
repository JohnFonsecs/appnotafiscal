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


export function Dashboard() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  async function handleAddNewSpending() {
    if(name.trim() === '' || amount.trim() === ''){
      return Alert.alert('Campos incompletos', 'Favor preencher os campos corretamente.')}
    
      
    const data = {
      name: name.trim(),
      amount: formatAmount(amount),
    }
    console.log(data)
    setName('')
    setAmount('')
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
          placeholder='Nome do produto'
          placeholderTextColor='#363F5F'
          value={name}
          onChangeText={value => setName(value)}
        />

        <InputAmount
          placeholder='Valor unitário'
          placeholderTextColor='#363F5F'
          value={amount}
          onChangeText={value => setAmount(value)}
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