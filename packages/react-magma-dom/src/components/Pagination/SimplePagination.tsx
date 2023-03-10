import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { I18nContext } from '../../i18n';
import { Tooltip } from '../Tooltip';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { NativeSelect } from '../NativeSelect';
import { NavButton, PaginationProps, PageButtonSize } from './';
import { useGenerateId } from '../../utils';
import { Spacer } from '../Spacer';
import { VisuallyHidden } from '../VisuallyHidden';
import { transparentize } from 'polished';

function buildLabelColor(props) {
  if (props.isInverse) {
    if (props.disabled) {
      return transparentize(0.8, props.theme.colors.neutral100);
    }
    return props.theme.colors.neutral100;
  }
  if (props.disabled) {
    return props.theme.colors.neutral500;
  }
  return props.theme.colors.neutral700;
}

const StyledWrapper = styled.div<{
  disabled?: boolean;
  isInverse?: boolean;
}>`
  display: flex;
  align-items: center;
  max-width: 360px;
  label {
    color: ${buildLabelColor};
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    font-weight: 500;
  }
`;

const StyledNativeSelect = styled(NativeSelect)<{
  disabled?: boolean;
}>`
  select {
    color: ${props => (props.disabled ? props.theme.colors.neutral500 : '')};
    cursor: ${props => (props.disabled ? 'not-allowed' : '')};
  }
  min-width: 87px;
`;

export const SimplePagination = React.forwardRef<
  HTMLDivElement,
  PaginationProps
>((props, ref) => {
  const {
    count,
    defaultPage,
    disabled,
    hideNextButton,
    hidePreviousButton,
    id: defaultId,
    isInverse,
    size = PageButtonSize.medium,
    testId,
    onPageChange,
    ...other
  } = props;
  const theme = React.useContext(ThemeContext);
  const buttonSize =
    size === PageButtonSize.large ? ButtonSize.large : ButtonSize.medium;

  const i18n = React.useContext(I18nContext);

  const id = useGenerateId(defaultId);

  let [selectedValue, setSelectedValue] = React.useState(
    defaultPage ? defaultPage : 1
  );

  function handleChange(event) {
    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);
    setSelectedValue(event.target.value);
  }

  //Decreases number by one on previous button click
  function handlePrev() {
    if (selectedValue > 1) {
      setSelectedValue(selectedValue - 1);
    }
  }

  //Increases number by one on next button click
  function handleNext() {
    if (selectedValue < count) {
      setSelectedValue(++selectedValue);
    }
  }

  return (
    <StyledWrapper
      {...other}
      theme={theme}
      data-testid={testId}
      disabled={disabled}
      isInverse={isInverse}
      ref={ref}
    >
      {!hidePreviousButton && (
        <Tooltip content={i18n.pagination.previousButtonLabel}>
          <NavButton
            aria-label={i18n.pagination.previousButtonLabel}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            disabled={selectedValue < 2 ? true : disabled}
            icon={<ArrowBackIcon />}
            isInverse={isInverse}
            theme={theme}
            onClick={handlePrev}
            shape={ButtonShape.round}
            size={buttonSize}
          />
        </Tooltip>
      )}
      <Spacer size={14} />

      <StyledNativeSelect
        aria-label={i18n.select.placeholder}
        data-testid={`${testId}-select`}
        disabled={disabled}
        fieldId={id}
        isInverse={isInverse}
        onChange={handleChange}
        theme={theme}
        value={selectedValue}
      >
        {Array.from({ length: count }, (_, i) => (
          <option
            data-testid={`${testId}-option`}
            key={i + count}
            onChange={handleChange}
            value={i + 1}
          >
            {i + 1}
          </option>
        ))}
      </StyledNativeSelect>
      <Spacer size={8} />
      <label aria-hidden="true">of {count} pages</label>
      <VisuallyHidden>
        {selectedValue} of {count} pages
      </VisuallyHidden>

      <Spacer size={14} />
      {!hideNextButton && (
        <Tooltip content={i18n.pagination.nextButtonLabel}>
          <NavButton
            aria-label={i18n.pagination.nextButtonLabel}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            disabled={selectedValue >= count ? true : disabled}
            icon={<ArrowForwardIcon />}
            isInverse={isInverse}
            onClick={handleNext}
            theme={theme}
            shape={ButtonShape.round}
            size={buttonSize}
          />
        </Tooltip>
      )}
    </StyledWrapper>
  );
});
