import * as React from 'react';
import styled from '@emotion/styled';
import {
  useIsInverse
} from '@react-magma/themes';

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
}

const StyledButton = styled.button<{
  isInverse?: boolean;
  isExpanded?: boolean;
}>`
  background: ${props =>
    props.isInverse
      ? 'var(--colors-foundation)'
      : 'var(--colors-neutral08)'};
  border: 0;
  border-top: 1px solid ${props =>
    props.isInverse ? 'var(--colors-tint04)' : 'var(--colors-neutral06)'};
  color: ${props =>
    props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral)'};
  cursor: pointer;
  display: flex;
  font-size: ${props => 'var(--typeScale-size03-fontSize)'};
  line-height: ${props => 'var(--typeScale-size03-lineHeight)'};
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  width: 100%;

  &:focus {
    outline: 2px dotted ${props =>
      props.isInverse
        ? 'var(--colors-focusInverse)'
        : 'var(--colors-focus)'};
    }
    outline-offset: -3px;
  }

  &&[disabled] {
    color: ${props =>
      props.isInverse
        ? 'var(--colors-disabledInverseText)'
        : 'var(--colors-disabledText)'};
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
      style={{ height: 'var(--spaceScale-spacing06)' }}
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
