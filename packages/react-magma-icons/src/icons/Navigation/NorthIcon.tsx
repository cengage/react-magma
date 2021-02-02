import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M5.71 9.7c.39.39 1.02.39 1.41 0L11 5.83V21c0 .55.45 1 1 1s1-.45 1-1V5.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 2.7a.9959.9959 0 00-1.41 0L5.71 8.29c-.39.39-.39 1.03 0 1.41z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const NorthIcon = (props: IconProps) => renderIcon(props, iconType);
