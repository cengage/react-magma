import * as React from 'react';

export interface SelectCoreProps {
  children: (props) => React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
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

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
  }

  onChange(value) {
    this.setState(
      () => ({ value }),
      () => {
        this.props.onChange && this.props.onChange(value);
      }
    );
  }

  onOpen() {
    this.props.onOpen && this.props.onOpen();
  }

  onClose() {
    this.props.onClose && this.props.onClose();
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
      onChange: this.onChange,
      onOpen: this.onOpen,
      onClose: this.onClose,
      value: this.state.value
    });
  }
}
