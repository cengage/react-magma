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
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.defaultValue
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
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

  onChange(value) {
    this.setState(
      () => ({ value }),
      () => {
        this.props.onChange &&
          typeof this.props.onChange === 'function' &&
          this.props.onChange(value);
      }
    );
  }

  onOpen() {
    this.props.onOpen &&
      typeof this.props.onOpen === 'function' &&
      this.props.onOpen();
  }

  onClose() {
    this.props.onClose &&
      typeof this.props.onClose === 'function' &&
      this.props.onClose();
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
