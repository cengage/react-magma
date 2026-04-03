import * as React from 'react';

import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  IndeterminateCheckBoxIcon,
} from 'react-magma-icons';

import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { descriptionSuffix, Omit, useGenerateId } from '../../utils';
import { Announce } from '../Announce';
import {
  CheckboxProps,
  HiddenInput,
  HiddenLabelText,
  StyledFakeInput,
} from '../Checkbox';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { StyledLabel } from '../SelectionControls/StyledLabel';
import { VisuallyHidden } from '../VisuallyHidden';

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
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const isFirstRender = React.useRef(true);

  const id = useGenerateId(props.id);

  React.useEffect(() => {
    updateIsChecked(
      props.status === 'indeterminate'
        ? false
        : Boolean(props.status === 'checked')
    );

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setHasInteracted(true);
    }
  }, [props.status]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked: targetChecked } = event.target;

    setHasInteracted(true);

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

  const showAnnounce =
    hasInteracted && (isChecked || isIndeterminate || isUnchecked);
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

  const descriptionId = errorMessage ? `${id}${descriptionSuffix}` : null;
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
          ref={el => {
            if (el) el.indeterminate = isIndeterminate;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
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
