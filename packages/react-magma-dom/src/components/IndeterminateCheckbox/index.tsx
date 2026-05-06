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

function getStringifiedLabelText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getStringifiedLabelText).join('');
  }
  if (typeof node === 'object' && node && 'props' in node) {
    return getStringifiedLabelText((node as React.ReactElement).props.children);
  }

  return '';
}

export const IndeterminateCheckbox = React.memo(
  React.forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    (props, ref) => {
      // Derive isChecked / isIndeterminate / isUnchecked directly from props.status.
      // Previously these were mirrored in component state with a useEffect that
      // wrote to state on every status change, causing TWO renders per update.
      // For a controlled component there is no reason to mirror the prop in state.
      const isChecked = props.status === 'checked';
      const isIndeterminate = props.status === 'indeterminate';
      const isUnchecked = props.status === 'unchecked';

      // Track whether the user has interacted at least once so we don't announce
      // the initial mount status to screen readers.
      const [hasInteracted, setHasInteracted] = React.useState(false);

      const id = useGenerateId(props.id);

      // Sync the native `indeterminate` flag on the input element. This is a
      // dedicated layout effect so we don't recreate a ref callback on every
      // render (which would force React to detach/attach the ref every time).
      const inputRef = React.useRef<HTMLInputElement | null>(null);

      React.useLayoutEffect(() => {
        if (inputRef.current) {
          inputRef.current.indeterminate = isIndeterminate;
        }
      }, [isIndeterminate]);

      const setRefs = React.useCallback(
        (el: HTMLInputElement | null) => {
          inputRef.current = el;
          if (el) {
            el.indeterminate = isIndeterminate;
          }
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current =
              el;
          }
          // Intentionally not depending on `isIndeterminate` — the layout effect
          // above keeps the DOM flag in sync. Keeping this callback stable avoids
          // ref detach/attach on every render.
        },
        [ref] // eslint-disable-line react-hooks/exhaustive-deps
      );

      function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setHasInteracted(true);

        props.onChange &&
          typeof props.onChange === 'function' &&
          props.onChange(event);
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

      const showAnnounce =
        hasInteracted && (isChecked || isIndeterminate || isUnchecked);

      // Compute announce text only when we will actually render it. The previous
      // implementation re-walked the entire `labelText` React tree on every
      // render (via getStringifiedLabelText) and ran a regex replace, even when
      // the announce region was hidden.
      const announceText = React.useMemo(() => {
        if (!showAnnounce) return '';

        const stringifiedLabel = getStringifiedLabelText(labelText);
        const replace = (template: string) =>
          template.replace(/\{labelText\}/g, stringifiedLabel);

        if (isChecked) {
          return replace(i18n.indeterminateCheckbox.isCheckedAnnounce);
        }
        if (isIndeterminate) {
          return replace(i18n.indeterminateCheckbox.isIndeterminateAnnounce);
        }
        if (isUnchecked) {
          return replace(i18n.indeterminateCheckbox.isUncheckedAnnounce);
        }

        return '';
      }, [
        showAnnounce,
        isChecked,
        isIndeterminate,
        isUnchecked,
        labelText,
        i18n.indeterminateCheckbox.isCheckedAnnounce,
        i18n.indeterminateCheckbox.isIndeterminateAnnounce,
        i18n.indeterminateCheckbox.isUncheckedAnnounce,
      ]);

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
              ref={setRefs}
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
    }
  )
);
