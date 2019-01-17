import * as React from 'react';
import { styled, css } from '../../theme/styled-components';
import { magma } from '../../theme/magma';

export interface HeadingProps {
  children: React.ReactChild | React.ReactChild[];
  level: number;
  id?: string;
  style?: React.CSSProperties;
}

export const baseHeadingStyles = css`
  color: ${magma.primary02};
  font-family: ${magma.headingFont};
  font-weight: 500;
  line-height: 1.1;
  margin: 20px 0 10px;
`;

const StyledH1 = styled.h1`
  ${baseHeadingStyles};
  font-size: 40px;
`;

const StyledH2 = styled.h2`
  ${baseHeadingStyles};
  font-size: 32px;
`;

const StyledH3 = styled.h3`
  ${baseHeadingStyles};
  font-size: 26px;
`;

const StyledH4 = styled.h4`
  ${baseHeadingStyles};
  font-size: 23px;
`;

const StyledH5 = styled.h5`
  ${baseHeadingStyles};
  font-size: 20px;
`;

const StyledH6 = styled.h6`
  ${baseHeadingStyles};
  font-size: 18px;
`;

function renderHeading({ level, children, id, style }: HeadingProps) {
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
    <HeadingComponent id={id} style={style}>
      {children}
    </HeadingComponent>
  );
}

export const Heading: React.FunctionComponent<HeadingProps> = (
  props: HeadingProps
) => renderHeading(props);
