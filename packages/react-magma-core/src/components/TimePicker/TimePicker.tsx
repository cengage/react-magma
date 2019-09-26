import * as React from 'react';
import { generateId } from '../utils';

export interface TimePickerCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onChangeHour?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMinute?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPM?: boolean;
  hourValue?: number;
  minValue?: number;
}

export interface TimePickerCoreState {
  id?: string;
  isPM?: boolean;
  hourValue?: number;
  minValue?: number;
}

export class TimePickerCore extends React.Component<
  TimePickerCoreProps,
  TimePickerCoreState
> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      isPM: this.props.isPM,
      hourValue: this.props.hourValue,
      minValue: this.props.hourValue
    };

    this.onChangeHour = this.onChangeHour.bind(this);
    this.onChangeMinute = this.onChangeMinute.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

    if (prevProps.isPM !== this.props.isPM) {
      this.setState({ isPM: this.props.isPM });
    }

    if (prevProps.hourValue !== this.props.hourValue) {
      this.setState({ hourValue: this.props.hourValue });
    }

    if (prevProps.minValue !== this.props.minValue) {
      this.setState({ minValue: this.props.minValue });
    }
  }

  onChangeHour(hourValue: number) {
    this.setState({ hourValue });
  }

  onChangeMinute(minValue: number) {
    this.setState({ minValue });
  }

  onChangeAMPM(isPM: boolean) {
    this.setState({ isPM });
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onChangeAMPM: this.onChangeAMPM,
      onChangeHour: this.onChangeHour,
      onChangeMinute: this.onChangeMinute
    });
  }
}
