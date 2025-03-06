import * as React from 'react';

import { LineSegment, LineSegmentProps } from 'victory';

export const CustomAxisComponent: React.FunctionComponent<LineSegmentProps> = ({
  events,
  ...props
}: any) => {
  return (
    <g>
      <LineSegment
        {...props}
        events={events}
        style={{
          strokeWidth: '50px',
          stroke: 'transparent',
        }}
      />
      <LineSegment
        {...props}
        events={events}
        style={{
          strokeWidth: '1px',
          stroke: 'black',
          strokeOpacity: '0.2',
        }}
      />
    </g>
  );
};
