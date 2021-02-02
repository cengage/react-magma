import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M11 18l6 3h-4v2l-6-3h4v-2zm6-15c1.1 0 2 .9 2 2v3.35L14.48 14H10c0 1.66-1.34 3-3 3s-3-1.34-3-3H2v-3c0-2.21 1.79-4 4-4h3c.55 0 1 .45 1 1v4h3.52L17 7.65V5h-2c-.55 0-1-.45-1-1l.0068-.1162C14.0648 3.388 14.4893 3 15 3zm2 8c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zM8 14H6c0 .55.45 1 1 1s1-.45 1-1zm11-1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM9 4c.55 0 1 .45 1 1l-.0068.1162C9.9352 5.612 9.5107 6 9 6H6c-.55 0-1-.45-1-1l.0068-.1162C5.0648 4.388 5.4893 4 6 4z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ElectricMopedIcon = (props: IconProps) =>
  renderIcon(props, iconType);
