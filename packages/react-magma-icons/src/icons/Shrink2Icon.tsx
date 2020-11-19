import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M12.25,15.75V27.12L7.88,22.75,2.62,28,0,25.38l5.25-5.26L.88,15.75ZM28,2.62,22.75,7.88l4.37,4.37H15.75V.88l4.37,4.37L25.38,0Z',
    },
  ],
};

export const Shrink2Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
