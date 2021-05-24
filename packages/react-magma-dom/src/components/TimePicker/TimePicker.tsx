import * as React from 'react';
import styled from '../../theme/styled';
import { Announce } from '../Announce';
import { ThemeContext } from '../../theme/ThemeContext';
import { AmPmToggle } from './AmPmToggle';
import { ScheduleIcon } from 'react-magma-icons';
import { useTimePicker, UseTimePickerProps } from './useTimePicker';

import { I18nContext } from '../../i18n';
import { VisuallyHidden } from '../VisuallyHidden';
import { useIsInverse } from '../../inverse';
import { FormField } from '../FormField';
import { inputWrapperStyles } from '../InputBase';

export interface TimePickerProps extends UseTimePickerProps {
  /**
   * Style properties for the outer container
   */
  containerStyle?: React.CSSProperties;
  /**
   * This is internal to stay consistent with our props tables and our messaging around spreading default props to elements.
   * @internal
   */
  id?: string;
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
  width: 144px;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 1px;
  position: relative;
  top: -1px;
`;

const StyledNumInput = styled.input`
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  margin-right: ${props => props.theme.spaceScale.spacing01};
  padding: 0 ${props => props.theme.spaceScale.spacing01};
  text-align: right;
  width: ${props => props.theme.spaceScale.spacing06};

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -moz-appearance: textfield;

  &:focus {
    outline: 0;
    background: ${props => props.theme.colors.foundation02};
    color: ${props => props.theme.colors.neutral08};
  }
`;

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (props, ref) => {
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    const {
      containerStyle,
      errorMessage,
      helperMessage,
      inputStyle,
      labelStyle,
      labelText,
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

    return (
      <FormField
        {...other}
        errorMessage={errorMessage}
        helperMessage={helperMessage}
        isInverse={isInverse}
        labelText={labelText}
        fieldId={id}
        style={containerStyle}
      >
        <InputsContainer
          isInverse={isInverse}
          hasError={!!errorMessage}
          theme={theme}
        >
          <ScheduleIcon color={theme.colors.neutral} />
          <StyledNumInput
            aria-label={hoursLabel}
            aria-describedby={descriptionId}
            data-testid="hoursTimeInput"
            id={hourId}
            maxLength={2}
            max="12"
            min="1"
            onChange={handleHourChange}
            onKeyDown={handleHourKeyDown}
            placeholder="--"
            ref={hourRef}
            theme={theme}
            type="number"
            value={hour}
          />
          <Divider> : </Divider>
          <StyledNumInput
            aria-label={minutesLabel}
            data-testid="minutesTimeInput"
            id={minuteId}
            maxLength={2}
            max="59"
            min="0"
            onChange={handleMinuteChange}
            onKeyDown={handleMinuteKeyDown}
            placeholder="--"
            ref={minuteRef}
            step={minutesStep || 1}
            theme={theme}
            type="number"
            value={minute}
          />
          <AmPmToggle
            aria-label={amPmLabel}
            ref={amPmRef}
            onClick={toggleAmPm}
            onKeyDown={handleAmPmKeyDown}
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
      </FormField>
    );
  }
);
