import React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { StyledTooltip, ToolTipArrow, TooltipPosition } from '../Tooltip';
import styled from '@emotion/styled';

const TooltipColorSwatch = styled.span`
  border: ${props => (props.color ? 'none' : '3px solid black')};
  border-radius: 4px;
  display: inline-block;
  height: 14px;
  margin-right: 8px;
  width: 14px;
  background: ${props => props.color};
`;

export const GraphTooltip = props => {
  const { datum, index, x, y } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x} y={y} width="200" height="100">
        <StyledTooltip
          position={TooltipPosition.top}
          role="tooltip"
          theme={theme}
        >
          <TooltipColorSwatch color={theme.charts.line.colors[index]} />
          <span>{datum.label}</span>
          <ToolTipArrow theme={theme} />
        </StyledTooltip>
      </foreignObject>
    </g>
  );
};

export const AxisTooltip = props => {
  const { x, y, activePoints } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x} y={y} width="200" height="100">
        <StyledTooltip
          position={TooltipPosition.top}
          role="tooltip"
          theme={theme}
        >
          {activePoints.map((point, i) => (
            <div key={i} style={{ display: 'inline-block' }}>
              <TooltipColorSwatch color={theme.charts.line.colors[i]} />
              <span>{point.label}</span>
            </div>
          ))}
          <ToolTipArrow theme={theme} />
        </StyledTooltip>
      </foreignObject>
    </g>
  );
};
