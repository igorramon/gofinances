import { ReactNode } from "react";
import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import {
  BorderlessButton,
  BorderlessButtonProperties,
} from "react-native-gesture-handler";

interface TransactionProps {
  type: "positive" | "negative";
}
interface IconProps {
  isButton: boolean;
}

interface ButtonProps extends BorderlessButtonProperties {
  children: ReactNode;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: ${RFValue(16)}px;
`;

export const HeaderCard = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SectionButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  margin-left: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;
export const Amount = styled.Text<TransactionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === "negative" ? theme.colors.attention : theme.colors.success};
`;
export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(19)}px;
`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: ${({ isButton }) => (isButton ? "0" : RFValue(17))}px;
`;
export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
