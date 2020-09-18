import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 20.61 24.89',
  paths: [
    {
      d:
        'M5.73,24.5V3.5H16.24v6.61h6.22v9.33l1.94,2.34V8.94L17.47,1.55H3.79V26.44h16L17.47,24.5Z',
      transform: 'translate(-3.79 -1.55)'
    },
    {
      d: 'M14.53,14.9l-2.45-.83.83,2.48,9.91,9.89H24.4V24.8Z',
      transform: 'translate(-3.79 -1.55)'
    }
  ]
};

export const AssignIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
