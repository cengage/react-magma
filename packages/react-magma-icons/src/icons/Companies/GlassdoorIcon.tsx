import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M16.4286 19.1429H5C5 20.7209 6.2792 22 7.8572 22h8.5714c1.5779 0 2.8571-1.2792 2.8571-2.8571V7.4103a.1041.1041 0 00-.1041-.1041h-2.649a.104.104 0 00-.104.104V19.143zm0-17.1429c1.5779 0 2.8571 1.2792 2.8571 2.8572H7.8572v11.7326a.1041.1041 0 01-.1041.1042H5.104A.1041.1041 0 015 16.5898V4.8572C5 3.2792 6.2792 2 7.8572 2h8.5714z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const GlassdoorIcon = (props: IconProps) => renderIcon(props, iconType);
