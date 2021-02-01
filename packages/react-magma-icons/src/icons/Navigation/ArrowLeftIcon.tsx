import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M16 10.5c0 .1354-.0494.2526-.1483.3518l-3.5 3.5c-.0988.0988-.216.1483-.3517.1483-.1356 0-.2529-.0495-.3517-.1484l-3.5-3.4999C8.0494 10.7529 8 10.6357 8 10.5001c0-.1357.0494-.253.1483-.3518.0989-.0989.2161-.1483.3518-.1483h6.9998c.1354 0 .2526.0494.3518.1483.0992.0989.1486.2161.1483.3518z',
      transform: 'rotate(90 12 12.25)',
    },
  ],
  circles: [],
};

export const ArrowLeftIcon = (props: IconProps) => renderIcon(props, iconType);
