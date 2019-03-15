import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 21.46 21.46","paths":[{"d":"M21.5,3.27H6.5A3.28,3.28,0,0,0,3.27,6.51v15A3.27,3.27,0,0,0,6.5,24.73h15a3.27,3.27,0,0,0,3.23-3.24v-15A3.27,3.27,0,0,0,21.5,3.27Zm1.38,9.53H20.66v5.64H19.19V12.8h-2L18,18.44H15.86l-.65-5.09c-.09-.73-.18-1.2-.18-1.39a10.44,10.44,0,0,1-.38,1.39L13,18.44H10.86L9.19,13.35c-.28-.64-.47-1.2-.56-1.39,0,.19-.1.83-.1,1.48l-.64,5H6L7.34,8.63h2l2,6c.28.73.46,1.39.56,1.67a16,16,0,0,1,.56-1.67l2.12-6h2l.46,3H23v1.2h-.1Z","transform":"translate(-3.27 -3.27)"}]}
  
  export const MtIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);