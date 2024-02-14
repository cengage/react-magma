import React from 'react';

import { toCamelCase } from '../../utils';

export interface TabScrollSpyPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /*
   * Sets a custom ID on the panel.
   */
  customId?: string;
  /*
   * Disables a navigation Tab.
   */
  disabled?: boolean;
  /*
   * Adds an icon to the navigation Tab.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];

  /*
   * Label for navigation Tab, appears chronologically.
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
  const { children, customId, tabLabel, testId } = props;

  const tabLabelCamelCase = toCamelCase(tabLabel);

  return (
    <section
      id={customId ? customId : tabLabelCamelCase}
      data-nav-title={tabLabel}
      data-scrollspy
      data-testid={testId}
      ref={ref}
    >
      {children}
    </section>
  );
});
