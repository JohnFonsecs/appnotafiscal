import React, { useState, useEffect, useCallback } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Content,
  Header,
  Title,
} from './style';
import { spendingGetAll } from '../../spending/spendingGetAll';
import { Tax, Total } from '../../utils/calculate';
import { useFocusEffect } from '@react-navigation/native';

export function Resume() {
  const [spendingData, setSpendingData] = useState<{
    [supplier: string]: {
      [state: string]: {
        total: number;
      };
    };
  }>({});

    async function fetchData () {
      const data = await spendingGetAll();
      const groupedData = data.reduce((acc, item) => {
        if (!acc[item.supplier]) {
          acc[item.supplier] = {};
        }
        if (!acc[item.supplier][item.state]) {
          acc[item.supplier][item.state] = { total: 0 };
        }
        acc[item.supplier][item.state].total += Total(Tax(item.taxCode,item.invoiceValue,item.state),item.invoiceValue);
        return acc;
      }, {} as {
        [supplier: string]: {
          [state: string]: {
            total: number;
          };
        };
      });
      setSpendingData(groupedData);
    }
    useFocusEffect(useCallback(() => {
      fetchData()
    }, []))
  

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      <Content contentContainerStyle={{ padding: 24 }}>
        {Object.entries(spendingData).map(([supplier, states]) => (
          <React.Fragment key={supplier}>
            {Object.entries(states).map(([state, total]) => (
              <HistoryCard
                key={`${supplier}-${state}`}
                title={`${supplier} - ${state}`}
                amount={`R$ ${total.total.toFixed(2)}`}
              />
            ))}
          </React.Fragment>
        ))}
      </Content>
    </Container>
  );
}
