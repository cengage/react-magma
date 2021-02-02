import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M20 7H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2zm0 2.5H4c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2zm0 7.5H4c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const TableRowsIcon = (props: IconProps) => renderIcon(props, iconType);
