import * as React from 'react';
import { LineSegment } from 'victory';

export const CustomAxisComponent = ({ events, ...props }) => {
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
