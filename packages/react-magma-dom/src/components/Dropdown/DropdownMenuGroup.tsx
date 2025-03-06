import * as React from 'react';

import { DropdownHeader } from './DropdownHeader';
import { useGenerateId } from '../../utils';

/**
 * @children required
 */
export interface DropdownMenuGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header text to use for the menu group
   */
  header?: React.ReactNode;
}

export const DropdownMenuGroup: React.FunctionComponent<
  DropdownMenuGroupProps
> = (props: DropdownMenuGroupProps) => {
  const { children, id: defaultId, header, ...other } = props;

  const id = useGenerateId(defaultId);

  return (
    <div {...other} aria-labelledby={id} role="group">
      {header && <DropdownHeader id={id}>{header}</DropdownHeader>}
      {children}
    </div>
  );
};
