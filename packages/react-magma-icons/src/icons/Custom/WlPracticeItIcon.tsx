import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M9.6364 11.091h5.4545V5.6363H9.6364v5.4545zM6 22h3.6364v-7.2727h9.0909V2H6v20z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const WlPracticeItIcon = (props: IconProps) =>
  renderIcon(props, iconType);
