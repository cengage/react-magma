import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M4 22h3.6364V5.6364H4V22zm12.7273 0h3.6363v-7.2727h-3.6363V22zm-9.091 0h9.091v-3.6364h-9.091V22zM4 5.6364h14.5455V2H4v3.6364zm9.091 9.0909h7.2726v-3.6364H13.091v3.6364z',
    },
  ],
  circles: [],
};

export const WlGotItIcon = (props: IconProps) => renderIcon(props, iconType);
