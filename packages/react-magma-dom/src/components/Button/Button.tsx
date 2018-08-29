import * as React from 'react';

export interface ButtonProps {
    text: string;
}

export const Button: React.SFC<ButtonProps> = ({ text }: ButtonProps): JSX.Element => (
    <button>{text}</button>
)

export default Button;