import * as React from 'react';
import { generateId } from '../utils';

export interface CheckboxCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onChange?: (checked: boolean) => void;
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
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      checked: this.props.checked,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  onChange(checked: boolean) {
    this.setState({ checked });
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onChange: this.onChange,
      checked: this.state.checked,
    });
  }
}
