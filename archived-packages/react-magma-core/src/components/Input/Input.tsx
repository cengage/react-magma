import * as React from 'react';
import { generateId } from '../utils';

export interface InputCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export interface InputCoreState {
  id?: string;
  value?: string;
  passwordShown?: boolean;
}

export class InputCore extends React.Component<InputCoreProps, InputCoreState> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      value: this.props.value
    };

    this.onChange = this.onChange.bind(this);
    this.togglePasswordShown = this.togglePasswordShown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange(value: string) {
    this.setState({ value });
  }

  togglePasswordShown() {
    this.setState({ passwordShown: !this.state.passwordShown });
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onChange: this.onChange,
      togglePasswordShown: this.togglePasswordShown,
      passwordShown: this.state.passwordShown,
      value: this.state.value
    });
  }
}
