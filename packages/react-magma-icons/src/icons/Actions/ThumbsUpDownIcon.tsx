import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M22 10c1.1 0 2 .9 1.99 2v5.79c0 .53-.21 1.03-.59 1.41l-4 4c-.43.44-1.14.44-1.58 0-.26-.27-.38-.65-.3-1.02l.66-3.18h-4.24c-1.44 0-2.4-1.47-1.84-2.79l2.14-5c.32-.73 1.04-1.21 1.84-1.21zM4.6.8C5.03.36 5.74.36 6.18.8c.26.27.38.65.3 1.02L5.82 5h4.24c1.43 0 2.4 1.47 1.84 2.79l-2.14 5C9.44 13.52 8.72 14 7.92 14H2c-1.1 0-2-.9-2-2V6.21c0-.53.21-1.04.6-1.41z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ThumbsUpDownIcon = (props: IconProps) =>
  renderIcon(props, iconType);
