import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M15.06 2.17c3.92-.06 7.11 3.09 7.11 7 0 3.59-2.7 6.54-6.17 6.95V20h2c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1v-4h-.5c-.28 0-.5-.22-.5-.5V13c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v3.5c0 .28-.22.5-.5.5H6v3h8.01v-3.94c-3.25-.54-5.74-3.32-5.83-6.7-.11-3.82 3.05-7.13 6.88-7.19zM4.5 8C5.3284 8 6 8.6716 6 9.5S5.3284 11 4.5 11 3 10.3284 3 9.5 3.6716 8 4.5 8z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const NaturePeopleIcon = (props: IconProps) =>
  renderIcon(props, iconType);
