import React from 'react';
import {
  StyledTooltip,
  ThemeContext,
  TooltipArrow,
  TooltipPosition,
} from 'react-magma-dom';
import styled from '@emotion/styled';

const StyledGraphTooltip = styled(StyledTooltip)`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid ${props => props.theme.colors.neutral06};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  margin: 0;
  padding: 8px;
  div {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TooltipColorSwatch = styled.span`
  background: ${props => props.color};
  border: ${props => (props.color ? 'none' : '3px solid black')};
  border-radius: 4px;
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;

export const GraphTooltip = props => {
  const { datum, index, x, y } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x} y={y} width="200" height="100">
        <StyledGraphTooltip
          position={TooltipPosition.top}
          role="tooltip"
          theme={theme}
        >
          <TooltipColorSwatch color={theme.charts.line.colors[index]} />
          <span>{datum.label}</span>
          <TooltipArrow theme={theme} />
        </StyledGraphTooltip>
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
        <StyledGraphTooltip
          data-testid="axis-tooltip"
          position={TooltipPosition.top}
          role="tooltip"
          theme={theme}
        >
          {activePoints.map((point, i) => (
            <div key={i}>
              <TooltipColorSwatch color={theme.charts.line.colors[i]} />
              <span>{point.label}</span>
            </div>
          ))}
          <TooltipArrow theme={theme} />
        </StyledGraphTooltip>
      </foreignObject>
    </g>
  );
};
