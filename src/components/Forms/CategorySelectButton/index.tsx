import React from "react";
import {
  RectButtonProps,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { Container, Category, Icon } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export const CategorySelectButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
      </Container>
    </GestureHandlerRootView>
  );
};
