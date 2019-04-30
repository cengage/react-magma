import * as React from 'react';
const uuidv4 = require('uuid/v4');

export interface AlertCoreProps {
  children: (props) => React.ReactNode;
  transitionDuration: number;
  onDismiss: () => void;
  id?: string;
}

interface AlertCoreState {
  id?: string;
  isExiting?: boolean;
}

export class AlertCore extends React.Component<AlertCoreProps, AlertCoreState> {
  state: AlertCoreState = {};

  constructor(props) {
    super(props);

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
      id: this.state.id,
      handleDismiss: this.handleDismiss,
      isExiting: this.state.isExiting
    });
  }
}
