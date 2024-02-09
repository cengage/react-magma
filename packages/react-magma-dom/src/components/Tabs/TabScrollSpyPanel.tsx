import React from 'react';

import { toCamelCase } from '../../utils';

export interface TabScrollSpyPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  /*
   * For use with icon tabs.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];

  /*
   * Label for each nav item, appears chronologically.
   */
  tabLabel?: string;
}

export const TabScrollSpyPanel = React.forwardRef<
  HTMLDivElement,
  TabScrollSpyPanelProps
>((props, ref) => {
  const { children, tabLabel } = props;

  const tabLabelCamelCase = toCamelCase(tabLabel);

  return (
    <section
      id={tabLabelCamelCase}
      data-nav-title={tabLabel}
      data-scrollspy
      ref={ref}
    >
      {children}
    </section>
  );
});
