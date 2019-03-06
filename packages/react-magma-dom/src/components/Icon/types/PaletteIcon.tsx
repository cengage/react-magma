import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 26 26","paths":[{"d":"M14,1a13,13,0,0,0,0,26,2.17,2.17,0,0,0,1.6-3.63,2.16,2.16,0,0,1,1.62-3.59h2.56A7.22,7.22,0,0,0,27,12.56C27,6.17,21.18,1,14,1ZM6.06,14a2.17,2.17,0,1,1,2.16-2.17A2.17,2.17,0,0,1,6.06,14Zm4.33-5.78a2.17,2.17,0,1,1,2.17-2.16A2.17,2.17,0,0,1,10.39,8.22Zm7.22,0a2.17,2.17,0,1,1,2.17-2.16A2.17,2.17,0,0,1,17.61,8.22ZM21.94,14a2.17,2.17,0,1,1,2.17-2.17A2.17,2.17,0,0,1,21.94,14Z","transform":"translate(-1 -1)"}]}
  
  export const PaletteIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);