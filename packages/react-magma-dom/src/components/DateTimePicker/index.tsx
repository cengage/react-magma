import React from 'react';

import { Button, ButtonColor, ButtonSize, styled, ThemeContext } from '../..';
import { DatePicker } from '../DatePicker';
import { LabelPosition } from '../Label';
import { TimePicker } from '../TimePicker';

const DoneButtonWrapper = styled.div`
  background-color: ${props => props.theme.colors.neutral200};
  padding: 16px;
  margin: 0 -16px -8px;
  display: flex;
  justify-content: flex-end;
`;

export const DateTimePicker = () => {
  const theme = React.useContext(ThemeContext);
  const datePickerApiRef = React.useRef(null);
  const previousTime = React.useRef<string>('');
  const [additionalInputContent, setAdditionalInputContent] =
    React.useState('');

  const handleDoneClick = () => {
    datePickerApiRef.current?.closeDatePickerManually();
  };

  const handleClear = () => {
    setAdditionalInputContent('');
    previousTime.current = '';
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value) {
      setAdditionalInputContent('');
      previousTime.current = '';
      return;
    }

    const cuttedValue = value.split(' ');

    const index = cuttedValue.findIndex(item => item.includes(':'));

    if (index > -1) {
      setAdditionalInputContent(cuttedValue.slice(index).join(' '));
      previousTime.current = cuttedValue.slice(index).join(' ');
    } else {
      if (cuttedValue[0] && cuttedValue[0] !== '') {
        setAdditionalInputContent(previousTime.current);
      } else {
        setAdditionalInputContent('');
        previousTime.current = '';
      }
    }
  };

  const onTimeChange = (value: string) => {
    setAdditionalInputContent(value);
    previousTime.current = value;
  };

  return (
    <DatePicker
      labelText="Pick a date and time"
      apiRef={datePickerApiRef}
      additionalInputContent={additionalInputContent}
      placeholder="mm/dd/yyyy hh:mm AM"
      onInputChange={onInputChange}
      setAdditionalInputContent={setAdditionalInputContent}
      isClearable
      onClear={handleClear}
      additionalContent={
        <>
          <TimePicker
            value={!additionalInputContent ? undefined : additionalInputContent}
            onChange={onTimeChange}
            labelPosition={LabelPosition.left}
            inputStyle={{ width: '100%' }}
            labelText="Time"
            containerStyle={{
              padding: '16px',
              margin: '0 -16px',
              borderTop: `1px solid ${theme.colors.neutral300}`,
            }}
          />
          <DoneButtonWrapper theme={theme}>
            <Button
              onClick={handleDoneClick}
              size={ButtonSize.small}
              color={ButtonColor.subtle}
            >
              Done
            </Button>
          </DoneButtonWrapper>
        </>
      }
    />
  );
};
