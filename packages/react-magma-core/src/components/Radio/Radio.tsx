import * as React from 'react';

export class RadioCore extends React.Component<RadioCoreProps, RadioCoreState> {
  initialState: RadioCoreState = {
    checked: this.props.value === this.props.selectedValue
  };
  state: RadioCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { checked, value } = event.target;

    this.setState(
      () => ({ checked }),
      () => {
        this.props.handleChange && this.props.handleChange(event);
      }
    );
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      handleChange: this.handleChange,
      checked: this.state.checked
    });
  }
}

export interface RadioCoreProps {
  children: (props) => React.ReactNode;
  handleChange?: (event: object) => void;
  selectedValue?: string;
  value?: string;
}

export interface RadioCoreState {
  checked?: boolean;
}
