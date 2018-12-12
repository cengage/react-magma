import * as React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { InputCore } from 'react-magma-core';

export interface InputProps {
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
}

export const Input: React.SFC<InputProps> = (props: InputProps) => (
  <InputCore value={props.value}>
    {({ handleBlur, handleChange, handleFocus, value }) => {
      const { autoFocus, placeholder } = props;

      return (
        <View>
          <TextInput
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </View>
      );
    }}
  </InputCore>
);

export default Input;
