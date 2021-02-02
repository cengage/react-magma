import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 2C6.4286 2 2 6.4286 2 12s4.4286 10 10 10 10-4.4286 10-10S17.5714 2 12 2zm3.3288 10.19c0 1.2988-.3697 2.2935-1.109 2.9843-.7394.6908-1.807 1.0362-3.203 1.0362H8.7825v-7.89h2.4771c1.288 0 2.2882.34 3.0006 1.02.7124.68 1.0686 1.6297 1.0686 2.8494zm-1.7378.043c0-1.6945-.7483-2.5418-2.245-2.5418h-.8905v5.1377h.7178c1.6118 0 2.4177-.8652 2.4177-2.5958z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const DroppedIcon = (props: IconProps) => renderIcon(props, iconType);
