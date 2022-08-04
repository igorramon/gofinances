import React, { useState } from "react";
import { Modal, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypes,
} from "./styles";
import { FormData } from "../../components/Forms/InputForm";
import { useAuth } from "../../hooks/auth";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

type NavigationProps = {
  navigate: (screen: string) => void;
};

export const Regisster: React.FC = () => {
  const { user } = useAuth();
  const dataKey = `@gofinances:transactions_user:${user.id}`;
  const navigation = useNavigation<NavigationProps>();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      reset();
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }
  function handleTransactionsTypesSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }
  function hanldeOpenSelectCategory() {
    setCategoryModalOpen(true);
  }
  function hanldeCloseSelectCategory() {
    setCategoryModalOpen(false);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              errors={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              errors={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                isActive={transactionType === "positive"}
                onPress={() => handleTransactionsTypesSelect("positive")}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                isActive={transactionType === "negative"}
                onPress={() => handleTransactionsTypesSelect("negative")}
              />
            </TransactionTypes>
            <CategorySelectButton
              title={category.name}
              onPress={hanldeOpenSelectCategory}
            />
          </Fields>
          <Button
            title="Enviar"
            activeOpacity={0.7}
            onPress={handleSubmit(handleRegister)}
          />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={hanldeCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
