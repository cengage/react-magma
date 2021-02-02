import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19 19c.55 0 1 .45 1 1s-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1zM8 3v2.4L6.19 6.85c-.12.09-.19.24-.19.39v4.26c0 .28.22.5.5.5h4c.28 0 .5-.22.5-.5V7.24c0-.15-.07-.3-.19-.39L9 5.4V3h11c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-2v3c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V5c0-1.1.9-2 2-2h2zm12 2h-2v3h2V5z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const EmojiFoodBeverageIcon = (props: IconProps) =>
  renderIcon(props, iconType);
