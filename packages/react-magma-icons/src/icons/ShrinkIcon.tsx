import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    { d: 'M15.75,12.25H27.12L22.75,7.88,28,2.62,25.38,0,20.12,5.25,15.75.88Z' },
    {
      d: 'M15.75,15.75V27.12l4.37-4.37L25.38,28,28,25.38l-5.25-5.26,4.37-4.37Z'
    },
    { d: 'M12.25,15.75H.88l4.37,4.37L0,25.38,2.62,28l5.26-5.25,4.37,4.37Z' },
    { d: 'M12.25,12.25V.88L7.88,5.25,2.62,0,0,2.62,5.25,7.88.88,12.25Z' }
  ]
};

export const ShrinkIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
