import React from 'react';

import { toCamelCase } from '../../utils';

export interface TabScrollSpyPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Disables a navigation Tab.
   */
  disabled?: boolean;
  /*
   * Adds an icon to the navigation Tab.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  /*
   * Label for navigation Tab.
   */
  tabLabel: string;
  /**
   * @internal
   */
  testId?: string;
}

export const TabScrollSpyPanel = React.forwardRef<
  HTMLDivElement,
  TabScrollSpyPanelProps
>((props, ref) => {
  const { children, tabLabel, testId, ...other } = props;

  const tabLabelCamelCase = toCamelCase(tabLabel);

  return (
    <section
      {...other}
      id={tabLabelCamelCase}
      data-nav-title={tabLabel}
      data-scrollspy
      data-testid={testId}
      ref={ref}
    >
      {children}
    </section>
  );
});
