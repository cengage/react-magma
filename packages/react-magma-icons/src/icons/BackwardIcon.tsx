import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M14,28A14,14,0,1,0,0,14,14,14,0,0,0,14,28ZM14,2.62A11.38,11.38,0,1,1,2.62,14,11.39,11.39,0,0,1,14,2.62Zm5.25,15.76L13.12,14l6.13-4.38Zm-7,0L6.12,14l6.13-4.38Z',
    },
  ],
};

export const BackwardIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
