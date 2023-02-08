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
import { transparentize } from 'polished';

/**
 * @children required
 */
interface BaseAccordionProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export interface AccordionMultipleProps extends BaseAccordionProps {
  /**
   * Zero-based indices of item to expanded initially. When isMulti is true this is an array of numbers.
   * @default []
   */
  defaultIndex?: number[];
  /**
   * Not used in uncontrolled accordion
   */
  index?: never;
  /**
   * If true, multiple accordion items may be expanded at once
   */
  isMulti: true;
}

export interface AccordionSingleProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based index of item to expanded initially. When isMulti is false this is a number.
   * @default null
   */
  defaultIndex?: number;
  /**
   * Not used in uncontrolled accordion
   */
  index?: never;
  /**
   * If true, multiple accordion items may be expanded at once
   */
  isMulti: false;
}

export interface AccordionMultipleControlledProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based indices of expanded items.  When isMulti is true this is an array of numbers.
   * @default []
   */
  index?: number[];
  /**
   * Not used in controlled accordion
   */
  defaultIndex?: never;
  isMulti?: true;
}

export interface AccordionSingleControlledProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based index of expanded item.  When isMulti is a false this is a number.
   * @default null
   */
  index?: number;
  /**
   * Not used in controlled accordion
   */
  defaultIndex?: never;
  isMulti: false;
}

export type AccordionProps =
  | AccordionMultipleProps
  | AccordionSingleProps
  | AccordionMultipleControlledProps
  | AccordionSingleControlledProps;

const StyledAccordion = styled.div<AccordionProps>`
  background: transparent;
  border-bottom: 1px solid
    ${props =>
      props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  font-family: ${props => props.theme.bodyFont};
`;

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      children,
      isInverse: isInverseProp,
      onExpandedChange,
      testId,
      ...rest
    } = props;

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
