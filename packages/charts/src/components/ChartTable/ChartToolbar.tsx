import * as React from 'react';

import styled from '@emotion/styled';
import { Heading, ThemeContext, TypographyVisualStyle } from 'react-magma-dom';

export interface ChartToolbarProps {
  /** Toolbar action buttons (ChartTableButton, ChartFullscreenButton, ChartMoreOptionsButton, etc.) */
  children: React.ReactNode;
  /**
   * Heading level for the chart title.
   * @default 3
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Visual style for the heading.
   * @default TypographyVisualStyle.headingSmall
   */
  headingVisualStyle?: TypographyVisualStyle;
  /** Chart title text */
  title: string;
}

const ToolbarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ActionsWrapper = styled.div<{ theme: any }>`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing02};
`;

export function ChartToolbar({
  children,
  headingLevel = 3,
  headingVisualStyle = TypographyVisualStyle.headingSmall,
  title,
}: ChartToolbarProps) {
  const theme = React.useContext(ThemeContext);
  return (
    <ToolbarWrapper>
      <Heading level={headingLevel} noMargins visualStyle={headingVisualStyle}>
        {title}
      </Heading>
      <ActionsWrapper theme={theme}>{children}</ActionsWrapper>
    </ToolbarWrapper>
  );
}
