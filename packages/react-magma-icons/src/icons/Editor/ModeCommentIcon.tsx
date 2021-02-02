import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d: 'M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ModeCommentIcon = (props: IconProps) =>
  renderIcon(props, iconType);
