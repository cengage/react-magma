import * as React from 'react';

export interface SelectCoreProps {
  children: (props) => React.ReactNode;
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleChange?: (value: string) => void;
  handleOpen?: () => void;
  handleClose?: () => void;
  defaultValue?: string;
}

export interface SelectCoreState {
  value?: string;
}

export class SelectCore extends React.Component<
  SelectCoreProps,
  SelectCoreState
> {
  initialState: SelectCoreState = {
    value: this.props.defaultValue
  };
  state: SelectCoreState = this.initialState;

  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleBlur() {
    this.props.handleBlur && this.props.handleBlur();
  }

  handleFocus() {
    this.props.handleFocus && this.props.handleFocus();
  }

  handleChange(value) {
    this.setState(
      () => ({ value }),
      () => {
        this.props.handleChange && this.props.handleChange(this.state.value);
      }
    );
  }

  handleOpen() {
    this.props.handleOpen && this.props.handleOpen();
  }

  handleClose() {
    this.props.handleClose && this.props.handleClose();
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      handleChange: this.handleChange,
      handleOpen: this.handleOpen,
      handleClose: this.handleClose,
      value: this.state.value
    });
  }
}
