import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
    type: 'up' | 'down',
    title: string,
    isActive: boolean
}

export const TransactionTypeButton: React.FC<Props> = ({type, title, isActive, ...rest}) => {
  return (
    <Container
        {...rest}
        isActive={isActive}
        type={type}
    >
        <Icon type={type} name={icons[type]} />
        <Title>
            {title}
        </Title>
    </Container>
  );
}
