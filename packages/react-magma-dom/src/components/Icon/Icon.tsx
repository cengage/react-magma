import * as React from 'react';
import { IconCore } from 'react-magma-core';
import { IconMap } from './IconMap';
const styled = require('styled-components').default;

export interface IconProps {
  id: string;
  title: string;
  type: string;
  handleClick?: () => void;
  disabled?: boolean;
  color?: string;
  size?: number;
}

const StyledIcon = styled.span`
  cursor: ${props => {
    return (props.handleClick !== null && !props.disabled) ? 'pointer' : 'auto';
  }};
  pointer-events: ${props => {
    return props.disabled ? 'none' : 'auto';
  }};
`;

export const Icon: React.SFC<IconProps> = (props: IconProps): JSX.Element => (
  <IconCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const { id, title, type, disabled, color, size } = props;
      const IconType = IconMap[type];

      return IconType ? (
        <StyledIcon className={type} onClick={handleClick} disabled={disabled}>
          <IconType id={id} title={title} color={color} size={size} />
        </StyledIcon>
      ) : null;
    }}
  </IconCore>
);

export default Icon;
