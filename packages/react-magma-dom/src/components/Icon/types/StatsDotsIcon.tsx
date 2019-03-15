import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M3.5,24.5H28V28H0V0H3.5Zm4.38-1.75a2.63,2.63,0,1,1,0-5.25H8.1l2.83-4.7a2.63,2.63,0,1,1,4.39,0l2.83,4.7h.4l4.66-8.16A2.62,2.62,0,1,1,28,7.87a2.62,2.62,0,0,1-2.62,2.63H25.2l-4.66,8.16A2.59,2.59,0,0,1,21,20.12a2.63,2.63,0,1,1-4.82-1.43L13.35,14H12.9l-2.83,4.7a2.62,2.62,0,0,1-2.19,4.06Z"}]}
  
  export const StatsDotsIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);