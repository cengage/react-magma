import * as React from 'react';
import styled from '@emotion/styled';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the component will render at a shorter height with less padding
   * @default false
   **/
  isCompact?: boolean;
  isInverse?: boolean;
  position?: AppBarPosition;
  testId?: string;
  /**
   * @internal
   */
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
      ? 'var(--appBar-inverse-backgroundColor)'
      : 'var(--appBar-backgroundColor)'};
  border-bottom: 1px solid
    ${props =>
      props.isInverse ? 'var(--colors-foundation)' : 'var(--colors-neutral06)'};
  box-shadow: ${props =>
    props.position === AppBarPosition.sticky ||
    props.position === AppBarPosition.fixed
      ? '0 2px 3px 0 rgb(0 0 0 / 37%)'
      : '0 0 0'};
  color: ${props =>
    props.isInverse
      ? 'var(--appBar-inverse-textColor)'
      : 'var(--appBar-textColor)'};
  display: flex;
  height: ${props =>
    props.isCompact ? 'var(--appBar-compact-height)' : 'var(--appBar-height)'};
  left: 0;
  padding: ${props =>
    props.isCompact
      ? 'var(--appBar-compact-padding)'
      : 'var(--appBar-padding)'};
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
        >
          {children}
        </StyledHeader>
      </InverseContext.Provider>
    );
  }
);
