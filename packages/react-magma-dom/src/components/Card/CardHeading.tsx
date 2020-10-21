import * as React from 'react';
import styled from '../../theme/styled';
import { Heading } from '../Heading';
import { TypographyColor, TypographyVisualStyle } from '../Typography';

export interface CardHeadingProps
  extends React.LabelHTMLAttributes<HTMLHeadingElement> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  isInverse?: boolean;
  testId?: string;
}

const StyledCardHeading = styled(Heading)`
  font-weight: 400;
  margin-top: 0;
`;

export const CardHeading = React.forwardRef<
  HTMLHeadingElement,
  CardHeadingProps
>((props, ref) => {
  const { headingLevel, children, ...other } = props;

  return (
    <StyledCardHeading
      {...other}
      color={TypographyColor.default}
      level={headingLevel ? headingLevel : 4}
      visualStyle={TypographyVisualStyle.headingMedium}
      ref={ref}
      testId={props.testId}
    >
      {children}
    </StyledCardHeading>
  );
});
