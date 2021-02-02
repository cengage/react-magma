import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M14 6l-.72-1.45c-.17-.34-.52-.55-.9-.55H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5l.72 1.45c.17.34.52.55.89.55H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-5zm4 8h-4l-1-2H7V6h5l1 2h5v6z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const OutlinedFlagIcon = (props: IconProps) =>
  renderIcon(props, iconType);
