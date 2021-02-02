import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19.5 13c1.38 0 2.5 1.12 2.5 2.5v.5c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1v-.5c0-1.38 1.12-2.5 2.5-2.5zM18.29 2.7c.63-.63 1.71-.18 1.71.71v7.64c-.17-.02-.33-.05-.5-.05-2.21 0-4.05 1.6-4.43 3.7-.65.56-1.07 1.38-1.07 2.3v3H3.41c-.89 0-1.33-1.08-.7-1.71zM19.5 14c-.83 0-1.5.67-1.5 1.5v.5h3v-.5c0-.83-.67-1.5-1.5-1.5z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const NetworkLockedIcon = (props: IconProps) =>
  renderIcon(props, iconType);
