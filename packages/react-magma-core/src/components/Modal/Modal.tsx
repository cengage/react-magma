import * as React from 'react';
import { generateId } from '../utils';

export interface ModalCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  open?: boolean;
  onClose?: (callback: () => void) => void;
}

interface ModalCoreState {
  id?: string;
  isExiting?: boolean;
}

export class ModalCore extends React.Component<ModalCoreProps, ModalCoreState> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id)
    };

    this.onClose = this.onClose.bind(this);
  }

  componentDidUpdate(prevProps: ModalCoreProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  onClose(callback: () => void) {
    this.setState({ isExiting: true }, () => {
      setTimeout(() => {
        this.setState({ isExiting: false });
        callback();
      }, 700);
    });
  }

  render() {
    return this.props.children({
      ...this.props,
      id: this.state.id,
      onClose: this.onClose,
      isExiting: this.state.isExiting
    });
  }
}
