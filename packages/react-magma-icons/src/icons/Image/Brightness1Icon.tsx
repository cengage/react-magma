import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [],
  circles: [
    {
      cx: '12',
      cy: '12',
      r: '10',
    },
  ],
};

export const Brightness1Icon = (props: IconProps) =>
  renderIcon(props, iconType);
