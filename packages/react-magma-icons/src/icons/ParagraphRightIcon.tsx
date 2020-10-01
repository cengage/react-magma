import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 28 24.5',
  paths: [
    {
      d:
        'M0,1.75H28v3.5H0ZM10.5,7H28v3.5H10.5Zm0,10.5H28V21H10.5ZM0,12.25H28v3.5H0Zm0,10.5H28v3.5H0Z',
      transform: 'translate(0 -1.75)',
    },
  ],
};

export const ParagraphRightIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
