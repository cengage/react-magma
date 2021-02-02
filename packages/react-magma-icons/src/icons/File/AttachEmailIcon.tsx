import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M17.5 11c1.38 0 2.5 1.12 2.5 2.5V17c0 .55-.45 1-1 1s-1-.45-1-1v-3.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V18c0 1.1.9 2 2 2s2-.9 2-2v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 2.21-1.79 4-4 4s-4-1.79-4-4v-4.5c0-1.38 1.12-2.5 2.5-2.5zM19 2c1.1 0 2 .9 2 2v6h-4c-1.66 0-3 1.34-3 3v5H3c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2zm0 3.53c0-.67-.73-1.07-1.3-.72L11 9 4.3 4.81c-.57-.35-1.3.05-1.3.72 0 .29.15.56.4.72l7.07 4.42c.32.2.74.2 1.06 0l7.07-4.42c.25-.16.4-.43.4-.72z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const AttachEmailIcon = (props: IconProps) =>
  renderIcon(props, iconType);
