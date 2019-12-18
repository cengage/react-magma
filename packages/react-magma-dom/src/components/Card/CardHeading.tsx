import * as React from 'react';
import styled from '../../theme/styled';
import { Heading } from '../Heading';

export interface CardHeadingProps
  extends React.LabelHTMLAttributes<HTMLHeadingElement> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  inverse?: boolean;
  testId?: string;
}

const StyledCardHeading = styled(Heading)`
  font-size: 1.467em;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 20px;
`;

export const CardHeading: React.FunctionComponent<CardHeadingProps> = (
  props: CardHeadingProps
) => {
  const { inverse, headingLevel, children } = props;

  return (
    <StyledCardHeading
      level={headingLevel ? headingLevel : 4}
      inverse={inverse}
      testId={props.testId}
    >
      {children}
    </StyledCardHeading>
  );
};
