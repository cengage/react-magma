import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 5.04 25.23","paths":[{"d":"M7.23,21.91h5v4.7h-5ZM7.41,1.39h4.71v7.5L10.88,20.15H8.66L7.41,8.89Z","transform":"translate(-7.23 -1.39)"}]}
  
  export const AlertIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);