import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M21 15c.55 0 1 .45 1 1s-.45 1-1 1h-7c-.55 0-1-.45-1-1s.45-1 1-1zM8 8.21c0-.45.54-.67.85-.36l3.79 3.79c.2.2.2.51 0 .71l-3.79 3.79c-.31.32-.85.1-.85-.35V13H3c-.55 0-1-.45-1-1s.45-1 1-1h5zM21 11c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0-4c.55 0 1 .45 1 1s-.45 1-1 1h-7c-.55 0-1-.45-1-1s.45-1 1-1z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ReadMoreIcon = (props: IconProps) => renderIcon(props, iconType);
