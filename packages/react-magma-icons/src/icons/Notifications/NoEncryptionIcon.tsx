import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M3.71 5.51c.39-.39 1.02-.39 1.41 0l15.36 15.37c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-.29-.29H6c-1.1 0-2-.9-2-2V10c0-.75.42-1.4 1.04-1.75L3.71 6.92a.9959.9959 0 010-1.41zM12 1c2.76 0 5 2.24 5 5v2h1c1.1 0 2 .9 2 2v7.56L10.44 8h4.66V6c0-1.71-1.39-3.1-3.1-3.1-1.71 0-3.1 1.39-3.1 3.1v.46L7.18 4.74C7.74 2.59 9.68 1 12 1z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const NoEncryptionIcon = (props: IconProps) =>
  renderIcon(props, iconType);
