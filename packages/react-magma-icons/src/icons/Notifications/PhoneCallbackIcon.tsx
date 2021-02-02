import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.0701-.87 2.0701-2v-1.73C21 16.23 20.24 15.38 19.23 15.26zM13 11h4c.55 0 1-.45 1-1s-.45-1-1-1h-1.59l4.31-4.31c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0L14 7.59V6c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const PhoneCallbackIcon = (props: IconProps) =>
  renderIcon(props, iconType);
