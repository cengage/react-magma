import * as React from 'react';
import styled from '../../theme/styled';
import { AccordionButton, AccordionButtonProps } from '../Accordion';
import { IconWrapper, menuBackground } from './DropdownMenuItem';
import { IconProps } from 'react-magma-icons';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from './Dropdown';

export interface DropdownExpandableMenuButtonProps
  extends AccordionButtonProps {
  icon?: React.ReactElement<IconProps>;
  testId?: string;
}

const StyledAccordionButton = styled(AccordionButton)<{
  icon?: React.ReactElement<IconProps>;
}>`
  font-weight: 400;
  padding: 8px 16px;
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
  align-items: center;
`;

export const DropdownExpandableMenuButton = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuButtonProps
>(props => {
  const { children, icon, testId } = props;

  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  const ref = React.useRef();

  // const i18n = React.useContext(I18nContext);

  return (
    <StyledAccordionButton
      ref={ref}
      theme={theme}
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
