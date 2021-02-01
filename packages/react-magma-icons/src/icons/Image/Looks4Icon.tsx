import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  paths: [
    {
      d:
        'M18.2784 3.36h-13.44c-1.056 0-1.92.864-1.92 1.92v13.44c0 1.056.864 1.92 1.92 1.92h13.44c1.056 0 1.92-.864 1.92-1.92V5.28c0-1.056-.864-1.92-1.92-1.92zm-4.8 13.44c-.528 0-.96-.432-.96-.96v-2.88h-2.88c-.528 0-.96-.432-.96-.96V8.16c0-.528.432-.96.96-.96s.96.432.96.96v2.88h1.92V8.16c0-.528.432-.96.96-.96s.96.432.96.96v7.68c0 .528-.432.96-.96.96z',
    },
  ],
  circles: [],
};

export const Looks4Icon = (props: IconProps) => renderIcon(props, iconType);
