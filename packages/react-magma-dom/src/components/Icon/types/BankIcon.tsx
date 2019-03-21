import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 30 28',
  paths: [
    {
      d:
        'M15,0,30,6V8H28a.92.92,0,0,1-.32.7,1.09,1.09,0,0,1-.76.3H3.07a1.05,1.05,0,0,1-.75-.3A.89.89,0,0,1,2,8H0V6ZM4,10H8V22h2V10h4V22h2V10h4V22h2V10h4V22h.92a1.09,1.09,0,0,1,.76.3A.94.94,0,0,1,28,23v1H2V23a.9.9,0,0,1,.32-.7,1.05,1.05,0,0,1,.75-.3H4ZM28.92,25a1.09,1.09,0,0,1,.76.3A.94.94,0,0,1,30,26v2H0V26a.9.9,0,0,1,.32-.7,1.05,1.05,0,0,1,.75-.3Z',
      transform: 'translate(0)'
    }
  ]
};

export const BankIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
