import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M10 12v2c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3h2c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5zm5.96-5c1.48 0 2.46 1.5 1.85 2.83l-1.67 3.67H18c1.1 0 2 .9 2 2V20c0 .55-.45 1-1 1s-1-.45-1-1v-4h-4.98c-1.46 0-2.45-1.57-1.85-2.9L13 9h-2.21l-.3.71c-.2.47-.71.72-1.2.58-.57-.16-.89-.77-.68-1.33l.28-.76C9.22 7.47 9.95 7 10.76 7zM18 2.54c1.1046 0 2 .8954 2 2s-.8954 2-2 2-2-.8954-2-2 .8954-2 2-2z',
    },
  ],
  circles: [],
};

export const AccessibleForwardIcon = (props: IconProps) =>
  renderIcon(props, iconType);
