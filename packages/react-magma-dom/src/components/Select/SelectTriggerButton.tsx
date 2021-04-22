import React from 'react';
import { inputBaseStyles, inputWrapperStyles, InputBaseStylesProps, InputWrapperStylesProps } from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';

const StyledButton = styled.div<InputBaseStylesProps &  InputWrapperStylesProps>`
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
`;

interface SelectTriggerButtonInterface<T> {
  ariaDescribedBy?: string;
  children: React.ReactNode | React.ReactNode[];
  customComponents?: SelectComponents<T>;
  hasError?: boolean;
  disabled?: boolean;
  isInverse?: boolean;
  style?: React.CSSProperties;
  toggleButtonProps: any;
  tabindex?: number;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const {
    ariaDescribedBy,
    children,
    customComponents,
    hasError,
    disabled,
    style: passedInStyle,
    toggleButtonProps,
  } = props;
  const theme = React.useContext(ThemeContext);

  const { DropdownIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  const style = { ...passedInStyle, cursor: 'default' };

  return (
    <StyledButton
      {...toggleButtonProps}
      aria-describedby={ariaDescribedBy}
      data-testid="selectTriggerButton"
      hasError={hasError}
      disabled={disabled}
      isInverse={false}
      role="button"
      style={style}
      theme={theme}
      tabIndex={disabled ? undefined : 0}
    >
      <ChildrenContainer>{children}</ChildrenContainer>
      <DropdownIndicator />
    </StyledButton>
  );
}
