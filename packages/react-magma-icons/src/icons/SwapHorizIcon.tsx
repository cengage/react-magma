import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 32.9 25.58',
  paths: [
    {
      d:
        'M8.58,12l-7.3,7.31,7.3,7.31V21.12H21.39V17.46H8.58V12Zm25.6-3.66L26.89,1V6.5H14.08v3.65H26.89v5.49l7.29-7.31Z',
      transform: 'translate(-1.28 -1.01)'
    }
  ]
};

export const SwapHorizIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
