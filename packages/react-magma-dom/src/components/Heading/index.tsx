import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  isInverse?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: any;
  testId?: string;
  tabIndex?: number;
}

export const baseHeadingStyles = props => css`
  border-bottom: 2px solid transparent;
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.foundation02};
  font-family: ${props.theme.headingFont};
  font-weight: 300;
  line-height: 1.2;
  margin: 20px 0 10px;

  &:focus {
    border-bottom: 2px dotted
      ${props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.focus};
    outline: 0;
    transition: border 0.1s linear;
  }
`;

const StyledH1 = styled.h1`
  ${baseHeadingStyles};
  font-size: 2.8em;
`;

const StyledH2 = styled.h2`
  ${baseHeadingStyles};
  font-size: 2.4em;
`;

const StyledH3 = styled.h3`
  ${baseHeadingStyles};
  font-size: 1.867em;
`;

const StyledH4 = styled.h4`
  ${baseHeadingStyles};
  font-size: 1.467em;
  font-weight: 400;
  line-height: 1.4;
`;

const StyledH5 = styled.h5`
  ${baseHeadingStyles};
  font-size: 1.067em;
  font-weight: 600;
  line-height: 1.4;
`;

const StyledH6 = styled.h6`
  ${baseHeadingStyles};
  font-size: 0.867em;
  font-weight: 700;
  line-height: 1.5;
`;

export const Heading: React.FunctionComponent<HeadingProps> = React.forwardRef(
  ({ level, testId, children, ...other }: HeadingProps, ref: any) => {
    const theme = React.useContext(ThemeContext);
    const headingLevels = {
      1: StyledH1,
      2: StyledH2,
      3: StyledH3,
      4: StyledH4,
      5: StyledH5,
      6: StyledH6
    };

    const HeadingComponent = headingLevels[level];

    return (
      <HeadingComponent
        {...other}
        css={baseHeadingStyles({ theme })}
        ref={ref}
        data-testid={testId}
        theme={theme}
      >
        {children}
      </HeadingComponent>
    );
  }
);
