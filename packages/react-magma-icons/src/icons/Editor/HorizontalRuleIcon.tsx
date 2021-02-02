import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d: 'M19 13H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const HorizontalRuleIcon = (props: IconProps) =>
  renderIcon(props, iconType);
