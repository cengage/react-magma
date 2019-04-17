import * as React from 'react';

export interface ToastCoreProps {
  children: (props) => React.ReactNode;
  toastDuration?: number;
  onDismiss: () => void;
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const DEFAULT_TOAST_DURATION = 5000;

export class ToastCore extends React.Component<ToastCoreProps> {
  constructor(props) {
    super(props);

    this.setAutoHideTimer = this.setAutoHideTimer.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  private timerAutoHide;

  componentDidMount() {
    this.setAutoHideTimer(this.props.toastDuration);
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

  handleMouseEnter = event => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
    this.handlePause();
  };

  handleMouseLeave = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
    this.handleResume();
  };

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
      handleMouseEnter: this.handleMouseEnter,
      handleMouseLeave: this.handleMouseLeave
    });
  }
}
