import * as React from 'react';

export interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const Button: React.SFC<ButtonProps> = ({ text, onClick }: ButtonProps): JSX.Element => (
    <button onClick={onClick}>{text}</button>
)

export default Button;