import React, { useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BorderlessButton } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";

import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  User,
  UserGreeting,
  Photo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from "./styles";
import Alert from "../../components/Alert";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const theme = useTheme();
  const dataKey = `@gofinances:transactions_user:${user.id}`;
  const [isLoading, setIsloading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = useState("");

  const toggleAlert = useCallback(
    (id?: string) => {
      setVisible(!visible);
      if (id) setId(id);
    },
    [visible]
  );

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type
    );
    if (collectionFilttered.length === 0) return 0;

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );
    setTransactions(transactionsFormated);
    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval =
      lastTransactionExpensives === 0
        ? "N??o h?? transa????es"
        : `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "N??o h?? transa????es"
            : `??ltima entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensives === 0
            ? "N??o h?? transa????es"
            : `??ltima saida dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsloading(false);
  }

  async function handleDeleteTransaction() {
    toggleAlert();
    if (!id) return;
    const transactionsWithoutDelete = transactions
      .filter((transaction) => transaction.id !== id)
      .map((item) => {
        return {
          amount: Number(item.amount.replace(/[^0-9]/g, "")) / 100,
          category: item.category,
          date: Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(item.date)),
          id: item.id,
          name: item.name,
          type: item.type,
        };
      });

    await AsyncStorage.setItem(
      dataKey,
      JSON.stringify(transactionsWithoutDelete)
    );
    loadTransactions();
    setId("");
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Ol??,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <BorderlessButton onPress={signOut}>
                <Icon name="power" />
              </BorderlessButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entrada"
              amount={highlightData?.entries?.amount}
              lastTransaction={`${highlightData.entries.lastTransaction}`}
              type="up"
            />
            <HighlightCard
              title="Sa??das"
              amount={highlightData?.expensives?.amount}
              lastTransaction={`${highlightData.expensives.lastTransaction}`}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard
                  data={item}
                  handleDelete={() => toggleAlert(item.id)}
                />
              )}
            />
          </Transactions>
        </>
      )}
      <Alert
        icon="trash"
        isVisible={visible}
        text="Deseja realmente excluir essa transa????o?"
        confirm={handleDeleteTransaction}
        cancel={toggleAlert}
        color="red"
      />
    </Container>
  );
};
