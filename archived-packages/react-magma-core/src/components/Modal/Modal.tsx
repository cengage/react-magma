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
}

export class ModalCore extends React.Component<ModalCoreProps, ModalCoreState> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id)
    };
  }

  componentDidUpdate(prevProps: ModalCoreProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  render() {
    return this.props.children({
      ...this.props,
      id: this.state.id
    });
  }
}
