import * as React from 'react';
import { useGenerateId } from '../../utils';
import { DropdownHeader } from './DropdownHeader';

export interface DropdownMenuGroupInterface
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header text to use for the menu group
   */
  header?: React.ReactNode;
}

export const DropdownMenuGroup: React.FunctionComponent<DropdownMenuGroupInterface> = (
  props: DropdownMenuGroupInterface
) => {
  const { children, id: defaultId, header } = props;

  const id = useGenerateId(defaultId);

  return (
    <div aria-labelledby={id} role="group">
      {header && <DropdownHeader id={id}>{header}</DropdownHeader>}
      {children}
    </div>
  );
};
