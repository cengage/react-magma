import * as React from 'react';
import styled from '../../theme/styled';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  ButtonProps,
} from '../Button';
import { ExpandMoreIcon, ExpandLessIcon } from 'react-magma-icons';
import { IconButton } from '../IconButton';

export interface TreeExpandButtonProps extends ButtonProps {
  isExpanded: boolean;
  disabled: boolean;
  onClick: any;
}

const StyledIconButton = styled(IconButton)`
  background: transparent;
  border-radius: 0;
  width: 24px;
  height: 24px;
  &:not(disabled):hover, &:not(:disabled):focus {
    background: transparent !important;
  }
`;

export const TreeExpandButton = React.forwardRef<HTMLButtonElement, TreeExpandButtonProps>((props, forwardedRef) => {
  const { isExpanded, disabled, onClick, ...others } = props;

  const icon = isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />;
  const ariaLabel = isExpanded ? 'expand' : 'collapse';

  return (
    <StyledIconButton
      {...others}
      icon={icon}
      color={ButtonColor.subtle}
      size={ButtonSize.small}
      shape={ButtonShape.fill}
      variant={ButtonVariant.link}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      ref={forwardedRef}
    >
      </StyledIconButton>
  );
});
