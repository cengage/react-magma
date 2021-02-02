import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [],
  circles: [
    {
      cx: '12',
      cy: '12',
      r: '8',
    },
  ],
};

export const FiberManualRecordIcon = (props: IconProps) =>
  renderIcon(props, iconType);
