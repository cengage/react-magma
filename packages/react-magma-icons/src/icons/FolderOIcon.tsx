import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 26 22',
  paths: [
    {
      d:
        'M24,21.5v-11a1.4,1.4,0,0,0-.44-1.06A1.44,1.44,0,0,0,22.5,9h-11a1.46,1.46,0,0,1-1.06-.44A1.44,1.44,0,0,1,10,7.5v-1a1.4,1.4,0,0,0-.44-1.06A1.44,1.44,0,0,0,8.5,5h-5a1.46,1.46,0,0,0-1.06.44A1.44,1.44,0,0,0,2,6.5v15a1.44,1.44,0,0,0,.44,1.06A1.46,1.46,0,0,0,3.5,23h19a1.44,1.44,0,0,0,1.06-.44A1.4,1.4,0,0,0,24,21.5Zm2-11v11A3.52,3.52,0,0,1,22.5,25H3.5A3.36,3.36,0,0,1,1,24,3.4,3.4,0,0,1,0,21.5V6.5A3.4,3.4,0,0,1,1,4,3.36,3.36,0,0,1,3.5,3h5A3.36,3.36,0,0,1,11,4,3.36,3.36,0,0,1,12,6.5V7H22.5A3.52,3.52,0,0,1,26,10.5Z',
      transform: 'translate(0 -3)'
    }
  ]
};

export const FolderOIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
