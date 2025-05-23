import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import { AccordionButton, AccordionButtonProps } from '../Accordion';
import { DropdownContext } from './Dropdown';
import { DropdownExpandableMenuGroupContext } from './DropdownExpandableMenuGroup';
import { DropdownExpandableMenuItemContext } from './DropdownExpandableMenuItem';
import { IconWrapper, menuBackground } from './DropdownMenuItem';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';

export interface DropdownExpandableMenuButtonProps
  extends AccordionButtonProps {
  icon?: React.ReactElement<IconProps>;
  testId?: string;
}

const StyledAccordionButton = styled(AccordionButton)<{
  expandableMenuButtonHasIcon?: boolean;
  icon?: React.ReactElement<IconProps>;
  isMenuItemContextDisabled?: boolean;
}>`
  font-weight: 400;
  overflow-wrap: anywhere;
  padding: ${props =>
    !props.icon && props.expandableMenuButtonHasIcon
      ? `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing11}`
      : `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05}`};
  margin: 0;
  border-top: 0;
  &:focus {
    outline-offset: -2px;
  }
  &:hover,
  &:focus {
    background: ${props =>
      props.isMenuItemContextDisabled ? '' : menuBackground};
  }
  > span {
    display: flex;
  }
`;

const StyledIconWrapper = styled(IconWrapper)`
  justify-content: center;
`;

export const DropdownExpandableMenuButton = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuButtonProps
>((props, forwardedRef) => {
  const { children, customOnKeyDown, icon, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);
  const expandableMenuGroupContext = React.useContext(
    DropdownExpandableMenuGroupContext
  );

  const expandableMenuItemContext = React.useContext(
    DropdownExpandableMenuItemContext
  );

  const ownRef = React.useRef<HTMLDivElement>();
  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    if (!expandableMenuItemContext.disabled) {
      context.registerDropdownMenuItem(context.itemRefArray, ownRef);
    }
  }, []);

  //Allows a custom function to be called when a key is pressed that overrides the default AccordionButton onKeyDown event.
  function handleCustomOnKeyDown() {
    if (customOnKeyDown && typeof customOnKeyDown === 'function') {
      return customOnKeyDown();
    }
  }

  return (
    <StyledAccordionButton
      {...other}
      ref={ref}
      customOnKeyDown={handleCustomOnKeyDown}
      icon={icon}
      theme={theme}
      expandableMenuButtonHasIcon={
        expandableMenuGroupContext.expandableMenuButtonHasIcon
      }
      isInverse={context.isInverse}
      isMenuItemContextDisabled={expandableMenuItemContext.disabled}
      testId={testId}
    >
      {icon && (
        <StyledIconWrapper theme={theme} isInverse={context.isInverse}>
          {icon}
        </StyledIconWrapper>
      )}
      {children}
    </StyledAccordionButton>
  );
});

DropdownExpandableMenuButton.displayName = 'DropdownExpandableMenuButton';
