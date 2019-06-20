import * as React from 'react';
import { generateId, getTrapElements, getFocusedElementIndex } from '../utils';

export interface ModalCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  open?: boolean;
  onClose?: () => void;
  onEscKeyDown?: (event: React.KeyboardEvent) => void;
}

interface ModalCoreState {
  id?: string;
  isExiting?: boolean;
  focusableElements: Array<HTMLElement>;
}

export class ModalCore extends React.Component<ModalCoreProps, ModalCoreState> {
  private lastFocus = React.createRef<any>();
  private focusTrapElement = React.createRef<any>();

  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      focusableElements: []
    };

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps: ModalCoreProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

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
      event.stopPropagation();
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
      id: this.state.id,
      onClose: this.onClose,
      onKeyDown: this.onKeyDown,
      isExiting: this.state.isExiting,
      focusTrapElement: this.focusTrapElement
    });
  }
}
