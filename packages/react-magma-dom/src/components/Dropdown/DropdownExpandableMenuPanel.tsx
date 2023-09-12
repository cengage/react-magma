import * as React from 'react';
import styled from '../../theme/styled';
import { AccordionPanel, AccordionPanelProps } from '../Accordion';
import { DropdownExpandableMenuItemContext } from './DropdownExpandableMenuItem';

export interface DropdownExpandableMenuPanelProps extends AccordionPanelProps {
  testId?: string;
  isExpandablePanel?: boolean;
}

const StyledAccordionPanel = styled(AccordionPanel)<{
  hasIcon?: boolean;
  isExpandablePanel?: boolean;
}>`
  padding: 0;
`;

export const DropdownExpandableMenuPanel = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuPanelProps
>(props => {
  const { children, isExpandablePanel, testId } = props;

  const context = React.useContext(DropdownExpandableMenuItemContext);

  // const theme = React.useContext(ThemeContext);

  // const ref = React.useRef();

  // const i18n = React.useContext(I18nContext);

  return (
    <StyledAccordionPanel
      hasIcon={context.hasIcon}
      isExpandablePanel={isExpandablePanel}
      testId={testId}
    >
      {children}
    </StyledAccordionPanel>
  );
});
