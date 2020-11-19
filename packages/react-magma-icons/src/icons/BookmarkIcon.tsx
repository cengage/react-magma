import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 17.5 28',
  paths: [
    { d: 'M5.25,0V28L14,19.25,22.75,28V0Z', transform: 'translate(-5.25)' },
  ],
};

export const BookmarkIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
