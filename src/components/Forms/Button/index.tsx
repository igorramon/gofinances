import React from "react";
import {
  RectButtonProperties,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProperties {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
};
