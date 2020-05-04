import * as React from 'react';

import { IconButton, ButtonIconPosition } from '../IconButton';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { CaretUpIcon } from '../Icon/types/CaretUpIcon';
import { DropdownContext, DropdownDropDirection } from '.';
import { IconProps } from '../Icon/utils';
import { Omit, XOR } from '../../utils';
import { ButtonProps } from '../Button';

export interface IconOnlyDropdownButtonProps
  extends Omit<ButtonProps, 'children'> {
  icon?: React.ReactElement<IconProps>;
  'aria-label': string;
}

export interface IconTextDropdownButtonProps extends ButtonProps {
  icon?: React.ReactElement<IconProps>;
  children: React.ReactChild | React.ReactChild[];
}

export type DropdownButtonProps = XOR<
  IconOnlyDropdownButtonProps,
  IconTextDropdownButtonProps
>;

function instanceOfIconOnlyDropdownButton(
  object: any
): object is IconOnlyDropdownButtonProps {
  return 'icon' in object && !('children' in object);
}

export const DropdownButton: React.FunctionComponent<DropdownButtonProps> = (
  props: DropdownButtonProps
) => {
  const context = React.useContext(DropdownContext);

  const buttonIcon =
    context.dropDirection === DropdownDropDirection.up ? (
      <CaretUpIcon size={10} testId="caretUp" />
    ) : (
      <CaretDownIcon size={10} testId="caretDown" />
    );

  let children;
  const { icon = buttonIcon, ...other } = props;

  if (!instanceOfIconOnlyDropdownButton(props)) {
    children = props.children;
  }

  function handleClick() {
    if (context.isOpen) {
      context.closeDropdown();
    } else {
      context.openDropdown();
    }
  }

  return (
    <IconButton
      {...other}
      aria-expanded={context.isOpen}
      aria-haspopup="true"
      icon={icon}
      iconPosition={ButtonIconPosition.right}
      onClick={handleClick}
      ref={context.toggleRef}
    >
      {children}
    </IconButton>
  );
};
