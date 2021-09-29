import * as React from 'react';
import styled from '@emotion/styled';
import {
  InverseContext,
  useIsInverse
} from '@react-magma/themes';

import {
  UseAccordionProps,
  AccordionContext,
  useAccordion,
} from './useAccordion';

/**
 * @children required
 */
interface BaseAccordionProps
  extends UseAccordionProps,
    React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export interface AccordionMultipleProps extends BaseAccordionProps {
  /**
   * Zero-based indices of item to expanded initially.  When isMulti is true this is an array of numbers.
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
   * Zero-based index of item to expanded initially.  When isMulti is a false this is a number.
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
  background: ${props =>
    props.isInverse
      ? 'var(--colors-foundation)'
      : 'var(--colors-neutral08)'};
  border-bottom: 1px solid ${props => 'var(--colors-neutral06)'};
  color: ${props =>
    props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral)'};
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
