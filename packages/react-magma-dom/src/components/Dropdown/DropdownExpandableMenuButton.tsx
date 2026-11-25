import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import {
  AccordionButton,
  AccordionButtonProps,
  AccordionItemContext,
} from '../Accordion';
import { DropdownContext } from './Dropdown';
import { DropdownExpandableMenuGroupContext } from './DropdownExpandableMenuGroup';
import { DropdownExpandableMenuItemContext } from './DropdownExpandableMenuItem';
import {
  IconWrapper,
  menuBackground,
  menuFocusBackground,
} from './DropdownMenuItem';
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
  &:hover {
    background: ${props =>
      props.isMenuItemContextDisabled ? '' : menuBackground};
  }
  &:focus {
    background: ${props =>
      props.isMenuItemContextDisabled ? '' : menuFocusBackground};
  }
  > span {
    display: flex;
  }
`;

const StyledIconWrapper = styled(IconWrapper)`
  justify-content: center;

  && svg {
    color: inherit;
  }
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

  const { isExpanded } = React.useContext(AccordionItemContext);

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
      aria-expanded={isExpanded}
      aria-haspopup="true"
      ref={ref}
      role="menuitem"
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
        <StyledIconWrapper
          disabled={expandableMenuItemContext.disabled}
          theme={theme}
          isInverse={context.isInverse}
        >
          {icon}
        </StyledIconWrapper>
      )}
      {children}
    </StyledAccordionButton>
  );
});

DropdownExpandableMenuButton.displayName = 'DropdownExpandableMenuButton';
