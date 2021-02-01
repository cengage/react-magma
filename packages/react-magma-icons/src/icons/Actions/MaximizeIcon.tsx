import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d: 'M4 3h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1z',
    },
  ],
  circles: [],
};

export const MaximizeIcon = (props: IconProps) => renderIcon(props, iconType);
