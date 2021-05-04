import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { AccordionIconPosition } from './useAccordion';
import { Spacer } from '../Spacer';
import { AngleDownIcon } from 'react-magma-icons';
import {
  useAccordionButton,
  UseAccordionButtonProps,
} from './useAccordionButton';

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

const StyledButton = styled.button<AccordionButtonProps>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation
      : props.theme.colors.neutral08};
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flex;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  font-weight: normal;
  padding: 12px 16px;
  text-align: left;
  width: 100%;

  &:focus {
    outline: 2px dotted ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
    outline-offset: -3px;
  }

  &&[disabled] {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.disabledInverseText
        : props.theme.colors.disabledText};
  }
`;

const TextWrapper = styled.span`
  flex-grow: 1;
`;

export const AccordionButton = React.forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>((props, ref) => {
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
  } = useAccordionButton(props);

  return (
    <StyledButton
      {...rest}
      aria-controls={panelId}
      aria-expanded={isExpanded}
      data-testid={testId}
      disabled={isDisabled}
      id={buttonId}
      isInverse={isInverse}
      onClick={handleClick}
      ref={ref}
      theme={theme}
    >
      {iconPosition === AccordionIconPosition.left && (
        <>
          <AngleDownIcon />
          <Spacer size={12} />
        </>
      )}
      <TextWrapper>{children}</TextWrapper>
      {iconPosition === AccordionIconPosition.right && <AngleDownIcon />}
    </StyledButton>
  );
});
