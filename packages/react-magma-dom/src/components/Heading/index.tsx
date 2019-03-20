import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { magma } from '../../theme/magma';
import { ThemeProvider } from 'emotion-theming';

export interface HeadingProps {
  children: React.ReactChild | React.ReactChild[];
  level: number;
  id?: string;
  style?: React.CSSProperties;
  theme?: any;
}

//const theme = magma;

export const baseHeadingStyles = css`
  font-weight: 500;
  line-height: 1.1;
  margin: 20px 0 10px;
`;

const StyledH1 = styled.h1`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 40px;
`;

const StyledH2 = styled.h2`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 32px;
`;

const StyledH3 = styled.h3`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 26px;
`;

const StyledH4 = styled.h4`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 23px;
`;

const StyledH5 = styled.h5`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 20px;
`;

const StyledH6 = styled.h6`
  ${baseHeadingStyles};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.headingFont};
  font-size: 18px;
`;

function renderHeading({ level, children, id, style, theme }: HeadingProps) {
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
    <ThemeProvider theme={theme ? theme : magma}>
      <HeadingComponent id={id} style={style}>
        {children}
      </HeadingComponent>
    </ThemeProvider>
  );
}

export const Heading: React.FunctionComponent<HeadingProps> = (
  props: HeadingProps
) => renderHeading(props);
