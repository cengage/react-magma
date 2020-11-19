import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.25',
  paths: [
    {
      d:
        'M12.56,18,7.89,26.13H23.33L28,18Zm14.12-2.29-8-13.88H9.33l8,13.88ZM8,4.17,0,18l4.67,8.09,8-13.88Z',
      transform: 'translate(0 -1.87)',
    },
  ],
};

export const GoogleDriveIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
