import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 24.11 21.34',
  paths: [
    { d: 'M1.56,3.33H25.67V6.9H1.56Z', transform: 'translate(-1.56 -3.33)' },
    { d: 'M1.56,12.26H17.64v3.57H1.56Z', transform: 'translate(-1.56 -3.33)' },
    { d: 'M1.56,21.1h8.93v3.57H1.56Z', transform: 'translate(-1.56 -3.33)' },
  ],
};

export const ListIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
