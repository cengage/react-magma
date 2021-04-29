import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { AccordionItemContext } from './AccordionItem';

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
  padding: 8px 16px;
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
    <StyledPanel
      {...rest}
      aria-labelledby={buttonId}
      data-testid={testId}
      hidden={!isExpanded}
      id={panelId}
      isInverse={isInverse}
      ref={ref}
      theme={theme}
    >
      {children}
    </StyledPanel>
  );
});
