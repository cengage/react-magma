import * as React from 'react';
import { IconButton } from '../IconButton';
import { Omit, useForkedRef, XOR } from '../../utils';
import {
  Button,
  ButtonProps,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ButtonShape,
} from '../Button';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { IconProps, InfoIcon } from 'react-magma-icons';
import { PopoverContext } from './Popover';
import { transparentize } from 'polished';

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
  /**
   * The tab order of the component when navigating with a keyboard
   */
  tabIndex?: number;
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
  /**
   * The tab order of the component when navigating with a keyboard
   */
  tabIndex?: number;
}

const TriggerButtonContainer = styled.div<{
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  width: 100%;

  &:focus {
    outline: none;
    outline-offset: 2px;
    border-radius: 8px;

    outline: ${props =>
        props.isDisabled
          ? props.isInverse
            ? props.theme.colors.neutral300
            : transparentize(0.4, props.theme.colors.neutral500)
          : 'none'}
      solid 2px;
  }
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

  const {
    icon = <InfoIcon />,
    children,
    tabIndex,
    'aria-label': ariaLabel,
    ...other
  } = props;
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
          onClick: handleClick,
          ref: ref,
        })
      : children;

  console.log((styledChildren as React.ReactElement)?.props);

  if (!children) {
    return (
      <div ref={context.setReference} style={{ width: 'fit-content' }}>
        <IconButton
          {...other}
          shape={ButtonShape.fill}
          aria-label={ariaLabel}
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
          tabIndex={tabIndex}
        />
      </div>
    );
  }
  return (
    <div ref={context.setReference} style={{ width: 'fit-content' }}>
      {typeof children === 'string' ? (
        <Button
          {...other}
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={context.isOpen}
          aria-controls={context.popoverContentId.current}
          id={context.popoverTriggerId.current}
          isInverse={context.isInverse}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          ref={ref}
          theme={theme}
          tabIndex={tabIndex}
        >
          {children}
        </Button>
      ) : (
        <TriggerButtonContainer
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={context.isOpen}
          aria-controls={context.popoverContentId.current}
          id={context.popoverTriggerId.current}
          onMouseDown={handleMouseDown}
          tabIndex={
            tabIndex
              ? tabIndex
              : (styledChildren as React.ReactElement)?.props.disabled &&
                context.hoverable
              ? 0
              : -1
          }
          isDisabled={
            (styledChildren as React.ReactElement)?.props.disabled &&
            context.hoverable
          }
          isInverse={context.isInverse}
          theme={theme}
        >
          {styledChildren}
        </TriggerButtonContainer>
      )}
    </div>
  );
});
