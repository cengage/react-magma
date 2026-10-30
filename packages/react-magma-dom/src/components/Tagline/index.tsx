import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TaglineProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * @internal
   */
  css?: any; // Adding css prop to fix emotion error
  /**
   * Uses the inverse text color for dark backgrounds
   * @default false
   */
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

interface StyledTaglineProps extends TaglineProps {
  theme: ThemeInterface;
}

const StyledTagline = styled.p<StyledTaglineProps>`
  border-left: 3px solid ${props => props.theme.colors.brand.sunriseOrange};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral200
      : props.theme.colors.neutral800};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.42px;
  line-height: 18px;
  margin: 0;
  padding-left: ${props => props.theme.spaceScale.spacing04};
  text-transform: uppercase;
`;

export const Tagline = React.forwardRef<HTMLParagraphElement, TaglineProps>(
  (props, ref) => {
    const { children, isInverse: isInverseProp, testId, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledTagline
        {...other}
        data-testid={testId}
        isInverse={useIsInverse(isInverseProp)}
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledTagline>
    );
  }
);
