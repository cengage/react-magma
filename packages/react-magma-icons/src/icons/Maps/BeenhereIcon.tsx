import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66l7.57 5.04c.34.22.77.22 1.11 0l7.56-5.04c.53-.36.88-.97.88-1.66V3c0-1.1-.9-2-2-2zm-.7 6.7l-7.59 7.59c-.39.39-1.02.39-1.41 0L5.71 11.7a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0L10 13.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.4 1.02.01 1.41z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const BeenhereIcon = (props: IconProps) => renderIcon(props, iconType);
