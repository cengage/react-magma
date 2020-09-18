import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm1.4,21H12.6V18.2h2.8Zm0-5.6H12.6V7h2.8Z',
      transform: 'translate(0 0)'
    }
  ]
};

export const ErrorBlackIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
