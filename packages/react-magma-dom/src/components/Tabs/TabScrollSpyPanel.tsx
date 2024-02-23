import React from 'react';

import { toCamelCase } from '../../utils';

export interface TabScrollSpyPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Sets a custom ID on the panel.
   */
  id?: string;
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
  const { children, id, tabLabel, testId, ...other } = props;

  const tabLabelCamelCase = toCamelCase(tabLabel);

  return (
    <section
      id={id ? id : tabLabelCamelCase}
      data-nav-title={tabLabel}
      data-scrollspy
      data-testid={testId}
      ref={ref}
      {...other}
    >
      {children}
    </section>
  );
});
