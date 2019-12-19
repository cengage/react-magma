import * as React from 'react';

export interface ToastCoreProps {
  children: (props) => React.ReactNode;
  toastDuration?: number;
  disableAutoDismiss?: boolean;
  onDismiss: () => void;
}

const DEFAULT_TOAST_DURATION = 5000;

export class ToastCore extends React.Component<ToastCoreProps> {
  constructor(props) {
    super(props);

    this.setAutoHideTimer = this.setAutoHideTimer.bind(this);
    this.clearTimeoutAndDismiss = this.clearTimeoutAndDismiss.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  private timerAutoHide;

  componentDidMount() {
    if (!this.props.disableAutoDismiss) {
      this.setAutoHideTimer(this.props.toastDuration);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  setAutoHideTimer(toastDuration = DEFAULT_TOAST_DURATION) {
    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      this.props.onDismiss();
    }, toastDuration);
  }

  clearTimeoutAndDismiss() {
    clearTimeout(this.timerAutoHide);
    this.props.onDismiss();
  }

  handlePause = () => {
    clearTimeout(this.timerAutoHide);
  };

  handleResume = () => {
    this.setAutoHideTimer(
      (this.props.toastDuration || DEFAULT_TOAST_DURATION) * 0.5
    );
  };

  render() {
    return this.props.children({
      ...this.props,
      clearTimeoutAndDismiss: this.clearTimeoutAndDismiss,
      handlePause: this.handlePause,
      handleResume: this.handleResume
    });
  }
}
