import React from "react";
import { categories } from "../../utils/categories";
import { BorderlessButton } from "react-native-gesture-handler";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  HeaderCard,
  SectionButtons,
  Button,
} from "./styles";

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
  id: string;
}

export interface Props {
  data: TransactionCardProps;
  handleDelete(): void;
}
export const TransactionCard: React.FC<Props> = ({ data, handleDelete }) => {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <HeaderCard>
        <Title>{data.name}</Title>
        <SectionButtons>
          <Button onPress={handleDelete}>
            <Icon name="trash" isButton />
          </Button>
        </SectionButtons>
      </HeaderCard>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
