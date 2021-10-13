import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface DropdownHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const StyledDiv = styled.div`
  color: var(--colors-neutral03);
  font-size: var(--typeScale-size01-fontSize);
  line-height: var(--typeScale-size01-lineHeight);
  font-weight: bold;
  margin: 0;
  padding: var(--spaceScale.spacing03) var(--spaceScale.spacing05)
    var(--spaceScale.spacing02);
  text-transform: uppercase;
`;

export const DropdownHeader = React.forwardRef<
  HTMLDivElement,
  DropdownHeaderProps
>((props, ref) => {
  const { children, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <StyledDiv {...other} data-testid={testId} theme={theme}>
      {children}
    </StyledDiv>
  );
});
