import * as React from 'react';

import styled from '@emotion/styled';

import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

export interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * If true, the component will render at a shorter height with less padding
   * @default false
   **/
  isCompact?: boolean;
  isInverse?: boolean;
  /**
   * Position of the AppBar
   * @default AppBarPosition.static
   **/
  position?: AppBarPosition;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

export enum AppBarPosition {
  absolute = 'absolute',
  fixed = 'fixed',
  relative = 'relative',
  static = 'static', // default
  sticky = 'sticky',
}

const StyledHeader = styled.header<{
  isCompact?: boolean;
  isInverse?: boolean;
  position: AppBarPosition;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? props.theme.appBar.inverse.backgroundColor
      : props.theme.appBar.backgroundColor};
  border-bottom: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.primary700
        : props.theme.colors.neutral300};
  box-shadow: ${props =>
    props.position === AppBarPosition.sticky ||
    props.position === AppBarPosition.fixed
      ? '0 2px 3px 0 rgb(0 0 0 / 37%)'
      : '0 0 0'};
  color: ${props =>
    props.isInverse
      ? props.theme.appBar.inverse.textColor
      : props.theme.appBar.textColor};
  display: flex;
  font-family: ${props => props.theme.bodyFont};
  height: ${props =>
    props.isCompact
      ? props.theme.appBar.compact.height
      : props.theme.appBar.height};
  left: 0;
  padding: ${props =>
    props.isCompact
      ? props.theme.appBar.compact.padding
      : props.theme.appBar.padding};
  position: ${props => props.position};
  right: 0;
  top: 0;
  z-index: 10;
`;

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  (props, ref) => {
    const {
      children,
      position = AppBarPosition.static,
      testId,
      ...other
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(props.isInverse);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledHeader
          {...other}
          data-testid={testId}
          position={position}
          ref={ref}
          theme={theme}
        >
          {children}
        </StyledHeader>
      </InverseContext.Provider>
    );
  }
);
