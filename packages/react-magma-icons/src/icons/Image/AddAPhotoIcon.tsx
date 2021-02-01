import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M15.12 4c.56 0 1.1.24 1.47.65L17.83 6H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9.72c.3.17.63.28 1 .28 1.1 0 2-.9 2-2V7h1c1.1 0 2-.9 2-2 0-.37-.11-.7-.28-1zM13 9c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3 1.3431-3 3-3zM4 1c.55 0 1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1H5v2c0 .55-.45 1-1 1s-1-.45-1-1V6H1c-.55 0-1-.45-1-1s.45-1 1-1h2V2c0-.55.45-1 1-1z',
    },
  ],
  circles: [],
};

export const AddAPhotoIcon = (props: IconProps) => renderIcon(props, iconType);
