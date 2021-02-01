import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M5 18h15c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zM4 6v4c0 .55.45 1 1 1h15c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1z',
    },
  ],
  circles: [],
};

export const ViewStreamIcon = (props: IconProps) => renderIcon(props, iconType);
