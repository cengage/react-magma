import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12.98 4.02c4.42-.29 8.57 2.79 8.98 7.2C22.41 15.99 18.67 20 14 20H4c-1.1 0-2-.9-2-2l.001-.872c.0048-.2363.034-1.0363.209-2.128h8.17c1.99 0 3.61-1.62 3.61-3.61 0-1.45-.87-2.75-2.2-3.32L7.05 6.06c1.49-1.1 3.42-1.88 5.93-2.04zM5.44 7.55l5.58 2.36c.59.25.98.83.98 1.48 0 .89-.72 1.61-1.61 1.61H2.64c.48-1.75 1.32-3.77 2.8-5.45z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const SportsMotorsportsIcon = (props: IconProps) =>
  renderIcon(props, iconType);
