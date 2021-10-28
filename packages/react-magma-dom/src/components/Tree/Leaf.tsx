import * as React from 'react';
import { AngleDownIcon, AngleUpIcon } from 'react-magma-icons';

export interface LeafProps {
  key: string;
  label: string;
  isOpen?: boolean;
  isActive?: boolean;
}

export const Leaf = React.forwardRef<HTMLDivElement, LeafProps>(
  (props, ref) => {
    const { children, label } = props;
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    return (
      <div ref={ref}>
        {children ? isOpen ? <AngleUpIcon /> : <AngleDownIcon /> : null}
        {label}
      </div>
    );
  }
);
