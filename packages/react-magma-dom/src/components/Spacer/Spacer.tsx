import * as React from 'react';
import styled from '../../theme/styled';
import { convertStyleValueToString } from '../../utils';

export interface SpacerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Determines whether the spacer takes up space horizontally, vertically or both.
   * @default SpacerAxis.both
   */
  axis?: SpacerAxis;
  /**
   * Height and/or width of the component. If a number is provided, will be set in pixels.
   */
  size: number | string;
  /**
   * @internal
   */
  testId?: string;
}

export enum SpacerAxis {
  horizontal = 'horizontal',
  vertical = 'vertical',
  both = 'both', // default
}

function getHeight(axis: SpacerAxis, size: number | string) {
  return axis === SpacerAxis.horizontal
    ? '1px'
    : convertStyleValueToString(size);
}
function getWidth(axis: SpacerAxis, size: number | string) {
  return axis === SpacerAxis.vertical ? '1px' : convertStyleValueToString(size);
}

const StyledSpacer = styled('span')<SpacerProps>`
  display: ${props =>
    props.axis === SpacerAxis.horizontal ? 'inline-block' : 'block'};
  height: ${props => getHeight(props.axis, props.size)};
  min-height: ${props => getHeight(props.axis, props.size)};
  min-width: ${props => getWidth(props.axis, props.size)};
  width: ${props => getWidth(props.axis, props.size)};
`;

export const Spacer = React.forwardRef<HTMLSpanElement, SpacerProps>(
  (props, ref) => {
    const { testId, axis = SpacerAxis.both, ...other } = props;

    return (
      <StyledSpacer {...other} axis={axis} data-testid={testId} ref={ref} />
    );
  }
);
