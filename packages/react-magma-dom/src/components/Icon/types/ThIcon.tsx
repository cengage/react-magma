import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 16.59 16.59',
  paths: [
    {
      d:
        'M5.7,9.85H9.85V5.7H5.7ZM11.93,22.3h4.14V18.15H11.93Zm-6.23,0H9.85V18.15H5.7Zm0-6.23H9.85V11.93H5.7Zm6.23,0h4.14V11.93H11.93ZM18.15,5.7V9.85H22.3V5.7ZM11.93,9.85h4.14V5.7H11.93Zm6.22,6.22H22.3V11.93H18.15Zm0,6.23H22.3V18.15H18.15Z',
      transform: 'translate(-5.7 -5.7)'
    }
  ]
};

export const ThIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
  renderIcon(props, iconType);
