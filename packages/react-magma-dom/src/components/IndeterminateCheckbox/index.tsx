import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  CheckboxProps,
  HiddenLabelText,
  HiddenInput,
  StyledFakeInput,
} from '../Checkbox';
import { CheckIcon } from 'react-magma-icons';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import styled from '@emotion/styled';
import { useGenerateId, Omit } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Announce } from '../Announce';
import { I18nContext } from '../../i18n';

export interface IndeterminateCheckboxProps
  extends Omit<CheckboxProps, 'checked'> {
  /**
   * Status of the indeterminate, three-state checkbox, which includes and indeterminate (e.g. mixed) option.
   * @default IndeterminateCheckboxStatus.unchecked
   */
  status: string;
  testId?: string;
}

export enum IndeterminateCheckboxStatus {
  checked = 'checked',
  indeterminate = 'indeterminate',
  unchecked = 'unchecked', //default
}

const IndeterminateIcon = styled.span<{
  color?: string;
  disabled?: boolean;
  theme?: any;
}>`
  background: ${props =>
    props.disabled
      ? props.theme.colors.disabledText
      : props.color
      ? props.color
      : props.theme.colors.primary};
  height: 2px;
  width: 10px;
  display: block;
`;

export const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>((props, ref) => {
  const [isChecked, updateIsChecked] = React.useState(
    props.status === 'indeterminate'
      ? false
      : Boolean(props.status === 'checked')
  );

  const id = useGenerateId(props.id);

  React.useEffect(() => {
    updateIsChecked(
      props.status === 'indeterminate'
        ? false
        : Boolean(props.status === 'checked')
    );
  }, [props.status]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked: targetChecked } = event.target;

    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);

    if (props.status !== 'indeterminate') {
      updateIsChecked(targetChecked);
    }
  }

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const context = React.useContext(FormGroupContext);

  const {
    color,
    containerStyle,
    disabled,
    errorMessage,
    inputStyle,
    isInverse,
    labelStyle,
    labelText,
    isTextVisuallyHidden,
    status,
    testId,
    ...other
  } = props;

  const isIndeterminate = status === 'indeterminate';
  const isUnchecked = status === 'unchecked';

  function replaceLabelTextForAnnounceText(baseAnnounceText) {
    return baseAnnounceText.replace(
      /\{labelText\}/g,
      getStringifiedLabelText(labelText)
    );
  }

  function getStringifiedLabelText(node) {
    if (['string', 'number'].includes(typeof node)) return node;
    if (node instanceof Array)
      return node.map(getStringifiedLabelText).join('');
    if (typeof node === 'object' && node)
      return getStringifiedLabelText(node.props.children);
  }

  const showAnnounce = isChecked || isIndeterminate || isUnchecked;
  const announceText = isChecked
    ? replaceLabelTextForAnnounceText(
        i18n.indeterminateCheckbox.isCheckedAnnounce
      )
    : isIndeterminate
    ? replaceLabelTextForAnnounceText(
        i18n.indeterminateCheckbox.isIndeterminateAnnounce
      )
    : isUnchecked
    ? replaceLabelTextForAnnounceText(
        i18n.indeterminateCheckbox.isUncheckedAnnounce
      )
    : '';

  const descriptionId = errorMessage ? `${id}__desc` : null;
  const groupDescriptionId = context.descriptionId;

  const describedBy =
    descriptionId && groupDescriptionId
      ? `${groupDescriptionId} ${descriptionId}`
      : descriptionId
      ? descriptionId
      : groupDescriptionId
      ? groupDescriptionId
      : null;

  const hasError = context.hasError || !!errorMessage;

  return (
    <>
      <StyledContainer style={containerStyle}>
        <HiddenInput
          {...other}
          aria-describedby={describedBy}
          checked={isChecked}
          data-testid={testId}
          disabled={disabled}
          id={id}
          ref={ref}
          type="checkbox"
          onChange={handleChange}
        />
        <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
          <StyledFakeInput
            checked={isChecked}
            color={color ? color : ''}
            disabled={disabled}
            hasError={hasError}
            isIndeterminate={isIndeterminate}
            isInverse={isInverse}
            style={inputStyle}
            theme={theme}
          >
            {isIndeterminate && (
              <IndeterminateIcon
                data-testid="indeterminateIcon"
                color={color ? color : ''}
                disabled={disabled}
                theme={theme}
              />
            )}
            {isChecked && <CheckIcon size={12} />}
          </StyledFakeInput>
          {isTextVisuallyHidden ? (
            <HiddenLabelText>{labelText}</HiddenLabelText>
          ) : (
            labelText
          )}
        </StyledLabel>
        <Announce>
          {showAnnounce && <VisuallyHidden>{announceText}</VisuallyHidden>}
        </Announce>
      </StyledContainer>
      {!!errorMessage && (
        <InputMessage
          id={descriptionId}
          hasError
          isInverse={isInverse}
          style={{ paddingLeft: '30px' }}
        >
          {errorMessage}
        </InputMessage>
      )}
    </>
  );
});
