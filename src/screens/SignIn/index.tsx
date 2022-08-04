import React, { useState } from "react";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";
import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import { ActivityIndicator, Alert } from "react-native";

export const SignIn: React.FC = () => {
  const { signInWithGoogle, AppleSignIn } = useAuth();
  const theme = useTheme();
  const [isLoading, setIsloading] = useState(false);

  async function handleSignInWithGoogle() {
    try {
      setIsloading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta google.");
    }
    setIsloading(false);
  }

  async function handleAppleSignIn() {
    try {
      return await AppleSignIn();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar com a conta Apple.");
    }
    setIsloading(false);
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{"\n"} finanças de forma{"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com{"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleAppleSignIn}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size={25}
            style={{ marginTop: 25 }}
          />
        )}
      </Footer>
    </Container>
  );
};
