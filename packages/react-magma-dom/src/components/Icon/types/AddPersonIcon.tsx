import * as React from 'react';
  import { IconProps, renderIcon } from '../utils';

  const iconType = {"viewBox":"0 0 35.21 28.01","paths":[{"d":"M36.29,4.74A.37.37,0,0,1,36.4,5h0v2.3a.4.4,0,0,1-.38.39H31.75V12a.4.4,0,0,1-.38.39h-2.3a.4.4,0,0,1-.38-.39V7.72H24.44a.39.39,0,0,1-.38-.38V4.94a.39.39,0,0,1,.38-.38h4.25V.37h0a.33.33,0,0,1,.1-.25A.38.38,0,0,1,29.06,0H31.4a.4.4,0,0,1,.27.12.38.38,0,0,1,.08.23V4.62H36a.45.45,0,0,1,.28.12Z","transform":"translate(-1.19 0.01)"},{"d":"M13.24,16a6,6,0,1,0-6-6A6,6,0,0,0,13.24,16Zm0,3c-4,0-12,2-12,6v3H25.27V25c0-4-8-6-12-6Z","transform":"translate(-1.19 0.01)"}]}
  
  export const AddPersonIcon: React.FunctionComponent<IconProps> = (props: IconProps) =>
    renderIcon(props, iconType);