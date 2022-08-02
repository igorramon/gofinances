import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionTypesProps {
    type: 'up' | 'down',
    isActive: boolean
}

export const Container = styled.TouchableOpacity<TransactionTypesProps>`
    ${({isActive, type}) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.success_light};
    `}
    ${({isActive, type}) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
    `}
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: ${({isActive}) => isActive ? 0 : 1.5}px;
    border-color: ${({theme}) => theme.colors.text};
    border-radius: 5px;
    padding: 16px 0;
    width: 49%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`;

export const Icon = styled(Feather)<TransactionTypesProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({theme, type}) => type === 'up'
    ? theme.colors.success
    : theme.colors.attention
    }
`;