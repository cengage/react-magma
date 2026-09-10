import * as React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import {
  css,
  EmotionCache,
  SerializedStyles,
  withEmotionCache,
} from '@emotion/react';
import styled from '@emotion/styled';
import { insertStyles } from '@emotion/utils';
import { transparentize } from 'polished';
import { CheckBoxIcon, CheckBoxOutlineBlankIcon } from 'react-magma-icons';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  descriptionSuffix,
  omit,
  reactNodeToString,
  useGenerateId,
} from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';
import { FormGroupContext } from '../FormGroup';
import { InputMessage } from '../Input/InputMessage';
import {
  DisplayInputStyles,
  buildDisplayInputActiveBackground,
  buildDisplayInputBorderColor,
  buildDisplayInputFocusStyles,
} from '../SelectionControls/InputStyles';
import { StyledContainer } from '../SelectionControls/StyledContainer';
import { StyledLabel } from '../SelectionControls/StyledLabel';

export enum CheckboxTextPosition {
  left = 'left',
  right = 'right', // default
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * If true, element is checked (i.e. selected)
   * @default false
   */
  checked?: boolean;
  /**
   * Hex code for the background color
   * @default #3942B0 (theme.colors.primary)
   */
  color?: string;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * If true, checkbox is checked on first render
   */
  defaultChecked?: boolean;
  /**
   * If true, element is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Content of the error message for an individual checkbox. If a value is provided, the input will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /*
   * @internal
   */
  hasError?: boolean;
  /**
   * Style properties for the checkbox element
   */
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isTextVisuallyHidden?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content of label; can be node or string
   */
  labelText: React.ReactNode;
  /**
   * Action that fires when selected value of the checkbox changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Whether the label appears to the left of the right of the checkbox
   * @default CheckboxTextPosition.right
   */
  textPosition?: CheckboxTextPosition;
  /**
   * @internal
   */
  hideFocus?: boolean;
  /**
   * Text for aria-label attribute for the checkbox.
   */
  ariaLabel?: string;
}

// Style-caching helpers for rendering checkboxes cheaply in large lists.
const isBrowser = typeof document !== 'undefined';

interface CachedStyle {
  className: string;
  styles: React.ReactElement | null;
}

// Inserts cached styles into the active Emotion cache; returns the class name
// (and, during SSR, the inline <style> to render).
function insertCachedStyles(
  cache: EmotionCache,
  serialized: SerializedStyles
): CachedStyle {
  const rules = insertStyles(cache, serialized, true);
  const className = `${cache.key}-${serialized.name}`;

  let styles: React.ReactElement | null = null;

  if (!isBrowser && rules !== undefined) {
    let serializedNames = serialized.name;
    let next = serialized.next;

    while (next !== undefined) {
      serializedNames += ` ${next.name}`;
      next = next.next;
    }

    styles = React.createElement('style', {
      'data-emotion': `${cache.key} ${serializedNames}`,
      dangerouslySetInnerHTML: { __html: rules },
      nonce: cache.sheet.nonce,
    });
  }

  return { className, styles };
}

// Serializes styles once per unique (theme, variant) pair and caches the result.
function createVariantStyles<Props>(
  build: (props: Props) => SerializedStyles,
  getVariantKey: (props: Props) => string,
  getTheme: (props: Props) => object
): (props: Props) => SerializedStyles {
  const cacheByTheme = new WeakMap<object, Map<string, SerializedStyles>>();

  return function resolveStyles(props: Props): SerializedStyles {
    const theme = getTheme(props);

    let variants = cacheByTheme.get(theme);

    if (!variants) {
      variants = new Map();
      cacheByTheme.set(theme, variants);
    }

    const key = getVariantKey(props);
    let serialized = variants.get(key);

    if (!serialized) {
      serialized = build(props);
      variants.set(key, serialized);
    }

    return serialized;
  };
}

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export const HiddenLabelText = styled.span`
  ${HiddenStyles};
`;

// Stable class on the hidden input, used by the fake input's sibling focus selector.
export const checkboxInputClassName = 'magma-checkbox-input';

export const HiddenInput = withEmotionCache<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>((props, cache, ref) => {
  const { className, ...rest } = props;
  const { className: hiddenClassName, styles } = insertCachedStyles(
    cache,
    HiddenStyles
  );

  // Forward only valid DOM attributes (as styled does for string tags).
  const domProps: Record<string, unknown> = {};

  Object.keys(rest).forEach(key => {
    if (isPropValid(key)) {
      domProps[key] = (rest as Record<string, unknown>)[key];
    }
  });

  const input = (
    <input
      {...domProps}
      ref={ref}
      className={cx(hiddenClassName, checkboxInputClassName, className)}
    />
  );

  return styles ? (
    <>
      {styles}
      {input}
    </>
  ) : (
    input
  );
});

interface FakeInputStyleProps {
  isChecked?: boolean;
  color: string;
  disabled?: boolean;
  isIndeterminate?: boolean;
  isInverse?: boolean;
  hasError?: boolean;
  hideFocus?: boolean;
  textPosition?: CheckboxTextPosition;
  theme: ThemeInterface;
}

function buildCheckIconColor(props: FakeInputStyleProps) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }

    return props.theme.colors.neutral300;
  }
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  if (props.isChecked || props.isIndeterminate) {
    return props.color;
  }

  return props.theme.colors.neutral700;
}

export interface StyledFakeInputProps extends FakeInputStyleProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  'aria-hidden'?: React.AriaAttributes['aria-hidden'];
}

// Fake input (the checkbox box) styles, cached per (theme, variant).
const resolveFakeInputStyles = createVariantStyles<FakeInputStyleProps>(
  props => css`
    ${DisplayInputStyles(props)};
    border: 2px solid;
    border-color: ${buildDisplayInputBorderColor(props)};
    color: ${buildCheckIconColor(props)};
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    margin: ${props.textPosition === 'left'
      ? `${props.theme.spaceScale.spacing01} 0 0 ${props.theme.spaceScale.spacing03}`
      : `0 ${props.theme.spaceScale.spacing03} 0 0`};

    svg {
      flex-shrink: 0;
      pointer-events: none;
      transition: all 0.2s ease-out;
    }

    .${checkboxInputClassName}:focus + label & {
      &:before {
        ${!props.hideFocus && buildDisplayInputFocusStyles(props)};
      }
    }

    &:after {
      // active state
      background: ${buildDisplayInputActiveBackground(props)};
      top: -10px;
      left: -10px;
    }
  `,
  props =>
    [
      props.isChecked,
      props.isIndeterminate,
      props.disabled,
      props.isInverse,
      props.hasError,
      props.hideFocus,
      props.textPosition,
      props.color,
    ].join('|'),
  props => props.theme
);

export const StyledFakeInput = withEmotionCache<StyledFakeInputProps>(
  (
    { children, style, 'aria-hidden': ariaHidden = true, ...styleProps },
    cache
  ) => {
    const { className, styles } = insertCachedStyles(
      cache,
      resolveFakeInputStyles(styleProps)
    );

    const fakeInput = (
      <span className={className} style={style} aria-hidden={ariaHidden}>
        {children}
      </span>
    );

    return styles ? (
      <>
        {styles}
        {fakeInput}
      </>
    ) : (
      fakeInput
    );
  }
);

export const Checkbox = React.memo(
  React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const { checked, id: defaultId, defaultChecked, onChange } = props;
    const isControlled = typeof checked === 'boolean';

    // Local state only for uncontrolled usage; controlled reads directly
    // from the `checked` prop to avoid an extra render per change.
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(
      Boolean(defaultChecked)
    );

    const isChecked = isControlled ? (checked as boolean) : uncontrolledChecked;

    const id = useGenerateId(defaultId);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { checked: targetChecked } = event.target;

      if (typeof onChange === 'function') {
        onChange(event);
      }

      if (!isControlled) {
        setUncontrolledChecked(targetChecked);
      }
    }

    const theme = React.useContext(ThemeContext);
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
      testId,
      textPosition,
      ariaLabel,
      ...rest
    } = props;
    const other = omit(['defaultChecked'], rest);

    const descriptionId = errorMessage && `${id}${descriptionSuffix}`;
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

    const iconSize = theme.iconSizes.medium;
    // Memoized so re-renders reuse the same icon element.
    const checkboxIcon = React.useMemo(
      () =>
        isChecked ? (
          <CheckBoxIcon size={iconSize} />
        ) : (
          <CheckBoxOutlineBlankIcon size={iconSize} />
        ),
      [isChecked, iconSize]
    );

    return (
      <>
        <StyledContainer style={containerStyle}>
          <HiddenInput
            {...other}
            aria-label={ariaLabel ?? reactNodeToString(labelText)}
            aria-describedby={describedBy}
            id={id}
            data-testid={testId}
            checked={isChecked}
            disabled={disabled}
            ref={ref}
            type="checkbox"
            onChange={handleChange}
          />
          <StyledLabel htmlFor={id} isInverse={isInverse} style={labelStyle}>
            {!isTextVisuallyHidden &&
              textPosition === CheckboxTextPosition.left &&
              labelText}

            <StyledFakeInput
              isChecked={isChecked}
              color={color}
              disabled={disabled}
              hasError={hasError}
              hideFocus={props.hideFocus}
              isInverse={isInverse}
              style={inputStyle}
              textPosition={textPosition}
              theme={theme}
              aria-hidden="true"
            >
              {checkboxIcon}
            </StyledFakeInput>

            {isTextVisuallyHidden ? (
              <HiddenLabelText>{labelText}</HiddenLabelText>
            ) : (
              textPosition !== CheckboxTextPosition.left &&
              labelText &&
              labelText
            )}
          </StyledLabel>
        </StyledContainer>
        {!!errorMessage && (
          <InputMessage id={descriptionId} hasError isInverse={isInverse}>
            {errorMessage}
          </InputMessage>
        )}
      </>
    );
  })
);
