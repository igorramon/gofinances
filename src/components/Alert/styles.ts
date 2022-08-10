import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface ContentIconAlertProps {
  color: string;
}

interface ContentButtonAlertProps {
  isCancel: boolean;
}

export const ContentIconAlert = styled.View<ContentIconAlertProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => (color ? color : "white")};
  border-radius: 50px;
  width: 100%;
`;

export const ContentButtonAlert = styled.View<ContentButtonAlertProps>`
  width: 100%;
  justify-content: ${({ isCancel }) => (isCancel ? "space-between" : "center")};
  align-items: center;
  flex-direction: row;
  padding: 0 30px;
`;

export const ButtonAlertConfirm = styled(RectButton)`
  background-color: #5636d3;
  align-items: center;
  padding: 15px 35px;
  border-radius: 8px;
  margin-bottom: -16px;
`;

export const ButtonAlertCancel = styled.TouchableOpacity`
  background-color: red;
  align-items: center;
  padding: 15px 35px;
  border-radius: 8px;
  margin-bottom: -16px;
`;

export const TitleButtonAlert = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const TextAlert = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(24)}px;
`;
