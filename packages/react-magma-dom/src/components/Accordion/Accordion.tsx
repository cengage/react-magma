import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the chevron icon.  If 'none', the icon will not render at all.
   * @default AccordionIconPosition.right
   */
  iconPosition?: AccordionIconPosition;
  isInverse?: boolean;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum AccordionIconPosition {
  left = 'left',
  none = 'none',
  right = 'right', // default
}

interface AccordionContextInterface {
  iconPosition?: AccordionIconPosition;
  isMultiple?: boolean;
}

export const AccordionContext = React.createContext<AccordionContextInterface>({
  iconPosition: AccordionIconPosition.right,
  isMultiple: false,
});

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
    const {
      children,
      testId,
      iconPosition = AccordionIconPosition.right,
      isInverse: isInverseProp,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <AccordionContext.Provider value={{ iconPosition }}>
          <StyledAccordion
            theme={theme}
            isInverse={isInverse}
            ref={ref}
            data-testid={props.testId}
            {...rest}
          >
            {children}
          </StyledAccordion>
        </AccordionContext.Provider>
      </InverseContext.Provider>
    );
  }
);
