import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M0,0H7V7H0ZM10.5,1.75H28v3.5H10.5ZM0,10.5H7v7H0Zm10.5,1.75H28v3.5H10.5ZM0,21H7v7H0Zm10.5,1.75H28v3.5H10.5Z"}]}
  
  export const List3Icon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);