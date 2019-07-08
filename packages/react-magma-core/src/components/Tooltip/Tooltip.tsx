import * as React from 'react';
import { generateId } from '../utils';

export interface TooltipCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
}

export interface TooltipCoreState {
  id?: string;
}

export class TooltipCore extends React.Component<
  TooltipCoreProps,
  TooltipCoreState
> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  render() {
    return this.props.children({
      ...this.state,
      ...this.props,
      id: this.state.id
    });
  }
}
