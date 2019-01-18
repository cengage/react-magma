import * as React from 'react';

export class ButtonCore extends React.Component<ButtonCoreProps> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handleClick && this.props.handleClick(event);
  }

  render() {
    return this.props.children({
      ...this.props,
      handleClick: this.handleClick
    });
  }
}

export interface ButtonCoreProps {
  children: (props) => React.ReactNode;
  handleClick?: (event: React.SyntheticEvent) => void;
}
