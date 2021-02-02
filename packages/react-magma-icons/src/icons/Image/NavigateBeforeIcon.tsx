import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M14.91 6.71a.9959.9959 0 00-1.41 0L8.91 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const NavigateBeforeIcon = (props: IconProps) =>
  renderIcon(props, iconType);
