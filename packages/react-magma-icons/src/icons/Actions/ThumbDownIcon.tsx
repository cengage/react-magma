import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M14.99 3c1.1 0 2 .9 2 2v9.99c0 .53-.21 1.04-.58 1.41l-5.53 5.54c-.58.59-1.52.59-2.11.01-.36-.36-.51-.87-.41-1.37L9.31 16H3.66c-2.15 0-3.6-2.2-2.75-4.18l3.26-7.61C4.48 3.48 5.2 3 6 3zM21 3c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V5c0-1.1.9-2 2-2z',
    },
  ],
  circles: [],
};

export const ThumbDownIcon = (props: IconProps) => renderIcon(props, iconType);
