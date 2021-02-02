import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19 4c1.11 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V6c0-1.1.89-2 2-2zm0 4H5v9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V8zm-4.53 2.17c.39-.39 1.02-.39 1.41 0l.083.0962c.3047.3993.277.9638-.083 1.3238l-4.24 4.24c-.39.39-1.02.39-1.41 0L8.1 13.7c-.39-.39-.4-1.02 0-1.41.4-.39 1.03-.39 1.42 0l1.41 1.41z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const DomainVerificationIcon = (props: IconProps) =>
  renderIcon(props, iconType);
