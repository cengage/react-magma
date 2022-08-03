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
  border:0;
  svg {
    color: ${props =>
      props.isInverse && props.disabled
        ? transparentize(0.6, props.theme.colors.neutral100)
        : props.disabled
        ? transparentize(0.4, props.theme.colors.neutral500)
        : 'inherit'};
    margin: 0 0 0 -${props => props.theme.spaceScale.spacing08};
    pointer-events: none;
    z-index: 1;
  }
`;

function borderColors(props) {
  if (props.isInverse) {
    if (props.hasError) {
      return props.theme.colors.danger200;
    }
    return transparentize(0.5, props.theme.colors.neutral100);
  }
  if (props.hasError) {
    return props.theme.colors.danger;
  }
  return props.theme.colors.neutral500;
}

const StyledNativeSelect = styled.select<{
  hasError?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  ${inputBaseStyles};
  border: 1px solid ${borderColors};
  // Required for Windows && Chrome support
  background: inherit;
  > option {
    background: ${props =>
      props.isInverse ? props.theme.colors.neutral600 : 'none'};
  }
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

    console.log(other);

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
            data-testid={testId}
            hasError={!!errorMessage}
            disabled={disabled}
            id={id}
            isInverse={isInverse}
            theme={theme}
            {...other}
          >
            {children}
          </StyledNativeSelect>
          <DefaultDropdownIndicator disabled={disabled} />
        </StyledNativeSelectWrapper>
      </FormFieldContainer>
    );
  }
);
