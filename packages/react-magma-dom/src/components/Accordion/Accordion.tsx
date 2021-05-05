import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';
import {
  UseAccordionProps,
  AccordionContext,
  useAccordion,
} from './useAccordion';
import { ThemeInterface } from '../../theme/magma';

// TODO: Get feedback on appropriate default props
// TODO: Keyboard behavior
// TODO: Add headings to button component?? (h2, h3 etc)
// TODO: Animation
// TODO: Handle edge cases, bad combinations of props

/**
 * @children required
 */
export interface AccordionProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledAccordion = styled.div<AccordionProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
`;

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { children, isInverse: isInverseProp, testId, ...rest } = props;

    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const { contextValue } = useAccordion(props);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <AccordionContext.Provider value={contextValue}>
          <StyledAccordion
            {...rest}
            data-testid={testId}
            isInverse={isInverse}
            ref={ref}
            theme={theme}
          >
            {React.Children.map(
              children,
              (child: React.ReactElement<any>, index) => {
                return React.cloneElement(child, { index, key: index });
              }
            )}
          </StyledAccordion>
        </AccordionContext.Provider>
      </InverseContext.Provider>
    );
  }
);
