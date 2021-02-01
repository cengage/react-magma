import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M18 12.5c1.05 0 2.06.19 3 .52V19c0 1.1-.9 2-2 2h-7v-5.5c0-.47.22-.9.56-1.17 1.51-1.13 3.41-1.83 5.44-1.83zM12.24 3c-.47.9-.74 1.92-.74 3 0 1.8.73 3.42 1.91 4.59l-9.82 9.82C3.23 20.05 3 19.55 3 19V5c0-1.1.9-2 2-2zM18 1c2.7614 0 5 2.2386 5 5s-2.2386 5-5 5-5-2.2386-5-5 2.2386-5 5-5z',
    },
  ],
  circles: [],
};

export const StreetviewIcon = (props: IconProps) => renderIcon(props, iconType);
