import * as React from 'react';
import { generateId } from '../utils';

export interface InputCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
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

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.togglePasswordShown = this.togglePasswordShown.bind(this);
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
    const { value } = event.target;
    this.props.onChange &&
      typeof this.props.onChange === 'function' &&
      this.props.onChange(event);

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
