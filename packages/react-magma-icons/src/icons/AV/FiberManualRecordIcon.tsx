import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [],
  circles: [
    {
      cx: '12',
      cy: '12',
      r: '8',
    },
  ],
};

export const FiberManualRecordIcon = (props: IconProps) =>
  renderIcon(props, iconType);
