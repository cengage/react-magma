import * as React from 'react';

import styled from '@emotion/styled';
import { Heading, TypographyVisualStyle } from 'react-magma-dom';

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

const ActionsWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

export function ChartToolbar({
  children,
  headingLevel = 3,
  headingVisualStyle = TypographyVisualStyle.headingSmall,
  title,
}: ChartToolbarProps) {
  return (
    <ToolbarWrapper>
      <Heading level={headingLevel} noMargins visualStyle={headingVisualStyle}>
        {title}
      </Heading>
      <ActionsWrapper>{children}</ActionsWrapper>
    </ToolbarWrapper>
  );
}
