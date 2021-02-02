import { IconProps } from '../../IconProps';
import { renderIcon } from '../../SvgIcon';
const iconType = {
  viewBox: '0 0 24 24',
  paths: [
    {
      d:
        'M12 2C6.4286 2 2 6.4286 2 12s4.4286 10 10 10 10-4.4286 10-10S17.5714 2 12 2zm3.2558 14.2105h-2.1263L9.697 10.2417h-.0486c.0684 1.0542.1026 1.8061.1026 2.2558v3.713H8.256v-7.89h2.1102l3.427 5.9094h.0378c-.054-1.0254-.081-1.7504-.081-2.1749V8.3204h1.5057v7.8901z',
      fillRule: 'evenodd',
    },
  ],
  circles: [],
};

export const NonMindtapActivityIcon = (props: IconProps) =>
  renderIcon(props, iconType);
