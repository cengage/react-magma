import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M13.35 20l.57 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V3c0-.55.45-1 1-1s1 .45 1 1v1h8V3c0-.55.45-1 1-1s1 .45 1 1v1h1c1.1 0 2 .9 2 2v8.92l-2-.57V10H5v10h8.35zm7.65.59l-2.51-2.51 1.22-.52c.43-.19.39-.81-.06-.94l-4.78-1.37c-.38-.11-.73.24-.62.62l1.37 4.78c.13.45.75.49.94.06l.52-1.22L19.59 22c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zm-9-6.09c0-1.38-1.12-2.5-2.5-2.5S7 13.12 7 14.5 8.12 17 9.5 17s2.5-1.12 2.5-2.5z',
    },
  ],
  circles: [],
};

export const BookOnlineIcon = (props: IconProps) => renderIcon(props, iconType);
