import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 2C6.4286 2 2 6.4286 2 12s4.4286 10 10 10 10-4.4286 10-10S17.5714 2 12 2zM9.8351 16.2105v-7.89h1.673v6.5084h3.2003v1.3816H9.8351z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const LatePenaltyIcon = (props: IconProps) =>
  renderIcon(props, iconType);
