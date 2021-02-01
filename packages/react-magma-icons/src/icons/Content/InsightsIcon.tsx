import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M21 8c1.1 0 2 .9 2 2 0 1.45-1.44 2.26-2.51 1.93l-3.56 3.55C17.27 16.56 16.45 18 15 18c-1.46 0-2.27-1.45-1.93-2.52l-2.55-2.55c-.3.09-.74.09-1.04 0l-4.55 4.56C5.26 18.56 4.45 20 3 20c-1.1 0-2-.9-2-2 0-1.45 1.44-2.26 2.51-1.93l4.56-4.55C7.73 10.44 8.55 9 10 9c1.46 0 2.27 1.45 1.93 2.52l2.55 2.55c.3-.09.74-.09 1.04 0l3.55-3.56C18.74 9.44 19.55 8 21 8zM3.5 6L4 8l2 .5L4 9l-.5 2L3 9l-2-.5L3 8l.5-2zM15 3l.94 2.07L18 6l-2.06.93L15 9l-.92-2.07L12 6l2.08-.93L15 3z',
    },
  ],
  circles: [],
};

export const InsightsIcon = (props: IconProps) => renderIcon(props, iconType);
