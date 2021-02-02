import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M2.194 3.427a.9959.9959 0 011.316.083l16.97 16.97c.39.39.39 1.02 0 1.41l-.094.083a.9959.9959 0 01-1.316-.083l-3.28-3.28-3.09 3.09c-.39.39-1.02.39-1.41 0l-9-9a.9959.9959 0 010-1.41L5.38 8.2 2.1 4.92a.9959.9959 0 010-1.41zM11.3 2.29c.39-.39 1.02-.39 1.41 0l9 9c.38.4.38 1.03 0 1.41l-3.09 3.09-3.45-3.45.98-.98c.2-.2.2-.51 0-.71L13 7.5v2.67L8.21 5.38zm-3.28 8.56c-.01.05-.03.1-.03.15v3c0 .55.45 1 1 1s1-.45 1-1v-1.18z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const DirectionsOffIcon = (props: IconProps) =>
  renderIcon(props, iconType);
