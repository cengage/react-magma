import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M11 18h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm-6 0h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1zm12 0h3c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zM10 6v4c0 .55.45 1 1 1h9c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-9c-.55 0-1 .45-1 1z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ViewQuiltIcon = (props: IconProps) => renderIcon(props, iconType);
