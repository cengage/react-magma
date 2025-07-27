import * as React from 'react';

import styled from '@emotion/styled';

import { AccordionPanel, AccordionPanelProps } from '../Accordion';
import { DropdownExpandableMenuGroup } from './DropdownExpandableMenuGroup';

// Used interface because of the gatsby build error with the type
export interface DropdownExpandableMenuPanelProps extends AccordionPanelProps {}

const StyledAccordionPanel = styled(AccordionPanel)`
  padding: 0;
`;

export const DropdownExpandableMenuPanel = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuPanelProps
>((props, ref) => {
  const { children, testId, ...other } = props;

  React.Children.map(children, child => {
    const item = child as React.ReactElement;

    if (item.type === DropdownExpandableMenuGroup) {
      console.warn(
        `
      React Magma Warning: Only one group level is supported for Expandable Dropdowns, anything nested two levels or more isn't accounted for in the styling
      `
      );
    }
  });

  return (
    <StyledAccordionPanel {...other} ref={ref} testId={testId}>
      {children}
    </StyledAccordionPanel>
  );
});

DropdownExpandableMenuPanel.displayName = 'DropdownExpandableMenuPanel';
