import React from "react";
import { FancyAlert, FancyAlertProps } from "react-native-expo-fancy-alerts";

import {
  ContentIconAlert,
  ContentButtonAlert,
  ButtonAlertCancel,
  ButtonAlertConfirm,
  TitleButtonAlert,
  TextAlert,
  Icon,
} from "./styles";

interface AlertProps extends FancyAlertProps {
  isVisible: boolean;
  icon: string;
  text: string;
  color: string;
  confirm(): void;
  cancel?(): void;
}

const Alert: React.FC<AlertProps> = ({
  isVisible,
  icon,
  text,
  confirm,
  cancel,
  color,
  ...rest
}) => {
  return (
    <FancyAlert
      {...rest}
      visible={isVisible}
      icon={
        <ContentIconAlert color={color}>
          <Icon name={icon} size={20} />
        </ContentIconAlert>
      }
      style={{ backgroundColor: "white" }}
    >
      <>
        <TextAlert>{text}</TextAlert>
        <ContentButtonAlert isCancel={!!cancel}>
          {cancel && (
            <ButtonAlertCancel onPress={cancel}>
              <TitleButtonAlert>Não</TitleButtonAlert>
            </ButtonAlertCancel>
          )}
          <ButtonAlertConfirm>
            <TitleButtonAlert onPress={confirm}>
              {" "}
              {cancel ? "Sim" : "ok"}
            </TitleButtonAlert>
          </ButtonAlertConfirm>
        </ContentButtonAlert>
      </>
    </FancyAlert>
  );
};

export default Alert;
