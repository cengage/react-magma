import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M11 5c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1 .45-1 1v10.22c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V13c0-.55.45-1 1-1s1 .45 1 1v6c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm3 10c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm0-3c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm0-3c.55 0 1 .45 1 1s-.45 1-1 1H8c-.55 0-1-.45-1-1s.45-1 1-1zm4.02-7c.54 0 .98.44.98.98V5h2.02c.54 0 .98.44.98.98v.04c0 .54-.44.98-.98.98H19v2.01c0 .54-.44.98-.98.98h-.03c-.55.01-.99-.44-.99-.98V7h-2.01c-.55 0-.99-.44-.99-.99v-.03c.01-.54.45-.98.99-.98H17V2.98c0-.54.44-.98.99-.98z',
      fillRule: 'evenodd',
      fill: '#000',
    },
  ],
  circles: [],
};

export const PostAddIcon = (props: IconProps) => renderIcon(props, iconType);
