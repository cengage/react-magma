import * as React from 'react';
import { generateId } from '../utils';

export interface RadioCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue?: string;
  onFocus?: () => void;
  value?: string;
}

export interface RadioCoreState {
  id?: string;
  selectedValue?: string;
}

export class RadioCore extends React.Component<RadioCoreProps, RadioCoreState> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      selectedValue: this.props.value
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  onBlur() {
    this.props.onBlur &&
      typeof this.props.onBlur === 'function' &&
      this.props.onBlur();
  }

  onFocus() {
    this.props.onFocus &&
      typeof this.props.onFocus === 'function' &&
      this.props.onFocus();
  }

  onChange(event) {
    event.persist();
    const { value: selectedValue } = event.target;

    this.setState(
      () => ({ selectedValue }),
      () => {
        this.props.onChange &&
          typeof this.props.onChange === 'function' &&
          this.props.onChange(event);
      }
    );
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      selectedValue: this.state.selectedValue
    });
  }
}
