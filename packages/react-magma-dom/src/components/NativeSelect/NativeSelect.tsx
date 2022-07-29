import * as React from 'react';
import styled from '../../theme/styled';

import { inputBaseStyles, inputWrapperStyles } from '../InputBase';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../FormFieldContainer';

import { DefaultDropdownIndicator } from '../Select/components';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import { useGenerateId } from '../../utils';
import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';

/**
 * @children required
 */
export interface NativeSelectProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize'>,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * @internal
   */
  optionLabel?: string;
  testId?: string;
}
const StyledNativeSelectWrapper = styled.div<{
  disabled?: boolean;
  hasError?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  ${inputWrapperStyles}
  padding: 0 ${props => props.theme.spaceScale.spacing03} 0 0;
  svg {
    color: ${props =>
      props.isInverse && props.disabled
        ? transparentize(0.6, props.theme.colors.neutral100)
        : props.disabled
        ? transparentize(0.4, props.theme.colors.neutral500)
        : 'inherit'};
    margin: 0 0 0 -${props => props.theme.spaceScale.spacing06};
    pointer-events: none;
    z-index: 1;
  }
`;

const StyledNativeSelect = styled.select<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  margin: -1px 0;
  ${inputBaseStyles};
`;

export const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      disabled,
      errorMessage,
      id: defaultId,
      helperMessage,
      isInverse: isInverseProp,
      labelStyle,
      labelText,
      messageStyle,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const id = useGenerateId(defaultId);

    return (
      <FormFieldContainer
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        labelStyle={labelStyle}
        labelText={labelText}
        isInverse={isInverse}
        helperMessage={helperMessage}
        messageStyle={messageStyle}
        ref={ref}
      >
        <StyledNativeSelectWrapper
          disabled={disabled}
          hasError={!!errorMessage}
          isInverse={isInverse}
          theme={theme}
        >
          <StyledNativeSelect
            {...other}
            data-testid={testId}
            disabled={disabled}
            id={id}
            isInverse={isInverse}
            theme={theme}
          >
            {children}
          </StyledNativeSelect>
          <DefaultDropdownIndicator disabled={disabled} />
        </StyledNativeSelectWrapper>
      </FormFieldContainer>
    );
  }
);
