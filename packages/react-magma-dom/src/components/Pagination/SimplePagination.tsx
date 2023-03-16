import * as React from 'react';
import { ButtonColor, ButtonShape, ButtonVariant } from '../Button';
import { I18nContext } from '../../i18n';
import { Tooltip } from '../Tooltip';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { NativeSelect } from '../NativeSelect';
import { NavButton, PaginationProps } from './';
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
  select {
    min-width: 87px;
  }
  label {
    color: ${buildLabelColor};
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    font-weight: 500;
  }
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
    testId,
    onPageChange,
    ...other
  } = props;
  const theme = React.useContext(ThemeContext);

  const i18n = React.useContext(I18nContext);

  const id = useGenerateId(defaultId);

  let [selectedPage, setSelectedPage] = React.useState(
    defaultPage ? defaultPage : 1
  );

  function handleChange(event) {
    setSelectedPage(event.target.value);
    props.onChange &&
      typeof props.onChange === 'function' &&
      props.onChange(event);
  }

  //Decreases number by one on previous button click
  function handlePrev() {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  }

  //Increases number by one on next button click
  function handleNext() {
    if (selectedPage < count) {
      setSelectedPage(++selectedPage);
    }
  }

  function paginationLabel() {
    if (count <= 1) {
      return `${i18n.simplePagination.ofLabel}
        ${count}
        ${i18n.simplePagination.pageLabel}`;
    } else {
      return `${i18n.simplePagination.ofLabel}
        ${count}
        ${i18n.simplePagination.pagesLabel}`;
    }
  }

  const disabledPrevTooltip = disabled || selectedPage < 2;

  const disabledNextTooltip = disabled || selectedPage >= count;

  const StyledPrevTooltip = styled(Tooltip)`
    > div {
      opacity: ${disabledPrevTooltip ? '0' : ''};
    }
  `;
  const StyledNextTooltip = styled(Tooltip)`
    > div {
      opacity: ${disabledNextTooltip ? '0' : ''};
    }
  `;

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
        <StyledPrevTooltip content={i18n.pagination.previousButtonLabel}>
          <NavButton
            aria-label={i18n.pagination.previousButtonLabel}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            disabled={selectedPage < 2 ? true : disabled}
            icon={<ArrowBackIcon />}
            isInverse={isInverse}
            theme={theme}
            onClick={handlePrev}
            shape={ButtonShape.fill}
          />
        </StyledPrevTooltip>
      )}
      <Spacer size={14} />

      <NativeSelect
        aria-label={i18n.select.placeholder}
        data-testid={`${testId}-select`}
        disabled={disabled}
        fieldId={id}
        isInverse={isInverse}
        onChange={handleChange}
        value={selectedPage}
      >
        {Array.from({ length: count }, (_, i) => (
          <option
            data-testid={`${testId}-option`}
            key={i}
            onChange={handleChange}
            value={i + 1}
          >
            {i + 1}
          </option>
        ))}
      </NativeSelect>
      <Spacer size={8} />
      <label aria-hidden="true">{paginationLabel()}</label>
      <VisuallyHidden>
        {selectedPage}
        {paginationLabel()}
      </VisuallyHidden>

      <Spacer size={14} />
      {!hideNextButton && (
        <StyledNextTooltip content={i18n.pagination.nextButtonLabel}>
          <NavButton
            aria-label={i18n.pagination.nextButtonLabel}
            variant={ButtonVariant.link}
            color={ButtonColor.secondary}
            disabled={selectedPage >= count ? true : disabled}
            icon={<ArrowForwardIcon />}
            isInverse={isInverse}
            onClick={handleNext}
            theme={theme}
            shape={ButtonShape.fill}
          />
        </StyledNextTooltip>
      )}
    </StyledWrapper>
  );
});
