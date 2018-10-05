import * as React from 'react';

export class ButtonCore extends React.Component<ButtonCoreProps> {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick && this.props.handleClick();
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
  handleClick?: () => void;
}
