import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 13c2.2091 0 4 1.7909 4 4 0 2.2091-1.7909 4-4 4-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4zm0-10c3.51 0 6.72 1.28 9.18 3.4.45.38.49 1.06.07 1.48l-3.6 3.6c-.35.36-.91.39-1.31.08-1.2-.93-2.7-1.49-4.34-1.49-1.63 0-3.14.56-4.34 1.5-.4.31-.96.28-1.32-.08l-3.6-3.6c-.42-.42-.38-1.1.06-1.48C5.28 4.29 8.49 3 12 3z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const CompassCalibrationIcon = (props: IconProps) =>
  renderIcon(props, iconType);
