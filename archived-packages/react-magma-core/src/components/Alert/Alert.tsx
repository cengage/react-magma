import * as React from 'react';

export interface AlertCoreProps {
  children: (props) => React.ReactNode;
  transitionDuration: number;
  onDismiss: () => void;
}

interface AlertCoreState {
  isExiting?: boolean;
}

export class AlertCore extends React.Component<AlertCoreProps, AlertCoreState> {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    this.setState({ isExiting: true }, () => {
      setTimeout(() => {
        this.setState({ isExiting: false });
        this.props.onDismiss();
      }, this.props.transitionDuration - 300);
    });
  }

  render() {
    return this.props.children({
      ...this.props,
      handleDismiss: this.handleDismiss,
      isExiting: this.state.isExiting,
    });
  }
}
