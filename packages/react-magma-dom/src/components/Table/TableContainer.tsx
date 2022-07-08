import * as React from 'react';
import styled from '../../theme/styled';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { transparentize } from 'polished';

/**
 * @children required
 */
export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  minWidth?: number;
  hasOuterBorder?: boolean;
  hasSquareCorners?: boolean;
  isInverse?: boolean;
  testId?: string;
}

export const StyledTableContainer = styled.div<TableContainerProps>`
  background: ${props =>
    props.isInverse ? props.theme.colors.primary600 : 'inherit'};
  border-radius: ${props =>
    props.hasSquareCorners ? 0 : props.theme.borderRadius};
  box-shadow: ${props =>
    props.hasOuterBorder
      ? `0 0 0 1px ${
          props.isInverse
            ? transparentize(0.6, props.theme.colors.neutral100)
            : props.theme.colors.neutral300
        }`
      : 0};
  color: ${props =>
    props.isInverse ? props.theme.colors.neutral100 : 'inherit'};
  overflow: hidden;
  padding: 0;
`;

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>((props, ref) => {
  const { children, hasOuterBorder, hasSquareCorners, minWidth, testId } =
    props;

  const theme = React.useContext(ThemeContext);

  const isInverse = useIsInverse(props.isInverse);

  return (
    <StyledTableContainer
      data-testid={testId}
      hasOuterBorder={hasOuterBorder}
      hasSquareCorners={hasSquareCorners}
      isInverse={isInverse}
      minWidth={minWidth}
      ref={ref}
      theme={theme}
    >
      {children}
    </StyledTableContainer>
  );
});
