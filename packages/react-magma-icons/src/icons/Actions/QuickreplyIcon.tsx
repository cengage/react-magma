import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M21.24 12c.36 0 .6.37.46.7L20.3 16h1.39c.37 0 .61.39.44.72l-2.66 5.33c-.11.24-.47.15-.47-.11V18h-1.5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5zM20 2c1.1 0 2 .9 2 2v6h-6c-.55 0-1 .45-1 1v7H6l-4 4 .01-18c0-1.1.89-2 1.99-2z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const QuickreplyIcon = (props: IconProps) => renderIcon(props, iconType);
