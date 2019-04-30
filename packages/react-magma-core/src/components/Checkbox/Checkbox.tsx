import * as React from 'react';
const uuidv4 = require('uuid/v4');

export interface CheckboxCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
  checked?: boolean;
}

export interface CheckboxCoreState {
  id?: string;
  checked?: boolean;
}

export class CheckboxCore extends React.Component<
  CheckboxCoreProps,
  CheckboxCoreState
> {
  initialState: CheckboxCoreState = {
    id: this.props.id ? this.props.id : uuidv4(),
    checked: this.props.checked
  };
  state: CheckboxCoreState = this.initialState;

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
    const { checked } = event.target;
    this.props.onChange && this.props.onChange(event);

    this.setState(() => ({ checked }));
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      checked: this.state.checked
    });
  }
}
