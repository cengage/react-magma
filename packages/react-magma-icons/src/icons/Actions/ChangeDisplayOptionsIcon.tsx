import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M21 5c.5523 0 1 .4477 1 1s-.4477 1-1 1h-4v11c0 .5523-.4477 1-1 1s-1-.4477-1-1V7h-4c-.5523 0-1-.4477-1-1s.4477-1 1-1h10zm-11 5c.5523 0 1 .4477 1 1s-.4477 1-1 1H8v6c0 .5523-.4477 1-1 1s-1-.4477-1-1v-6H4c-.5523 0-1-.4477-1-1s.4477-1 1-1h6z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const ChangeDisplayOptionsIcon = (props: IconProps) =>
  renderIcon(props, iconType);
