import * as React from 'react';
import styled from '@emotion/styled';

import {
  useIsInverse
} from '@react-magma/themes';

import { AccordionItemContext } from './useAccordionItem';
import { Transition } from '../Transition';

/**
 * @children required
 */
export interface AccordionPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  isInverse?: boolean;
}

const StyledPanel = styled.div<AccordionPanelProps>`
  background: ${props =>
    props.isInverse
      ? 'var(--colors-foundation)'
      : 'var(--colors-neutral08)'};
  color: ${props =>
    props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral)'};
  padding: var(--spaceScale-spacing03) var(--spaceScale-spacing05) var(--spaceScale-spacing04);
`;

export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>((props, ref) => {
  const { children, testId, isInverse: isInverseProp, ...rest } = props;
  const isInverse = useIsInverse(isInverseProp);

  const { buttonId, isExpanded, panelId } =
    React.useContext(AccordionItemContext);

  return (
    <Transition isOpen={isExpanded} collapse unmountOnExit>
      <StyledPanel
        {...rest}
        aria-labelledby={buttonId}
        aria-hidden={!isExpanded}
        data-testid={testId}
        id={panelId}
        isInverse={isInverse}
        ref={ref}
      >
        {children}
      </StyledPanel>
    </Transition>
  );
});
