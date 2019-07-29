import * as React from 'react';

export interface CalendarDayCoreProps {
  children: (props) => React.ReactNode;
}

export class CalendarDayCore extends React.Component<CalendarDayCoreProps> {
  render() {
    return this.props.children({
      ...this.props
    });
  }
}
