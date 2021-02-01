import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M12 1c2.76 0 5 2.24 5 5v2h1c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h1V6c0-2.76 2.24-5 5-5zm0 10c-.55 0-1 .45-1 1v2H9c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2c0-.55-.45-1-1-1zm0-8.1c-1.71 0-3.1 1.39-3.1 3.1v2h6.2V6c0-1.71-1.39-3.1-3.1-3.1z',
    },
  ],
  circles: [],
};

export const EnhancedEncryptionIcon = (props: IconProps) =>
  renderIcon(props, iconType);
