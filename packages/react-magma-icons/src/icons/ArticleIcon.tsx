import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21.53 26',
  paths: [
    {
      d: 'M5.58,25V3.07h11V10h6.5V27h2V8.76L17.83,1H3.55V27H25.08V25Z',
      transform: 'translate(-3.55 -1.04)',
    },
    { d: 'M8.72,12.68H19.9v2H8.72Z', transform: 'translate(-3.55 -1.04)' },
    { d: 'M8.72,16.51H19.9v2H8.72Z', transform: 'translate(-3.55 -1.04)' },
    { d: 'M8.72,20.33H19.9v2H8.72Z', transform: 'translate(-3.55 -1.04)' },
  ],
};

export const ArticleIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
