import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 16 24',
  paths: [
    {
      d:
        'M12,10a3.87,3.87,0,0,0-1.17-2.83A3.88,3.88,0,0,0,8,6a4,4,0,0,0-4,4,4,4,0,0,0,4,4,3.88,3.88,0,0,0,2.83-1.17A3.87,3.87,0,0,0,12,10Zm4,0a6.48,6.48,0,0,1-.52,2.8L9.79,24.89a1.76,1.76,0,0,1-.74.81,2,2,0,0,1-2.11,0,1.76,1.76,0,0,1-.72-.81L.51,12.8A6.64,6.64,0,0,1,0,10,7.73,7.73,0,0,1,2.34,4.34,7.72,7.72,0,0,1,8,2a7.71,7.71,0,0,1,5.65,2.34A7.74,7.74,0,0,1,16,10Z',
      transform: 'translate(0 -2)'
    }
  ]
};

export const MapMarkerIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
