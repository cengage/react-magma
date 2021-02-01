import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d: 'M17.5556 17.5556H6.4444V2H2v20h20V2h-4.4444z',
    },
  ],
  circles: [],
};

export const WlUseItIcon = (props: IconProps) => renderIcon(props, iconType);
