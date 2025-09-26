import React from 'react';

import { TabProps, Tab } from './Tab';

/**
 * CustomTab allows full customization of the tab content while preserving tab behavior.
 * You can pass any children (e.g., a Button) and all tab context/props will be handled.
 */
export const CustomTab = React.forwardRef<HTMLButtonElement, TabProps>(
  (props, ref) => {
    return (
      <Tab {...props} ref={ref} unstyled>
        {props.children}
      </Tab>
    );
  }
);

CustomTab.displayName = 'CustomTab';
