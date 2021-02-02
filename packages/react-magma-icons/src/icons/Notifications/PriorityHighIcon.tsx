import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 17c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2 .8954-2 2-2zm0-14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V5c0-1.1.9-2 2-2z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const PriorityHighIcon = (props: IconProps) =>
  renderIcon(props, iconType);
