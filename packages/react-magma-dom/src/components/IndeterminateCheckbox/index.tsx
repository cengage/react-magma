import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  CheckboxProps,
  HiddenInput,
  HiddenLabelText,
  StyledFakeInput,
} from '../Checkbox';
import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  IndeterminateCheckBoxIcon,
} from 'react-magma-icons';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { Omit, useGenerateId } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { Announce } from '../Announce';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';

export interface IndeterminateCheckboxProps
  extends Omit<CheckboxProps, 'checked'> {
  /**
   * Status of the indeterminate, three-state checkbox, which includes and indeterminate (e.g. mixed) option.
   * @default IndeterminateCheckboxStatus.unchecked
   */
  status: IndeterminateCheckboxStatus;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  hideFocus?: boolean;
}

export enum IndeterminateCheckboxStatus {
  checked = 'checked',
  indeterminate = 'indeterminate',
  unchecked = 'unchecked', //default
}

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
    color = theme.colors.primary,
    containerStyle,
    disabled,
    errorMessage,
    inputStyle,
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

  const isInverse = useIsInverse(props.isInverse);

  const ariaCheckedValue = isIndeterminate ? 'mixed' : !isUnchecked;

  return (
    <>
      <StyledContainer style={containerStyle}>
        <HiddenInput
          {...other}
          aria-checked={ariaCheckedValue}
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
            isChecked={isChecked}
            color={color}
            disabled={disabled}
            hasError={hasError}
            hideFocus={props.hideFocus}
            isIndeterminate={isIndeterminate}
            isInverse={isInverse}
            style={inputStyle}
            theme={theme}
            aria-hidden="true"
          >
            {isIndeterminate ? (
              <IndeterminateCheckBoxIcon
                testId="indeterminateIcon"
                size={theme.iconSizes.medium}
              />
            ) : isChecked ? (
              <CheckBoxIcon size={theme.iconSizes.medium} />
            ) : (
              <CheckBoxOutlineBlankIcon size={theme.iconSizes.medium} />
            )}
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
          style={{ paddingLeft: theme.spaceScale.spacing08 }}
        >
          {errorMessage}
        </InputMessage>
      )}
    </>
  );
});
