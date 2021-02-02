import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M1.4 2.81c.39-.39 1.02-.39 1.41 0L21.19 21.2c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-1.91-1.91c-.29.76-1.01 1.3-1.87 1.3H8c-1.1 0-2-.9-2-2v-3.16c0-.53.21-1.04.58-1.42l3-3.01-8.19-8.19a.987.987 0 01.01-1.41zm9.44 10.85L8 16.5V19c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-.17l-5.16-5.17zM16 2c1.1 0 2 .89 2 2v3.18c0 .53-.21 1.04-.59 1.42l-3 2.99-1.25-1.25L16 7.5V5c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v.17L6.13 3.3C6.42 2.54 7.14 2 8 2z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const HourglassDisabledIcon = (props: IconProps) =>
  renderIcon(props, iconType);
