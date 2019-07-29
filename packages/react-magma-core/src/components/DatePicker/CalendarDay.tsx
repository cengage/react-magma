import * as React from 'react';

export interface CalendarDayCoreProps {
  children: (props) => React.ReactNode;
  // onClick?: (event: React.SyntheticEvent) => void;
}

export class CalendarDayCore extends React.Component<CalendarDayCoreProps> {
  constructor(props) {
    super(props);

    // this.onClick = this.onClick.bind(this);
  }

  // onClick(event) {
  //   this.props.onClick && this.props.onClick(event);
  // }

  render() {
    return this.props.children({
      ...this.props
      // onClick: this.onClick
    });
  }
}
