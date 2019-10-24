import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  bgColor?: string;
  height?: number;
  inverse?: boolean;
  labelVisible?: boolean;
  percentage?: number;
}

const Container = styled.div`
  align-items: center;
  display: flex;
`;

const Track = styled.div<ProgressBarProps>`
  background: ${props =>
    props.inverse ? 'rgba(0,0,0,0.25)' : props.theme.colors.neutral08};
  border: 1px solid
    ${props =>
      props.inverse ? props.theme.colors.neutral08 : props.theme.colors.a11y01};
  display: flex;
  height: ${props => props.height}px;
  padding: 1px;
  width: 100%;
`;

const Bar = styled.div<ProgressBarProps>`
  background: ${props => props.bgColor};
  display: flex;
  transition: width 0.3s;
  width: ${props => props.percentage}%;

  ${props =>
    props.animated &&
    css`
      background-image: linear-gradient(
        to right,
        ${props.bgColor} 0%,
        rgba(255, 255, 255, 0.5) 20%,
        ${props.bgColor} 40%,
        ${props.bgColor} 100%
      );
      background-repeat: no-repeat;
      background-size: 800px 104px;
      display: inline-block;
      position: relative;

      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeholderShimmer;
      animation-timing-function: linear;

      @keyframes placeholderShimmer {
        0% {
          background-position: -468px 0;
        }

        100% {
          background-position: 468px 0;
        }
      }
    `}
`;

const Percentage = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

export const ProgressBar: React.FunctionComponent<
  ProgressBarProps
> = React.forwardRef(
  (
    {
      animated,
      bgColor,
      height,
      inverse,
      labelVisible,
      percentage
    }: ProgressBarProps,
    ref: any
  ) => {
    const percentageValue = percentage ? percentage : 0;

    return (
      <ThemeContext.Consumer>
        {theme => (
          <Container>
            <Track
              height={height ? height : 15}
              inverse={inverse}
              ref={ref}
              theme={theme}
            >
              <Bar
                animated={animated}
                aria-valuenow={percentageValue}
                aria-valuemin={0}
                aria-valuemax={100}
                bgColor={
                  bgColor
                    ? bgColor
                    : inverse
                    ? theme.colors.foundation03
                    : theme.colors.primary
                }
                inverse={inverse}
                percentage={percentageValue}
                role="progressbar"
                theme={theme}
              />
            </Track>
            {labelVisible && <Percentage>{percentageValue}%</Percentage>}
          </Container>
        )}
      </ThemeContext.Consumer>
    );
  }
);
