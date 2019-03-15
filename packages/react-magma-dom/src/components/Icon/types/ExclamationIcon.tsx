import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 6.94 22","paths":[{"d":"M8,20.5V24a.94.94,0,0,1-.29.7A1,1,0,0,1,7,25H3a1,1,0,0,1-.7-.3A1,1,0,0,1,2,24V20.5a1,1,0,0,1,.3-.7,1,1,0,0,1,.7-.3H7a1,1,0,0,1,.71.3A.94.94,0,0,1,8,20.5ZM8.47,4,8,16a1,1,0,0,1-.32.7A1,1,0,0,1,7,17H3a1,1,0,0,1-.71-.3A1,1,0,0,1,2,16L1.53,4a.92.92,0,0,1,.28-.7A.92.92,0,0,1,2.5,3h5a.94.94,0,0,1,.7.3.91.91,0,0,1,.27.7Z","transform":"translate(-1.53 -3)"}]}
  
  export const ExclamationIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);