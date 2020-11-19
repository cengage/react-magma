import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 25.3 17.51',
  paths: [
    { d: 'M8.75,9.14H22.37v1.62H8.75Z', transform: 'translate(-0.97 -5.24)' },
    {
      d:
        'M4.86,5.24v3.9H1V22.76h21.4v-3.9h3.9V5.24Zm15.89,15.9H2.59V10.76H4.86v8.11H20.75Zm3.9-3.9H6.48V6.86H24.65Z',
      transform: 'translate(-0.97 -5.24)',
    },
  ],
};

export const FlashcardsIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
