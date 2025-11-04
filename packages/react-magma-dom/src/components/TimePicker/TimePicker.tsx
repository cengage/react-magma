import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { ScheduleIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import { AmPmToggle } from './AmPmToggle';
import { useTimePicker, UseTimePickerProps } from './useTimePicker';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { isNotEmpty } from '../../utils';
import { FormFieldContainer } from '../FormFieldContainer';
import { inputWrapperStyles } from '../InputBase';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TimePickerProps extends UseTimePickerProps {
  /**
   * Style properties for the outer input
   */
  inputStyle?: React.CSSProperties;
}

const InputsContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
}>`
  ${inputWrapperStyles};
  height: ${props => props.theme.spaceScale.spacing09};
  padding: ${props => props.theme.spaceScale.spacing03};
  min-width: 144px;
  width: fit-content;
  font-family: ${props => props.theme.bodyFont};
`;

const getDividerColor = (
  isInverse: boolean,
  isFocused: boolean,
  theme: ThemeInterface
): string => {
  if (isInverse) {
    return isFocused
      ? theme.colors.neutral100
      : transparentize(0.3, theme.colors.neutral100);
  }

  return isFocused ? theme.colors.neutral700 : theme.colors.neutral500;
};

export const Divider = styled.span<{
  isInverse?: boolean;
  isFocused?: boolean;
}>`
  display: inline-block;
  position: relative;
  top: ${props => `-${props.theme.spaceScale.spacing01}`};
  color: ${props =>
    getDividerColor(props.isInverse, props.isFocused, props.theme)};
`;

const StyledNumInput = styled.input<{
  isInverse?: boolean;
}>`
  border: 0;
  border-bottom: 2px solid transparent; // Reserve space for border when focused
  margin-right: ${props => props.theme.spaceScale.spacing01};
  /* padding: 0 ${props => props.theme.spaceScale.spacing01}; */
  padding: 0;
  text-align: right;
  text-align-last: center;
  /* width: ${props => props.theme.spaceScale.spacing06}; */
  width: 20px;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  background: transparent;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -moz-appearance: textfield;

  &::placeholder {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
  }

  &:focus {
    outline: 0;
    border-bottom: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.info200
          : props.theme.colors.info500};
    background: ${props =>
      props.isInverse
        ? props.theme.colors.info700
        : transparentize(0.2, props.theme.colors.info200)};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};

    &::placeholder {
      color: ${props =>
        props.isInverse
          ? props.theme.colors.neutral100
          : props.theme.colors.neutral700};
    }

    &::selection {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.info700
          : transparentize(1, props.theme.colors.info200)};
    }
  }
`;

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (props, ref) => {
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleNumericBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
      const native = e.nativeEvent as InputEvent;

      if (typeof native.data === 'string' && /\D/.test(native.data)) {
        e.preventDefault();
      }
    };

    const {
      containerStyle,
      errorMessage,
      helperMessage,
      inputStyle,
      labelPosition,
      labelText,
      labelWidth,
      minutesStep,
      onChange,
      ...other
    } = props;

    const isInverse = useIsInverse(props.isInverse);

    const {
      am,
      amPm,
      amPmRef,
      descriptionId,
      hour,
      hourId,
      hourRef,
      id,
      time,
      minute,
      minuteId,
      minuteRef,
      toggleAmPm,
      handleHourChange,
      handleMinuteChange,
      handleHourKeyDown,
      handleMinuteKeyDown,
      handleAmPmKeyDown,
    } = useTimePicker(props);

    const hoursLabel = `${labelText}, ${i18n.timePicker.hoursAriaLabel}`;
    const minutesLabel = `${labelText}, ${i18n.timePicker.minutesAriaLabel}`;
    const amPmLabel = `${labelText}, ${
      amPm === am
        ? i18n.timePicker.amButtonAriaLabel
        : i18n.timePicker.pmButtonAriaLabel
    }`;

    const isNotEmptyDate = isNotEmpty(hour) || isNotEmpty(minute);

    return (
      <FormFieldContainer
        {...other}
        containerStyle={containerStyle}
        errorMessage={errorMessage}
        fieldId={id}
        helperMessage={helperMessage}
        isInverse={isInverse}
        labelText={labelText}
        labelPosition={labelPosition}
        labelWidth={labelWidth}
      >
        <InputsContainer
          isInverse={isInverse}
          hasError={!!errorMessage}
          theme={theme}
          style={inputStyle}
        >
          <ScheduleIcon
            color={
              isInverse ? theme.colors.neutral100 : theme.colors.neutral700
            }
            style={{ marginRight: theme.spaceScale.spacing02 }}
          />
          <StyledNumInput
            aria-label={hoursLabel}
            aria-describedby={descriptionId}
            data-testid="hoursTimeInput"
            id={hourId}
            isInverse={isInverse}
            onChange={handleHourChange}
            onBeforeInput={handleNumericBeforeInput}
            onKeyDown={e => handleHourKeyDown(e, handleHourChange)}
            placeholder="--"
            ref={hourRef}
            theme={theme}
            type="text"
            value={hour}
            inputMode="numeric"
            pattern="[0-9]*"
            onFocus={e => {
              e.target.select();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          <Divider
            isInverse={isInverse}
            isFocused={isNotEmptyDate || isFocused}
            theme={theme}
          >
            :
          </Divider>
          <StyledNumInput
            aria-label={minutesLabel}
            data-testid="minutesTimeInput"
            id={minuteId}
            isInverse={isInverse}
            onChange={handleMinuteChange}
            onBeforeInput={handleNumericBeforeInput}
            onKeyDown={e => handleMinuteKeyDown(e, handleMinuteChange)}
            placeholder="--"
            ref={minuteRef}
            step={minutesStep || 1}
            theme={theme}
            type="text"
            value={minute}
            inputMode="numeric"
            pattern="[0-9]*"
            onFocus={e => {
              e.target.select();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          <AmPmToggle
            aria-label={amPmLabel}
            isInverse={isInverse}
            ref={amPmRef}
            onClick={toggleAmPm}
            onKeyDown={handleAmPmKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {amPm}
          </AmPmToggle>
          <VisuallyHidden>
            <Announce>
              {amPm === am
                ? i18n.timePicker.amSelectedAnnounce
                : i18n.timePicker.pmSelectedAnnounce}
            </Announce>
          </VisuallyHidden>
        </InputsContainer>
        <input id={id} ref={ref} type="hidden" value={time} />
      </FormFieldContainer>
    );
  }
);
