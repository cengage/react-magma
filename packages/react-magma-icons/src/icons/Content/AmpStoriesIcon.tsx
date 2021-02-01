import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M16 4c.55 0 1 .45 1 1v13c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zM4 6c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm16 0c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z',
    },
  ],
  circles: [],
};

export const AmpStoriesIcon = (props: IconProps) => renderIcon(props, iconType);
