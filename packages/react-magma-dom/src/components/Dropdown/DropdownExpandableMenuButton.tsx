import * as React from 'react';
import styled from '../../theme/styled';
import { AccordionButton, AccordionButtonProps } from '../Accordion';
import { IconWrapper, menuBackground } from './DropdownMenuItem';
import { IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from './Dropdown';
import { DropdownExpandableMenuGroupContext } from './DropdownExpandableMenuGroup';
import { useForkedRef } from '../../utils';

export interface DropdownExpandableMenuButtonProps
  extends AccordionButtonProps {
  disabled?: boolean;
  icon?: React.ReactElement<IconProps>;
  testId?: string;
}

const StyledAccordionButton = styled(AccordionButton)<{
  disabled?: boolean;
  expandableMenuButtonHasIcon?: boolean;
  icon?: React.ReactElement<IconProps>;
}>`
  font-weight: 400;
  overflow-wrap: anywhere;
  padding: ${props =>
    !props.icon && props.expandableMenuButtonHasIcon
      ? `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing11}`
      : `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05}`};
  margin: 0;
  border-top: 0;
  &:hover,
  &:focus {
    background: ${menuBackground};
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
  const { children, disabled, customOnKeyDown, icon, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);
  const expandableMenuGroupContext = React.useContext(
    DropdownExpandableMenuGroupContext
  );

  const ownRef = React.useRef<HTMLDivElement>();
  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    if (!disabled) {
      context.registerDropdownMenuItem(context.itemRefArray, ownRef);
    }
  }, []);

  //Allows a custom function to be called when a key is pressed, if no function is needed, this overrides the default AccordionButton onKeyDown event.
  function handleCustomOnKeyDown() {
    if (props.customOnKeyDown && typeof props.customOnKeyDown === 'function') {
      return props.customOnKeyDown();
    }
  }

  return (
    <StyledAccordionButton
      {...other}
      disabled={disabled}
      ref={ref}
      customOnKeyDown={handleCustomOnKeyDown}
      icon={icon}
      theme={theme}
      expandableMenuButtonHasIcon={
        expandableMenuGroupContext.expandableMenuButtonHasIcon
      }
      isInverse={context.isInverse}
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
