import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { AccordionIconPosition, AccordionContext } from './Accordion';
import { AccordionItemContext } from './AccordionItem';

/**
 * @children required
 */
export interface AccordionButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  testId?: string;
  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledButton = styled.button<AccordionButtonProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
`;

export const AccordionButton = React.forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>((props, ref) => {
  const { children, testId, isInverse: isInverseProp, ...rest } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  const { iconPosition } = React.useContext(AccordionContext);

  const { isDisabled, isExpanded, setIsExpanded } = React.useContext(
    AccordionItemContext
  );

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <h3>
      <StyledButton
        {...rest}
        aria-expanded={isExpanded}
        data-testid={testId}
        disabled={isDisabled}
        isInverse={isInverse}
        onClick={handleClick}
        ref={ref}
        theme={theme}
      >
        {iconPosition === AccordionIconPosition.left && <span> {'>'} </span>}
        {children}
        {iconPosition === AccordionIconPosition.right && <span> {'>'} </span>}
      </StyledButton>
    </h3>
  );
});
