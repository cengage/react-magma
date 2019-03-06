import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 12.25 21","paths":[{"d":"M20.12,3.5v21h-3.5V14.88L7.88,23.62V4.38l8.74,8.74V3.5Z","transform":"translate(-7.88 -3.5)"}]}
  
  export const Next2Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);