import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M14.12 2c.56 0 1.1.24 1.47.65L16.83 4H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h3.17L8.4 2.65c.38-.41.92-.65 1.48-.65zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.6569 0 3 1.3431 3 3s-1.3431 3-3 3-3-1.3431-3-3 1.3431-3 3-3z',
    },
  ],
  circles: [],
};

export const PhotoCameraIcon = (props: IconProps) =>
  renderIcon(props, iconType);
