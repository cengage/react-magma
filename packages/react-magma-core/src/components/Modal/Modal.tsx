import * as React from 'react';

export interface ModalCoreProps {
  children: (props) => React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
}

interface ModalCoreState {
  isExiting?: boolean;
}

export class ModalCore extends React.Component<ModalCoreProps, ModalCoreState> {
  private lastFocus = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);

    this.state = {};

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps: ModalCoreProps) {
    if (!prevProps.open && this.props.open) {
      // @ts-ignore: CreateRef only gives back a immutable ref
      this.lastFocus.current = document.activeElement;
    }
  }

  onKeyDown(event: React.KeyboardEvent) {
    console.log('in on key down');
    const { key } = event;

    if (key === 'Escape') {
      event.preventDefault();
      this.props.onEscKeyDown &&
        typeof this.props.onEscKeyDown === 'function' &&
        this.props.onEscKeyDown(event);
      this.onClose();
    }
  }

  onClose() {
    console.log('in on close');
    this.setState({ isExiting: true }, () => {
      this.lastFocus.current.focus();
      setTimeout(() => {
        this.setState({ isExiting: false });
        this.props.onClose &&
          typeof this.props.onClose === 'function' &&
          this.props.onClose();
      }, 700);
    });
  }

  render() {
    return this.props.children({
      ...this.props,
      onClose: this.onClose,
      onKeyDown: this.onKeyDown,
      isExiting: this.state.isExiting
    });
  }
}
