import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M2.59 3.95c.35-.35.92-.35 1.27 0l16.19 16.2c.35.35.35.92 0 1.27s-.92.35-1.27 0L17.36 20H5c-1.1 0-2-.9-2-2V5.64l-.41-.42c-.35-.35-.35-.92 0-1.27zM19 4c1.1 0 2 .9 2 2v12c0 .15-.02.3-.05.45L19 16.5V6H8.5l-2-2zM5 7.64V18h10.36L5 7.64z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const BrowserNotSupportedIcon = (props: IconProps) =>
  renderIcon(props, iconType);
