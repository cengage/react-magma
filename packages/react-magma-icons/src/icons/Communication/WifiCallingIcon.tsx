import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M6.73 3.03c1.02 0 1.87.76 1.99 1.77l.29 2.52c.07.6-.14 1.21-.57 1.64l-1.85 1.85c1.44 2.84 3.76 5.15 6.59 6.59l1.84-1.84c.43-.43 1.03-.64 1.64-.57l2.54.29c1.01.12 1.77.97 1.77 1.99V19c0 1.13-.94 2.07-2.07 2C10.36 20.47 3.53 13.64 3 5.1c-.07-1.13.87-2.07 2-2.07zM16.5 3c3.17 0 5.29 1.78 5.5 1.95L16.5 12 11 4.95C11.21 4.78 13.32 3 16.5 3z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const WifiCallingIcon = (props: IconProps) =>
  renderIcon(props, iconType);
