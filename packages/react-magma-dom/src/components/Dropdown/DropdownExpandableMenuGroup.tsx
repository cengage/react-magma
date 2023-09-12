import * as React from 'react';
import styled from '../../theme/styled';
import { useGenerateId } from '../../utils';
import { Accordion, AccordionProps } from '../Accordion';
import { DropdownContext } from './Dropdown';

/**
 * @children required
 */
export interface DropdownExpandableMenuGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  testId?: string;
}

const StyledAccordion = styled(Accordion)`
  border: none;
`;

export const DropdownExpandableMenuGroup = React.forwardRef<
  HTMLDivElement,
  AccordionProps
>(props => {
  const { children, id: defaultId, testId, ...other } = props;

  const id = useGenerateId(defaultId);

  const context = React.useContext(DropdownContext);

  const countEachGroup = document.querySelectorAll('[role="group"]').length;
  if (countEachGroup > 1) {
    console.log(
      `Only one group level is supported, anything nested two levels or more isn't accounted for in the styling`
    );
  }

  return (
    <StyledAccordion
      {...other}
      aria-labelledby={id}
      isInverse={context.isInverse}
      role="group"
      testId={testId}
    >
      {children}
    </StyledAccordion>
  );
});
