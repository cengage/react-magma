import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M10.5 3c4.1421 0 7.5 3.3579 7.5 7.5 0 1.7106-.5727 3.2875-1.5368 4.5493l3.9008 3.9004c.3905.3906.3905 1.0237 0 1.4143-.3906.3905-1.0237.3905-1.4143 0l-3.9004-3.9008C13.7875 17.4273 12.2106 18 10.5 18 6.3579 18 3 14.6421 3 10.5S6.3579 3 10.5 3zm0 2C7.4624 5 5 7.4624 5 10.5S7.4624 16 10.5 16s5.5-2.4624 5.5-5.5S13.5376 5 10.5 5zm2.8 4.75c.392 0 .7.308.7.7 0 .392-.308.7-.7.7H7.7c-.392 0-.7-.308-.7-.7 0-.392.308-.7.7-.7h5.6z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const ZoomOutIcon = (props: IconProps) => renderIcon(props, iconType);
