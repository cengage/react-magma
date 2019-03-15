import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 28 28","paths":[{"d":"M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm0,25.38A11.38,11.38,0,1,1,25.38,14,11.39,11.39,0,0,1,14,25.38Z"},{"d":"M18.38,7,14,11.38,9.62,7,7,9.62,11.38,14,7,18.38,9.62,21,14,16.62,18.38,21,21,18.38,16.62,14,21,9.62Z"}]}
  
  export const CancelCircleIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);