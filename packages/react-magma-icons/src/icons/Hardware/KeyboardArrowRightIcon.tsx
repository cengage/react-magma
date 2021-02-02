import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M9.29 15.88L13.17 12 9.29 8.12a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const KeyboardArrowRightIcon = (props: IconProps) =>
  renderIcon(props, iconType);
