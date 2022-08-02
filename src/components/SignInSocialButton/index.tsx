import React from "react";
//import { TouchableOpacityProps } from "react-native";
import {
  RectButtonProperties,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImageContainer, Text } from "./styles";

interface SignInSocialButtonProps extends RectButtonProperties {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInSocialButton: React.FC<SignInSocialButtonProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <GestureHandlerRootView>
      <Button {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>
        <Text>{title}</Text>
      </Button>
    </GestureHandlerRootView>
  );
};
