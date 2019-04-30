import * as React from 'react';
const uuidv4 = require('uuid/v4');

export interface ButtonCoreProps {
  children: (props) => React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
}

export class ButtonCore extends React.Component<ButtonCoreProps> {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick && this.props.onClick(event);
  }

  render() {
    return this.props.children({
      ...this.props,
      onClick: this.onClick
    });
  }
}
