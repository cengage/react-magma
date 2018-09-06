import * as React from 'react';
const styled = require('styled-components').default;

const StyledButton = styled.button`
    background-color: black;
`

export interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const Button: React.SFC<ButtonProps> = ({ text, onClick }: ButtonProps): JSX.Element => (
    <StyledButton onClick={onClick}>{text}</StyledButton>
)

export default Button;