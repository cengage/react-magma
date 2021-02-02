import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 11.97h-5l2.26-2.26c-.91-1.06-2.25-1.74-3.76-1.74-2.37 0-4.35 1.66-4.86 3.88l-.96-.32c.64-2.62 3-4.56 5.82-4.56 1.78 0 3.37.79 4.47 2.03L18 8.97v5z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const NextPlanIcon = (props: IconProps) => renderIcon(props, iconType);
