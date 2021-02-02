import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M9 4c4.4183 0 8 3.5817 8 8s-3.5817 8-8 8-8-3.5817-8-8 3.5817-8 8-8zm8 1.55c0-.68.71-1.1 1.32-.82C21.08 5.99 23 8.77 23 12c0 3.23-1.92 6.01-4.68 7.26-.61.29-1.32-.14-1.32-.82v-.18c0-.37.23-.68.57-.84C19.6 16.46 21 14.39 21 12s-1.4-4.46-3.43-5.42c-.34-.16-.57-.48-.57-.85z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const FiberSmartRecordIcon = (props: IconProps) =>
  renderIcon(props, iconType);
