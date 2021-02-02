import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M16 12c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-2c-1.1 0-2-.9-2-2h-1c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h1c0-1.1.9-2 2-2zm4 5c.55 0 1 .45 1 1s-.45 1-1 1h-2v-2zM8.5 4C10.43 4 12 5.57 12 7.5S10.43 11 8.5 11H7c-1.1 0-2 .9-2 2s.9 2 2 2h2v2H7c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.5c.83 0 1.5-.67 1.5-1.5S9.33 6 8.5 6H5c-.55 0-1-.45-1-1s.45-1 1-1zM20 13c.55 0 1 .45 1 1s-.45 1-1 1h-2v-2z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const ElectricalServicesIcon = (props: IconProps) =>
  renderIcon(props, iconType);
