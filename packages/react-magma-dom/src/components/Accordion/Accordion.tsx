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

/**
 * @children required
 */
export interface AccordionMultipleProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  expandedIndex?: number[];
  isMultiple?: true;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

/**
 * @children required
 */
export interface AccordionSingleProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  expandedIndex?: number;
  isMultiple?: false;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export type AccordionProps = AccordionMultipleProps | AccordionSingleProps;

const StyledAccordion = styled.div<AccordionProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation
      : props.theme.colors.neutral08};
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
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
