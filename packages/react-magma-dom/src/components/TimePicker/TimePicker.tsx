import * as React from 'react';

import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { transparentize } from 'polished';
import { ScheduleIcon } from 'react-magma-icons';

import { ThemeContext } from '../../theme/ThemeContext';
import { Announce } from '../Announce';
import { AmPmToggle } from './AmPmToggle';
import { useTimePicker, UseTimePickerProps } from './useTimePicker';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { FormFieldContainer } from '../FormFieldContainer';
import { inputWrapperStyles } from '../InputBase';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TimePickerProps extends UseTimePickerProps {
  /**
   * Style properties for the outer input
   */
  inputStyle?: React.CSSProperties;
}

interface StyledNumInputProps {
  isFocused?: boolean;
  isInverse?: boolean;
  size?: number;
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

export const getInputColor = (
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

export const StyledNumInput = styled.input<StyledNumInputProps>`
  padding: 0;
  border: 0;
  text-align: center;
  text-align-last: center;
  min-width: ${props => (props.size ? `${props.size}ch` : 'auto')};
  max-width: ${props => (props.size ? `${props.size}ch` : 'auto')};
  width: ${props => props.theme.spaceScale.spacing06};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  background: transparent;
  border-bottom: 2px solid transparent; // Reserve space for border when focused
  caret-color: transparent;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -moz-appearance: textfield;

  &::placeholder {
    color: ${props =>
      getInputColor(props.isInverse, props.isFocused, props.theme)};
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

    &::selection {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.info700
          : transparentize(1, props.theme.colors.info200)};
    }
  }
`;

const InputsWithTimezone = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spaceScale.spacing03};
`;

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (props, ref) => {
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const {
      containerStyle,
      errorMessage,
      helperMessage,
      inputStyle,
      labelPosition,
      labelText,
      labelWidth,
      minutesStep,
      timezone,
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

    const hasTime = !isEmpty(hour) || !isEmpty(minute);

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
        <InputsWithTimezone theme={theme}>
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
              maxLength={2}
              max="12"
              min="1"
              isFocused={hasTime || isFocused}
              onChange={handleHourChange}
              onKeyDown={e => handleHourKeyDown(e, handleHourChange)}
              placeholder="--"
              ref={hourRef}
              theme={theme}
              type="number"
              value={hour}
              onFocus={e => {
                e.target.select();
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
            />
            <Divider
              isInverse={isInverse}
              isFocused={hasTime || isFocused}
              theme={theme}
            >
              :
            </Divider>
            <StyledNumInput
              aria-label={minutesLabel}
              data-testid="minutesTimeInput"
              id={minuteId}
              isInverse={isInverse}
              maxLength={2}
              max="59"
              min="0"
              isFocused={hasTime || isFocused}
              onChange={handleMinuteChange}
              onKeyDown={e => handleMinuteKeyDown(e, handleMinuteChange)}
              placeholder="--"
              ref={minuteRef}
              step={minutesStep || 1}
              theme={theme}
              type="number"
              value={minute}
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
              isFocused={hasTime || isFocused}
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
          {timezone}
        </InputsWithTimezone>
        <input id={id} ref={ref} type="hidden" value={time} />
      </FormFieldContainer>
    );
  }
);
