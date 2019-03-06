import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M10.5,1.75H28v3.5H10.5Zm0,10.5H28v3.5H10.5Zm0,10.5H28v3.5H10.5ZM0,3.5A3.5,3.5,0,1,1,3.5,7,3.5,3.5,0,0,1,0,3.5ZM0,14a3.5,3.5,0,1,1,3.5,3.5A3.5,3.5,0,0,1,0,14ZM0,24.5A3.5,3.5,0,1,1,3.5,28,3.5,3.5,0,0,1,0,24.5Z"}]}
  
  export const List2Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);