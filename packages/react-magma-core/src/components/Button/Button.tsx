import * as React from 'react';

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

export interface ButtonCoreProps {
  children: (props) => React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
}
