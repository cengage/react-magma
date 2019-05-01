import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';

export interface LabelProps {
  children: React.ReactChild | React.ReactChild[];
  htmlFor?: string;
  inverse?: boolean;
  style?: React.CSSProperties;
  theme?: any;
  testId?: string;
}

const StyledLabel = styled.label<LabelProps>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  max-width: 100%;
`;

function renderLabel(props) {
  const { children, htmlFor, inverse, testId, style } = props;

  return (
    <ThemeContext.Consumer>
      {theme =>
        theme && (
          <StyledLabel
            data-testid={testId}
            style={style}
            htmlFor={htmlFor}
            inverse={inverse}
            theme={theme}
          >
            {children}
          </StyledLabel>
        )
      }
    </ThemeContext.Consumer>
  );
}

export const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) =>
  renderLabel(props);
