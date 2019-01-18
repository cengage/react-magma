import * as React from 'react';

export interface RadioCoreProps {
  children: (props) => React.ReactNode;
  handleBlur?: () => void;
  handleChange?: (event: React.SyntheticEvent) => void;
  selectedValue?: string;
  handleFocus?: () => void;
  value?: string;
}

export interface RadioCoreState {
  selectedValue?: string;
}

export class RadioCore extends React.Component<RadioCoreProps, RadioCoreState> {
  initialState: RadioCoreState = {
    selectedValue: this.props.value
  };
  state: RadioCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleBlur() {
    this.props.handleBlur && this.props.handleBlur();
  }

  handleFocus() {
    this.props.handleFocus && this.props.handleFocus();
  }

  handleChange(event) {
    event.persist();
    const { value: selectedValue } = event.target;

    this.setState(
      () => ({ selectedValue }),
      () => {
        this.props.handleChange && this.props.handleChange(event);
      }
    );
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      handleBlur: this.handleBlur,
      handleChange: this.handleChange,
      handleFocus: this.handleFocus,
      selectedValue: this.state.selectedValue
    });
  }
}
