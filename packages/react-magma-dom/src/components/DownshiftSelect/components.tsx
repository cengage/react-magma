import * as React from 'react';
import { IconButton, IconButtonProps } from '../IconButton';
import { Spinner, SpinnerProps } from '../Spinner';
import styled from '@emotion/styled';

const StyledIconButton = styled(IconButton)`
  border: 1px solid ${props => props.theme.colors.neutral03};
  border-left: 0;
  color: ${props => props.theme.colors.neutral01};
  margin: 0;
`;

export type DownshiftComponents = {
  ClearIndicator?: React.FunctionComponent<IconButtonProps>;
  DropdownIndicator?: React.FunctionComponent<IconButtonProps>;
  LoadingIndicator?: React.FunctionComponent<SpinnerProps>;
};

export const DefaultClearIndicator = props => {
  return <IconButton {...props} />;
};

export const DefaultDropdownIndicator = React.forwardRef(
  (props: IconButtonProps, ref: any) => {
    return <StyledIconButton ref={ref} {...props} />;
  }
);

export const DefaultLoadingIndicator = props => {
  return <Spinner {...props} />;
};

export const defaultComponents = (props: DownshiftComponents) => ({
  ClearIndicator: DefaultClearIndicator,
  DropdownIndicator: DefaultDropdownIndicator,
  LoadingIndicator: DefaultLoadingIndicator,
  ...props
});
