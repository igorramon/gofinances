import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';

import { Container, Error } from './styles';
interface Props extends TextInputProps {
    control: Control;
    name: string;
    errors: string;
}
export type FormData = {
    [name: string]: any;
  }
export const InputForm: React.FC<Props> = ({
    control,
    name,
    errors,
    ...rest
}) => {
  return (
    <Container>
        <Controller 
            control={control}
            render={({field: {onChange, value}}) => (

                <Input 
                    onChangeText={onChange}
                    value={value}
                    {...rest}
                    />
                    )}
                    name={name}
        />
        {errors && (
            <Error>{errors}</Error>

        )}
    </Container>
    );
}
