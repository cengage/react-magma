import * as React from 'react';
import { InputCore } from 'react-magma-core';
const styled = require('styled-components').default;

const StyledLabel = styled.label``;
const StyledInput = styled.input``;

enum Type {
    text,
    password,
    number
}

export interface InputProps {
    autoFocus?: boolean;
    disabled?: boolean;
    id: string;
    labelText: string;
    placeholder?: string;
    required?: boolean;
    type?: Type
    value?: string;
}

export const Input: React.SFC<InputProps> = (props: InputProps): JSX.Element => (
    <InputCore
        value={props.value}>
        {({ handleBlur, handleChange, handleFocus, value }) => {
            const { autoFocus, id, disabled, labelText, placeholder, type, required } = props;

            return (
                <>
                    <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
                    <StyledInput
                        autoFocus={autoFocus}
                        id={id}
                        disabled={disabled}
                        placeholder={placeholder}
                        required={required}
                        type={ type ? type : 'text' }
                        value={value}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus} />
                </>
            )
        }}
    </InputCore>
)

export default Input;