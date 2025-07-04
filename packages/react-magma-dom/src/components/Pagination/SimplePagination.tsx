import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';

import { NativeSelect } from '../..';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { Announce } from '../Announce';
import { ButtonColor, ButtonShape, ButtonVariant } from '../Button';
import { Spacer } from '../Spacer';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';

import { NavButton, PaginationProps } from './';

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
    font-family: ${props => props.theme.bodyFont};
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    font-weight: 500;
    white-space: nowrap;
  }
`;

const nativeSelectStyles = {
  minWidth: '68px',
  maxWidth: '168px',
  flex: '1',
};

export const SimplePagination = React.forwardRef<
  HTMLDivElement,
  PaginationProps
>((props, ref) => {
  const {
    count,
    children,
    defaultPage,
    disabled,
    hideNextButton,
    hidePreviousButton,
    id: defaultId,
    isInverse,
    page,
    testId,
    onClick,
    onChange,
    onPageChange,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);

  const i18n = React.useContext(I18nContext);

  const id = useGenerateId(defaultId);

  let [selectedPage, setSelectedPage] = React.useState(page || defaultPage);

  React.useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  React.useEffect(() => {
    setSelectedPage(selectedPage);
  }, [count]);

  function handleChange(event) {
    setSelectedPage(event.target.value);
    onPageChange &&
      typeof onPageChange === 'function' &&
      onPageChange(event, event.target.value);
  }

  //Decreases number by one on previous button click
  function handlePrev(event) {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
    onPageChange &&
      typeof onPageChange === 'function' &&
      onPageChange(event, selectedPage - 1);
  }

  //Increases number by one on next button click
  function handleNext(event) {
    if (selectedPage < count) {
      setSelectedPage(++selectedPage);
    }
    onPageChange &&
      typeof onPageChange === 'function' &&
      onPageChange(event, selectedPage);
  }

  function paginationLabel() {
    return `${i18n.simplePagination.ofLabel}
        ${count}
        ${
          count <= 1
            ? i18n.simplePagination.pageLabel
            : i18n.simplePagination.pagesLabel
        }`;
  }

  const pageAriaLabel = `${i18n.simplePagination.pageNumberLabel}
    ${selectedPage}
    ${paginationLabel()}
    ${i18n.simplePagination.selectedLabel}`;

  const disabledPrevTooltip =
    disabled || selectedPage <= 1 || count <= 0 || count == null;

  const disabledNextTooltip =
    disabled || selectedPage >= count || count == null;

  const prevTooltipContent = i18n.pagination.previousButtonLabel;
  const nextTooltipContent = i18n.pagination.nextButtonLabel;

  const PrevButton = (
    <NavButton
      aria-label={i18n.pagination.previousButtonLabel}
      variant={ButtonVariant.link}
      color={ButtonColor.secondary}
      disabled={disabledPrevTooltip}
      icon={<ArrowBackIcon />}
      isInverse={isInverse}
      testId={testId ? `${testId}-previous-button` : null}
      theme={theme}
      onClick={handlePrev}
      shape={ButtonShape.fill}
    />
  );

  const NextButton = (
    <NavButton
      aria-label={nextTooltipContent}
      variant={ButtonVariant.link}
      color={ButtonColor.secondary}
      disabled={disabledNextTooltip}
      icon={<ArrowForwardIcon />}
      isInverse={isInverse}
      onClick={handleNext}
      testId={testId ? `${testId}-next-button` : null}
      theme={theme}
      shape={ButtonShape.fill}
    />
  );

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
        <>
          {disabledPrevTooltip ? (
            <>{PrevButton}</>
          ) : (
            <Tooltip isInverse={isInverse} content={prevTooltipContent}>
              {PrevButton}
            </Tooltip>
          )}
          <Spacer size={16} />
        </>
      )}
      {count > 0 && (
        <>
          <NativeSelect
            aria-label={i18n.select.placeholder}
            data-testid={testId ? `${testId}-select` : `pagination-select`}
            containerStyle={nativeSelectStyles}
            disabled={disabled}
            fieldId={id}
            isInverse={isInverse}
            onChange={handleChange}
            value={selectedPage}
          >
            {Array.from({ length: count }, (_, i) => (
              <option
                aria-label={pageAriaLabel}
                data-testid={testId ? `${testId}-option-${i}` : `option-${i}`}
                key={i}
                onChange={handleChange}
                value={i + 1}
              >
                {i + 1}
              </option>
            ))}
          </NativeSelect>
          <Spacer size={8} />
          <label
            aria-hidden="true"
            data-testid={testId ? `${testId}-label` : `label`}
          >
            {paginationLabel()}
          </label>
          <VisuallyHidden>
            <Announce>{pageAriaLabel}</Announce>
          </VisuallyHidden>
        </>
      )}

      {!hideNextButton && (
        <>
          <Spacer size={16} />
          {disabledNextTooltip ? (
            <>{NextButton}</>
          ) : (
            <Tooltip isInverse={isInverse} content={nextTooltipContent}>
              {NextButton}
            </Tooltip>
          )}
        </>
      )}
    </StyledWrapper>
  );
});
