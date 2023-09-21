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
  icon?: React.ReactElement<IconProps>;
  testId?: string;
}

const StyledAccordionButton = styled(AccordionButton)<{
  hasCustomArray?: boolean;
  expandableMenuButtonHasIcon?: boolean;
  icon?: React.ReactElement<IconProps>;
}>`
  font-weight: 400;
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
  const { children, hasCustomArray, icon, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);
  const expandableContext = React.useContext(
    DropdownExpandableMenuGroupContext
  );

  const ownRef = React.useRef<HTMLDivElement>();
  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  return (
    <StyledAccordionButton
      {...other}
      ref={ref}
      hasCustomArray
      icon={icon}
      theme={theme}
      expandableMenuButtonHasIcon={
        expandableContext.expandableMenuButtonHasIcon
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
