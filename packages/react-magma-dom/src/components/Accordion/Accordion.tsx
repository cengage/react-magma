import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';

// TODO: Get feedback on appropriate default props
// TODO: Keyboard behavior
// TODO: Add headings (h2, h3 etc)
// TODO: Finish styling
// TODO: Animation
// TODO: Add aria-controls attributes (includes adding IDs)
// TODO: Refactor to use custom hooks
// TODO: Handle edge cases, bad combinations of props
// TODO: Tests

/**
 * @children required
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Index of the expanded accordion panel.  Used when the only one tab can be active at once.
   * @default 0
   */
  expandedIndex?: number;
  /**
   * Position of the chevron icon.  If 'none', the icon will not render at all.
   * @default AccordionIconPosition.right
   */
  iconPosition?: AccordionIconPosition;
  /**
   * If true, all accordion items may be collapsed at once
   * @default false
   */
  isCollapsible?: boolean;
  isInverse?: boolean;
  /**
   * If true, multiple accordion items may be expanded at once
   * @default false
   */
  isMultiple?: boolean;
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
  expandedIndex?: number;
  iconPosition?: AccordionIconPosition;
  isCollapsible?: boolean;
  isMultiple?: boolean;
  setExpandedIndex?: any;
}

export const AccordionContext = React.createContext<AccordionContextInterface>({
  expandedIndex: 0,
  iconPosition: AccordionIconPosition.right,
  isCollapsible: false,
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
      isCollapsible,
      expandedIndex: expandedIndexProp = isCollapsible ? null : 0,
      iconPosition = AccordionIconPosition.right,
      isInverse: isInverseProp,
      isMultiple,
      testId,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const [expandedIndex, setExpandedIndex] = React.useState(expandedIndexProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <AccordionContext.Provider
          value={{
            iconPosition,
            isMultiple,
            isCollapsible,
            expandedIndex,
            setExpandedIndex,
          }}
        >
          <StyledAccordion
            theme={theme}
            isInverse={isInverse}
            ref={ref}
            data-testid={props.testId}
            {...rest}
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
