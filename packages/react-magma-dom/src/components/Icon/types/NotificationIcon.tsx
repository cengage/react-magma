import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M14,2.62A11.37,11.37,0,0,0,6,22,11.37,11.37,0,1,0,22,6,11.29,11.29,0,0,0,14,2.62ZM14,0h0A14,14,0,1,1,0,14,14,14,0,0,1,14,0ZM12.25,19.25h3.5v3.5h-3.5Zm0-14h3.5v10.5h-3.5Z"}]}
  
  export const NotificationIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);