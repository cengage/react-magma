import * as React from 'react';
const uuidv4 = require('uuid/v4');

export interface RadioCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  selectedValue?: string;
  onFocus?: () => void;
  value?: string;
}

export interface RadioCoreState {
  id?: string;
  selectedValue?: string;
}

export class RadioCore extends React.Component<RadioCoreProps, RadioCoreState> {
  initialState: RadioCoreState = {
    id: this.props.id ? this.props.id : uuidv4(),
    selectedValue: this.props.value
  };
  state: RadioCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
  }

  onChange(event) {
    event.persist();
    const { value: selectedValue } = event.target;

    this.setState(
      () => ({ selectedValue }),
      () => {
        this.props.onChange && this.props.onChange(event);
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
