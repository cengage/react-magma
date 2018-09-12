import * as React from 'react';
import { InputCore } from 'react-magma-core';
const styled = require('styled-components').default;

const StyledLabel = styled.label``;
const StyledInput = styled.input``;

export interface InputTextProps {
    autoFocus: boolean;
    id: string;
    labelText: string;
    placeholder: string;
    required: boolean;
    value?: string;
}

export const InputText: React.SFC<InputTextProps> = (props: InputTextProps): JSX.Element => (
    <InputCore
        value={props.value}>
        {({ handleBlur, handleChange, handleFocus, value }) => {
            const { autoFocus, id, labelText, placeholder, required } = props;

            return (
                <>
                    <StyledLabel htmlFor={id}>{labelText}</StyledLabel>
                    <StyledInput
                        autoFocus={autoFocus}
                        id={id}
                        placeholder={placeholder}
                        required={required}
                        value={value}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onFocus={handleFocus} />
                </>
            )
        }}
    </InputCore>
)

export default InputText;