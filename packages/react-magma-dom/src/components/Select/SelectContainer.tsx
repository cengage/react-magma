import React from 'react';
import styled from '@emotion/styled';
import { Label, LabelPosition } from '../Label';
import { VisuallyHidden } from '../VisuallyHidden';
import { UseSelectGetLabelPropsOptions } from 'downshift';
import { InputMessage } from '../Input/InputMessage';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

export const SelectContainerElement = styled.div<{
  isLabelVisuallyHidden?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: number;
}>`
  display: flex;
  flex-direction: ${props =>
    props.labelPosition === LabelPosition.left ||
    (props.isLabelVisuallyHidden && LabelPosition.top)
      ? 'row'
      : 'column'};
  position: relative;
  label {
    flex-basis: ${props =>
      props.labelWidth && props.labelPosition === LabelPosition.left
        ? `${props.labelWidth}%`
        : ''};
  }
`;

const InputMessageContainer = styled.div`
  flex-grow: 1;
  padding: 0.25em;
  margin: -0.25em;
  min-width: 0%;
  position: relative;
`;

interface SelectContainerInterface<T> {
  additionalContent?: React.ReactNode;
  children: React.ReactNode[];
  containerStyle?: React.CSSProperties;
  descriptionId?: string;
  errorMessage?: React.ReactNode;
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any;
  hasError?: boolean;
  helperMessage?: React.ReactNode;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  labelPosition?: LabelPosition;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelWidth?: number;
  messageStyle?: React.CSSProperties;
}

const StyledAdditionalContentWrapper = styled.div<{
  labelPosition?: LabelPosition;
  theme?: ThemeInterface;
}>`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: space-between;
  label {
    margin: ${props =>
      props.labelPosition === LabelPosition.left
        ? `0 ${props.theme.spaceScale.spacing03} 0 0`
        : ''};
  }
  button {
    bottom: ${props =>
      props.labelPosition !== LabelPosition.left ? `6px` : ''};
  }
`;

const StyledAdditionalContent = styled.div<{
  labelPosition?: LabelPosition;
  theme?: ThemeInterface;
}>`
  display: flex;
  align-items: center;
  button {
    margin: ${props =>
      props.labelPosition === LabelPosition.left
        ? `0 0 0 ${props.theme.spaceScale.spacing03}`
        : ''};
  }
`;

const FormField = styled.form`
  flex: 1 1 auto;
  min-width: 0%;
`;

export function SelectContainer<T>(props: SelectContainerInterface<T>) {
  const {
    additionalContent,
    children,
    descriptionId,
    errorMessage,
    getLabelProps,
    helperMessage,
    isInverse,
    isLabelVisuallyHidden,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    messageStyle,
  } = props;

  const hasError = !!errorMessage;

  const theme = React.useContext(ThemeContext);

  // If the labelPosition is set to 'top' (default) then a <div> wraps the Label and additional content for proper styling alignment.
  function AdditionalContentWrapper(props) {
    if (
      labelPosition !== LabelPosition.left &&
      !isLabelVisuallyHidden &&
      additionalContent
    ) {
      return (
        <StyledAdditionalContentWrapper
          labelPosition={labelPosition}
          theme={theme}
        >
          {props.children}
          {additionalContent}
        </StyledAdditionalContentWrapper>
      );
    }
    return props.children;
  }

  // If the labelPosition is set to LabelPosition.left then the label, select, and additional content display inline.
  function additionalItemRightAlign() {
    if (
      (labelPosition === LabelPosition.left && additionalContent) ||
      (labelPosition && isLabelVisuallyHidden && additionalContent)
    ) {
      return (
        <StyledAdditionalContent labelPosition={labelPosition} theme={theme}>
          {additionalContent}
        </StyledAdditionalContent>
      );
    }
  }

  return (
    <SelectContainerElement
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      data-testid="selectContainerElement"
    >
      <AdditionalContentWrapper labelPosition={labelPosition}>
        <Label
          {...getLabelProps()}
          isInverse={isInverse}
          labelPosition={labelPosition}
          style={labelStyle}
        >
          {isLabelVisuallyHidden ? (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          ) : (
            labelText
          )}
        </Label>
      </AdditionalContentWrapper>
      <FormField>
        <InputMessageContainer>{children}</InputMessageContainer>
        {!(
          labelPosition === LabelPosition.left &&
          !(errorMessage || helperMessage)
        ) &&
          (errorMessage || helperMessage) && (
            <InputMessage
              id={descriptionId}
              isInverse={isInverse}
              hasError={hasError}
              style={messageStyle}
            >
              {(errorMessage || helperMessage) && (
                <>{errorMessage ? errorMessage : helperMessage}</>
              )}
            </InputMessage>
          )}
      </FormField>
      {additionalItemRightAlign()}
    </SelectContainerElement>
  );
}
