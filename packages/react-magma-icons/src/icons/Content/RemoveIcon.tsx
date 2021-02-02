import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d: 'M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const RemoveIcon = (props: IconProps) => renderIcon(props, iconType);
