import * as React from 'react';
import { IconButton, IconButtonProps } from '../IconButton';
import { Spinner, SpinnerProps } from '../Spinner';
import { SvgIconProps } from '../Icon/SvgIcon';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';

export type DownshiftComponents = {
  ClearIndicator?: React.FunctionComponent<IconButtonProps>;
  DropdownIndicator?: React.FunctionComponent<Partial<SvgIconProps>>;
  LoadingIndicator?: React.FunctionComponent<SpinnerProps>;
};

export const DefaultClearIndicator = props => {
  return <IconButton {...props} />;
};

export const DefaultDropdownIndicator = props => {
  return (
    <CaretDownIcon
      size={10}
      style={{ flexShrink: 0 }}
      testId="caretDown"
      {...props}
    />
  );
};

export const DefaultLoadingIndicator = props => {
  return <Spinner {...props} />;
};

export const defaultComponents = (props: DownshiftComponents) => ({
  ClearIndicator: DefaultClearIndicator,
  DropdownIndicator: DefaultDropdownIndicator,
  LoadingIndicator: DefaultLoadingIndicator,
  ...props
});
