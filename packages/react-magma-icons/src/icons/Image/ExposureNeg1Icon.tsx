import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M4 12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1zm15 6h-2V7.38L14 8.4V6.7L18.7 5h.3v13z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const ExposureNeg1Icon = (props: IconProps) =>
  renderIcon(props, iconType);
