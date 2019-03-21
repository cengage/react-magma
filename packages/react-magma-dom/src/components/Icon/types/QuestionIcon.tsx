import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 28 28',
  paths: [
    {
      d:
        'M12.25,19.25h3.5v3.5h-3.5ZM19.25,7A1.75,1.75,0,0,1,21,8.75V14l-5.25,3.5h-3.5V15.75l5.25-3.5V10.5H8.75V7ZM14,2.62A11.37,11.37,0,0,0,6,22,11.37,11.37,0,1,0,22,6,11.29,11.29,0,0,0,14,2.62ZM14,0h0A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z'
    }
  ]
};

export const QuestionIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
