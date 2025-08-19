import React from 'react';

import styled from '@emotion/styled';
import { ReferenceType } from '@floating-ui/react-dom';

import { ThemeContext } from '../../theme/ThemeContext';
import {
  inputBaseStyles,
  InputBaseStylesProps,
  inputWrapperStyles,
  InputWrapperStylesProps,
} from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';

const StyledButton = styled.div<InputBaseStylesProps & InputWrapperStylesProps>`
  ${inputBaseStyles}
  ${inputWrapperStyles}

  align-items: center;
  display: flex;
  height: auto;
  min-height: ${props => props.theme.spaceScale.spacing09};
  padding: 0 ${props => props.theme.spaceScale.spacing03} 0
    ${props => props.theme.spaceScale.spacing02};
  text-align: left;
`;

const ChildrenContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  min-height: ${props => props.theme.spaceScale.spacing09};
  min-width: 0%;
`;

interface SelectTriggerButtonInterface<T> {
  ariaDescribedBy?: string;
  ariaLabel?: string;
  children: React.ReactNode | React.ReactNode[];
  customComponents?: SelectComponents<T>;
  disabled?: boolean;
  hasError?: boolean;
  isInverse?: boolean;
  setReference?: (node: ReferenceType) => void;
  style?: React.CSSProperties;
  toggleButtonProps: any;
  tabindex?: number;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const {
    ariaDescribedBy,
    ariaLabel,
    children,
    customComponents,
    hasError,
    disabled,
    isInverse,
    setReference,
    style: passedInStyle,
    toggleButtonProps,
  } = props;
  const theme = React.useContext(ThemeContext);

  const { DropdownIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  const style = { ...passedInStyle, cursor: 'default' };

  return (
    <div ref={setReference}>
      <StyledButton
        {...toggleButtonProps}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        data-testid="selectTriggerButton"
        disabled={disabled}
        hasError={hasError}
        isInverse={isInverse}
        role="button"
        style={style}
        tabIndex={disabled ? undefined : 0}
        theme={theme}
      >
        <ChildrenContainer theme={theme}>{children}</ChildrenContainer>
        <DropdownIndicator />
      </StyledButton>
    </div>
  );
}
