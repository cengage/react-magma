import * as React from 'react';
import { getTrapElements, getFocusedElementIndex } from '../utils';

export interface ModalCoreProps {
  children: (props) => React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
}

interface ModalCoreState {
  isExiting?: boolean;
  focusableElements: Array<HTMLElement>;
}

export class ModalCore extends React.Component<ModalCoreProps, ModalCoreState> {
  private lastFocus = React.createRef<any>();
  private focusTrapElement = React.createRef<any>();

  constructor(props) {
    super(props);

    this.state = {
      focusableElements: []
    };

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps: ModalCoreProps) {
    if (!prevProps.open && this.props.open) {
      // @ts-ignore: CreateRef only gives back a immutable ref
      this.lastFocus.current = document.activeElement;
      this.setState({
        focusableElements: getTrapElements(this.focusTrapElement)
      });
    }
  }

  onKeyDown(event) {
    const { keyCode, shiftKey } = event;

    if (keyCode === 27) {
      event.preventDefault();
      this.props.onEscKeyDown &&
        typeof this.props.onEscKeyDown === 'function' &&
        this.props.onEscKeyDown(event);
      this.onClose();
    } else if (shiftKey && keyCode === 9) {
      const index = getFocusedElementIndex(
        this.state.focusableElements,
        event.target
      );

      if (index === 0) {
        event.preventDefault();
        this.state.focusableElements[
          this.state.focusableElements.length - 1
        ].focus();
      }
    } else if (keyCode === 9) {
      const index = getFocusedElementIndex(
        this.state.focusableElements,
        event.target
      );

      if (index === this.state.focusableElements.length - 1) {
        event.preventDefault();
        this.state.focusableElements[0].focus();
      }
    }
  }

  onClose() {
    this.setState({ isExiting: true }, () => {
      this.lastFocus.current.focus();
      setTimeout(() => {
        this.setState({ isExiting: false, focusableElements: [] });
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
      isExiting: this.state.isExiting,
      focusTrapElement: this.focusTrapElement
    });
  }
}
