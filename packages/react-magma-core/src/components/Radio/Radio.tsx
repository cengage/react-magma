import * as React from 'react';
import { generateId } from '../utils';

export interface RadioCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  selectedValue?: string;
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

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

    if (prevProps.value !== this.props.value) {
      this.setState({ selectedValue: this.props.value });
    }
  }

  onChange(selectedValue: string) {
    this.setState({ selectedValue });
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id,
      onChange: this.onChange,
      selectedValue: this.state.selectedValue
    });
  }
}
