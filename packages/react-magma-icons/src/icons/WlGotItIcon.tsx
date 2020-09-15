import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 21.27 26',
  paths: [
    {
      d:
        'M.82,27H5.55V5.73H.82Zm16.55,0H22.1V17.55H17.37ZM5.55,27H17.37V22.27H5.55ZM.82,5.73H19.73V1H.82ZM12.64,17.55H22.1V12.82H12.64Z',
      transform: 'translate(-0.82 -1)'
    }
  ]
};

export const WlGotItIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);
