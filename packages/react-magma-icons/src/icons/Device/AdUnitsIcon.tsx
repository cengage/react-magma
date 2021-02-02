import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M17 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm-1 4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 1c.55 0 1 .45 1 1l-.0068.1162C15.9352 7.612 15.5107 8 15 8H9c-.55 0-1-.45-1-1l.0068-.1162C8.0648 6.388 8.4893 6 9 6z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const AdUnitsIcon = (props: IconProps) => renderIcon(props, iconType);
