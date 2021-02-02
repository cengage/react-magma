import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M6 15c0 .55.45 1 1 1s1-.45 1-1h8c0 .55.45 1 1 1s1-.45 1-1h4v3c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-3zm9-11c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v4h-4v-1c0-.55-.45-1-1-1s-1 .45-1 1v1H8v-1c0-.55-.45-1-1-1s-1 .45-1 1v1H2v-4c0-1.1.9-2 2-2h3V6c0-1.1.9-2 2-2zm0 2H9v2h6V6z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const HomeRepairServiceIcon = (props: IconProps) =>
  renderIcon(props, iconType);
