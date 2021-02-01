import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M15.76 16.34l3.53 3.53c.39.39.39 1.03 0 1.42l-.0942.083c-.3928.3047-.9658.277-1.3258-.083l-3.53-3.53 1.42-1.42zM5.15 4.32c.39-.39 1.02-.39 1.41 0l8.49 8.49c.39.39.39 1.02 0 1.41l-2.83 2.83c-.39.39-1.02.39-1.41 0L2.32 8.56a.9959.9959 0 010-1.41zM18.5 2C20.433 2 22 3.567 22 5.5S20.433 9 18.5 9 15 7.433 15 5.5 16.567 2 18.5 2z',
    },
  ],
  circles: [],
};

export const SportsCricketIcon = (props: IconProps) =>
  renderIcon(props, iconType);
