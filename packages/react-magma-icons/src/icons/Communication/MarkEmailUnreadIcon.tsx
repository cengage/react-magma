import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19 10c1.13 0 2.16-.39 3-1.02V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10.1c-.06.32-.1.66-.1 1 0 1.48.65 2.79 1.67 3.71L12 11 5.3 6.81c-.57-.35-1.3.05-1.3.72 0 .29.15.56.4.72l7.07 4.42c.32.2.74.2 1.06 0l4.77-2.98c.54.19 1.1.31 1.7.31zm-3-5c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const MarkEmailUnreadIcon = (props: IconProps) =>
  renderIcon(props, iconType);
