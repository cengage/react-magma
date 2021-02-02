import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M4.5143 7.3492C7.373 4.1225 11.9779 3.091 15.94 4.79a1 1 0 01.17 1.76 1 1 0 01-1 .07A7.69 7.69 0 0013 6.06a8 8 0 00-8.21 11.47 1 1 0 00.89.54h12.65a1 1 0 00.89-.53 8 8 0 00.69-4.73 7.55 7.55 0 00-.52-1.81 1 1 0 01.07-1 1 1 0 011.75.11 10 10 0 01-.55 8.89 2 2 0 01-1.74 1H5.07a2 2 0 01-1.72-1c-2.1638-3.7286-1.6946-8.4241 1.1643-11.6508zM19.08 6.93l-5.66 8.49a2.0011 2.0011 0 11-2.83-2.83l8.49-5.66z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const SpeedIcon = (props: IconProps) => renderIcon(props, iconType);
