import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  children,
  isLoading = true,
}) => {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <Container>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </Container>
      ) : (
        children
      )}
    </>
  );
};
