import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d: 'M9.6564 2H6v20h12.7273v-3.6255H9.6564z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const WlLearnItIcon = (props: IconProps) => renderIcon(props, iconType);
