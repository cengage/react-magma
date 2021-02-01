import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M16.67 13.13c2.76.4 6.33 1.69 6.33 3.87v2c0 .55-.45 1-1 1h-3v-3c0-1.68-.96-2.94-2.33-3.87zM9 13c2.67 0 8 1.34 8 4v2c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1v-2c0-2.66 5.33-4 8-4zm0-9c2.2091 0 4 1.7909 4 4 0 2.2091-1.7909 4-4 4-2.2091 0-4-1.7909-4-4 0-2.2091 1.7909-4 4-4zm6 0c2.21 0 4 1.79 4 4s-1.79 4-4 4c-.47 0-.91-.1-1.33-.24C14.5 10.73 15 9.42 15 8s-.5-2.73-1.33-3.76C14.09 4.1 14.53 4 15 4z',
    },
  ],
  circles: [],
};

export const PeopleAltIcon = (props: IconProps) => renderIcon(props, iconType);
