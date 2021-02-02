import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm-7 3c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm2.62 9c-.71.61-1.61 1-2.62 1s-1.91-.39-2.62-1zm1.34-2.5c-.07.54-.25 1.05-.51 1.5H8.56c-.27-.45-.44-.96-.5-1.5zm-.52-2.5c.27.45.44.96.51 1.5h-7.9c.07-.54.25-1.05.51-1.5zM12 8c1.01 0 1.91.39 2.62 1H9.38c.71-.61 1.61-1 2.62-1z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const HvacIcon = (props: IconProps) => renderIcon(props, iconType);
