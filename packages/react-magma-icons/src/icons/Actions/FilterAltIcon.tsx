import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 23 24',
  paths: [
    {
      d:
        'M4.1953 6.4862C6.337 9.2369 9.503 13.3077 9.503 13.3077v4.6154c0 1.0154.8308 1.8461 1.8462 1.8461s1.8461-.8307 1.8461-1.8461v-4.6154s3.1662-4.0708 5.3077-6.8215C18.9738 5.8769 18.54 5 17.7646 5h-12.84c-.7662 0-1.2.877-.7293 1.4862z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const FilterAltIcon = (props: IconProps) => renderIcon(props, iconType);
