import * as React from 'react';
import { IconButton } from '../IconButton';
import { Omit, useForkedRef, XOR } from '../../utils';
import {
  Button,
  ButtonProps,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../Button';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { IconProps, InfoIcon } from 'react-magma-icons';
import { PopoverContext } from './Popover';

export interface IconOnlyPopoverTriggerProps
  extends Omit<ButtonProps, 'children'> {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * The text the screen reader will announce. Required for icon-only buttons
   */
  'aria-label': string;
}

export interface IconTextPopoverTriggerProps extends ButtonProps {
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * The content of the component
   */
  children?: React.ReactChild | React.ReactChild[] | string;
}

const TriggerButtonContainer = styled.div`
  width: 100%;
`;

const StyledIcon = styled(IconButton)`
  border-radius: 8px;
`;

export type PopoverTriggerProps = XOR<
  IconOnlyPopoverTriggerProps,
  IconTextPopoverTriggerProps
>;

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>((props, forwardedRef) => {
  const context = React.useContext(PopoverContext);
  const theme = React.useContext(ThemeContext);

  const ref = useForkedRef(context.toggleRef, forwardedRef);

  const { icon = <InfoIcon />, children, ...other } = props;
  const {
    type = ButtonType.button,
    size = ButtonSize.medium,
    variant = ButtonVariant.link,
  } = props;

  function handleClick(event: React.UIEvent) {
    if (!context.isDisabled) {
      if (context.isOpen) {
        context.closePopover(event);
      } else {
        context.openPopover();
      }
    }
  }

  // Necessary for the proper opening and closing of the menu in Safari
  function handleMouseDown(event: React.MouseEvent) {
    event.preventDefault();
  }

  const styledChildren =
    children && typeof children !== 'string'
      ? React.cloneElement(children as React.ReactElement, {
          theme,
          disabled: context.isDisabled,
          onClick: handleClick,
          ref: ref,
        })
      : children;

  if (!children) {
    return (
      <div ref={context.setReference} style={{ width: 'fit-content' }}>
        <StyledIcon
          {...other}
          aria-label="popoverTriggerIcon"
          aria-haspopup="dialog"
          aria-expanded={context.isOpen}
          aria-controls={context.popoverContentId.current}
          id={context.popoverTriggerId.current}
          isInverse={context.isInverse}
          icon={icon}
          onClick={handleClick}
          ref={ref}
          theme={theme}
          type={type}
          size={size}
          variant={variant}
          onMouseDown={handleMouseDown}
          disabled={context.isDisabled}
        />
      </div>
    );
  }
  return (
    <div ref={context.setReference} style={{ width: 'fit-content' }}>
      {typeof children === 'string' ? (
        <Button
          {...other}
          aria-label="popoverTriggerButton"
          aria-haspopup="dialog"
          aria-expanded={context.isOpen}
          aria-controls={context.popoverContentId.current}
          id={context.popoverTriggerId.current}
          isInverse={context.isInverse}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          ref={ref}
          theme={theme}
          disabled={context.isDisabled}
        >
          {children}
        </Button>
      ) : (
        <TriggerButtonContainer
          aria-label="popoverTriggerButton"
          aria-haspopup="dialog"
          aria-expanded={context.isOpen}
          aria-controls={context.popoverContentId.current}
          id={context.popoverTriggerId.current}
          onMouseDown={handleMouseDown}
        >
          {styledChildren}
        </TriggerButtonContainer>
      )}
    </div>
  );
});
