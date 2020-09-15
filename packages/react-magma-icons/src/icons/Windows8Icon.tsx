import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 26.25 26.25',
  paths: [
    {
      d:
        'M.88,13.12V4.59l10.5-1.42v10ZM13.12,2.91l14-2V13.12h-14Zm14,12V27.12l-14-2V14.88Zm-15.74,10L.88,23.5V14.88H11.37Z',
      transform: 'translate(-0.88 -0.88)'
    }
  ]
};

export const Windows8Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
