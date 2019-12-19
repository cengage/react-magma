import * as React from 'react';

export interface Options {
  label: string;
  value: string;
}
export interface SelectCoreProps {
  children: (props) => React.ReactNode;
  onChange?: (value: Options | Options[] | null) => void;
  defaultValue?: Options | Options[] | null;
  value?: Options | Options[] | null;
}

export interface SelectCoreState {
  value?: Options | Options[] | null;
}

export class SelectCore extends React.Component<
  SelectCoreProps,
  SelectCoreState
> {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue || this.props.value
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange(value: Options | Options[] | null) {
    this.setState({ value });
    this.props.onChange &&
      typeof this.props.onChange === 'function' &&
      this.props.onChange(value);
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      onChange: this.onChange,
      value: this.state.value
    });
  }
}
