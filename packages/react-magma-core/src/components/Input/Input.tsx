import * as React from 'react';
const uuidv4 = require('uuid/v4');

export interface InputCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
  value?: string;
}

export interface InputCoreState {
  id?: string;
  value?: string;
  passwordShown?: boolean;
}

export class InputCore extends React.Component<InputCoreProps, InputCoreState> {
  initialState: InputCoreState = {
    id: this.props.id ? this.props.id : uuidv4(),
    value: this.props.value
  };
  state: InputCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.togglePasswordShown = this.togglePasswordShown.bind(this);
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange && this.props.onChange(event);

    this.setState(() => ({ value }));
  }

  togglePasswordShown() {
    this.setState({ passwordShown: !this.state.passwordShown });
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      togglePasswordShown: this.togglePasswordShown,
      passwordShown: this.state.passwordShown,
      value: this.state.value
    });
  }
}
