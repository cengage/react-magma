import * as React from 'react';
import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M11 4c.69 0 1.36.08 2 .23v2.06C12.37 6.1 11.7 6 11 6c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7c0-.34-.03-.67-.08-1h2.02c.04.33.06.66.06 1 0 5-4 9-9 9s-9-4-9-9 4-9 9-9zm-.25 4c.41 0 .75.34.75.75v4.55l3.35 2.01c.35.21.46.67.23 1.01-.21.32-.64.41-.97.21l-3.64-2.24c-.29-.18-.47-.5-.47-.85V8.75c0-.41.34-.75.75-.75zM19 2c.55 0 1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v2c0 .55-.45 1-1 1s-1-.45-1-1V7h-2c-.55 0-1-.45-1-1s.45-1 1-1h2V3c0-.55.45-1 1-1z',
    },
  ],
  circles: [],
};

export const MoreTimeIcon = (props: IconProps) => renderIcon(props, iconType);
