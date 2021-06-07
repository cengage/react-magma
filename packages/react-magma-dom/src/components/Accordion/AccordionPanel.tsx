import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { AccordionItemContext } from './useAccordionItem';
import { Transition } from '../Transition';

/**
 * @children required
 */
export interface AccordionPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledPanel = styled.div<AccordionPanelProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  padding: ${props =>
    `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing04}`};
`;

export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>((props, ref) => {
  const { children, testId, isInverse: isInverseProp, ...rest } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  const { buttonId, isExpanded, panelId } = React.useContext(
    AccordionItemContext
  );

  return (
    <Transition isOpen={isExpanded} collapse>
      <StyledPanel
        {...rest}
        aria-labelledby={buttonId}
        aria-hidden={!isExpanded}
        data-testid={testId}
        id={panelId}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledPanel>
    </Transition>
  );
});
