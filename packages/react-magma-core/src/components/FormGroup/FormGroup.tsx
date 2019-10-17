import * as React from 'react';
import { generateId } from '../utils';

export interface FormGroupCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
}

interface FormGroupCoreState {
  id?: string;
}

export class FormGroupCore extends React.Component<
  FormGroupCoreProps,
  FormGroupCoreState
> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id)
    };
  }

  componentDidUpdate(prevProps: FormGroupCoreProps) {
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
