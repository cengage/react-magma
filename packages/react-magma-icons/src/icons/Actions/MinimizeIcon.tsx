import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d: 'M7 19h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const MinimizeIcon = (props: IconProps) => renderIcon(props, iconType);
