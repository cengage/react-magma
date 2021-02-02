import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M17 5c1.1 0 2 .9 2 2v3.35L14.48 16H10c0 1.66-1.34 3-3 3s-3-1.34-3-3H2v-3c0-2.21 1.79-4 4-4h3c.55 0 1 .45 1 1v4h3.52L17 9.65V7h-2c-.55 0-1-.45-1-1l.0068-.1162C14.0648 5.388 14.4893 5 15 5zm2 8c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zM8 16H6c0 .55.45 1 1 1s1-.45 1-1zm11-1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM9 6c.55 0 1 .45 1 1l-.0068.1162C9.9352 7.612 9.5107 8 9 8H6c-.55 0-1-.45-1-1l.0068-.1162C5.0648 6.388 5.4893 6 6 6z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const MopedIcon = (props: IconProps) => renderIcon(props, iconType);
