import * as React from 'react';
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
  font-weight: normal;
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  margin: 0;
  padding: 8px;
  width: fit-content;
  div {
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    &:last-of-type {
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
  const { datum, index, showTooltip, x, y } = props;

  const theme = React.useContext(ThemeContext);
  const linePointIndex = `${index}-${datum.index}`;

  return (
    showTooltip === linePointIndex && (
      <g style={{ pointerEvents: 'none' }}>
        <foreignObject x={x} y={y} width="275" height="100%">
          <StyledGraphTooltip
            position={TooltipPosition.top}
            role="tooltip"
            theme={theme}
          >
            <div>
              <TooltipColorSwatch color={theme.iterableColors[index]} />
              <span>{datum.label}</span>
            </div>
            <TooltipArrow theme={theme} />
          </StyledGraphTooltip>
        </foreignObject>
      </g>
    )
  );
};

export const AxisTooltip = props => {
  const { x, y, activePoints, hiddenData, dataLength } = props;

  const pointsIndexes = Array.from(
    Array(dataLength - 0),
    (_, i) => i + 0
  ).filter(i => !hiddenData.includes(i));

  const theme = React.useContext(ThemeContext);

  return (
    <g style={{ pointerEvents: 'none' }}>
      <foreignObject x={x} y={y} width="275" height="100%">
        <StyledGraphTooltip
          data-testid="axis-tooltip"
          position={TooltipPosition.top}
          role="tooltip"
          theme={theme}
        >
          {activePoints.map((point, i) => (
            <div key={i}>
              <TooltipColorSwatch
                color={theme.iterableColors[pointsIndexes[i]]}
              />
              <span>{point.label}</span>
            </div>
          ))}
          <TooltipArrow theme={theme} />
        </StyledGraphTooltip>
      </foreignObject>
    </g>
  );
};
