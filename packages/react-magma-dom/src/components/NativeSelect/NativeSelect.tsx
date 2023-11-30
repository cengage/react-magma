import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
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
import { LabelPosition } from '../Label';

/**
 * @children required
 */
export interface NativeSelectProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize'>,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Content above the select. For use with Icon Buttons to relay information.
   */
  additionalContent?: React.ReactNode;
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
  border: 1px solid ${borderColors};
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
  height: 38px;
  // Required for Windows && Chrome support
  background: inherit;
  > option {
    background: ${props =>
      props.isInverse ? props.theme.colors.neutral600 : 'none'};
  }
`;

const StyledFormFieldContainer = styled(FormFieldContainer)<{
  additionalContent?: React.ReactNode;
  hasLabel?: boolean;
  labelPosition?: LabelPosition;
}>`
  display: ${props =>
    props.labelPosition === LabelPosition.left ? 'flex' : ''};

  ${props =>
    props.additionalContent &&
    css`
      flex: 1;
      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `}
`;

const StyledAdditionalContentWrapper = styled.div`
  align-items: center;
  display: flex;
  label {
    margin: 0 ${props => props.theme.spaceScale.spacing03} 0 0;
  }
  button {
    margin: 0 0 0 ${props => props.theme.spaceScale.spacing03};
  }
`;

export const NativeSelect = React.forwardRef<HTMLDivElement, NativeSelectProps>(
  (props, ref) => {
    const {
      additionalContent,
      children,
      containerStyle,
      disabled,
      errorMessage,
      id: defaultId,
      helperMessage,
      isInverse: isInverseProp,
      labelPosition,
      labelStyle,
      labelText,
      labelWidth,
      messageStyle,
      testId,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    const isInverse = useIsInverse(isInverseProp);

    const id = useGenerateId(defaultId);

    const hasLabel = !!labelText;

    // If the labelPosition is set to 'left' then a <div> wraps the FormFieldContainer, NativeSelectWrapper, and NativeSelect for proper styling alignment.
    function AdditionalContentWrapper(props) {
      if (
        labelPosition === LabelPosition.left ||
        (labelPosition === LabelPosition.top && !hasLabel)
      ) {
        return (
          <StyledAdditionalContentWrapper theme={theme}>
            {props.children}
          </StyledAdditionalContentWrapper>
        );
      }
      return props.children;
    }

    return (
      <AdditionalContentWrapper labelPosition={labelPosition}>
        <StyledFormFieldContainer
          additionalContent={additionalContent}
          containerStyle={containerStyle}
          data-testId={testId && `${testId}-form-field-container`}
          errorMessage={errorMessage}
          fieldId={id}
          hasLabel={!!labelText}
          labelPosition={labelPosition}
          labelStyle={labelStyle}
          labelText={
            labelPosition !== LabelPosition.left && additionalContent ? (
              <>
                {labelText}
                {labelText && additionalContent}
              </>
            ) : (
              labelText
            )
          }
          labelWidth={labelWidth}
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
        </StyledFormFieldContainer>
        {(labelPosition === 'left' && additionalContent) ||
          (!labelText && additionalContent)}
      </AdditionalContentWrapper>
    );
  }
);
