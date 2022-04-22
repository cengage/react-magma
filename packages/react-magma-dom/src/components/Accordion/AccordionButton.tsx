import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { AccordionIconPosition } from './useAccordion';
import { Spacer } from '../Spacer';
import { ExpandMoreIcon } from 'react-magma-icons';
import {
  useAccordionButton,
  UseAccordionButtonProps,
} from './useAccordionButton';
import { Transition } from '../Transition';

/**
 * @children required
 */
export interface AccordionButtonProps
  extends UseAccordionButtonProps,
    React.HTMLAttributes<HTMLButtonElement> {
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledButton = styled.button<{
  isInverse?: boolean;
  isExpanded?: boolean;
}>`
  background: transparent;
  border: 0;
  border-top: 1px solid ${props =>
    props.isInverse ? props.theme.colors.tint04 : props.theme.colors.neutral06};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  width: 100%;

  &:focus {
    outline: 2px solid ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
    outline-offset: 2px;
  }

  &&[disabled] {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.disabledInverseText
        : props.theme.colors.disabledText};
     cursor: not-allowed;
  }
`;

const TextWrapper = styled.span`
  flex-grow: 1;
`;

export const AccordionButton = React.forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>((props, forwardedRef) => {
  const { children, testId, isInverse: isInverseProp, ...rest } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  const {
    iconPosition,
    buttonId,
    isDisabled,
    isExpanded,
    panelId,
    handleClick,
    handleKeyDown,
    ref,
  } = useAccordionButton(props, forwardedRef);

  const caret = (
    <Transition
      isOpen={isExpanded}
      rotate180
      style={{ height: theme.spaceScale.spacing06 }}
    >
      <ExpandMoreIcon />
    </Transition>
  );

  return (
    <StyledButton
      {...rest}
      aria-controls={panelId}
      aria-expanded={Boolean(isExpanded)}
      data-testid={testId}
      disabled={isDisabled}
      id={buttonId}
      isExpanded={isExpanded}
      isInverse={isInverse}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      theme={theme}
    >
      {iconPosition === AccordionIconPosition.left && (
        <>
          {caret}
          <Spacer size={12} />
        </>
      )}
      <TextWrapper>{children}</TextWrapper>
      {iconPosition === AccordionIconPosition.right && (
        <>
          <Spacer size={12} />
          {caret}
        </>
      )}
    </StyledButton>
  );
});
