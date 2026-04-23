import * as React from 'react';

import styled from '@emotion/styled';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';

export interface FieldsetProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  /**
   * Action that fires when the as prop is set to 'div' or 'fieldset'
   * @default 'fieldset'
   */
  as?: 'fieldset' | 'div';
  /**
   * @children required
   */
  children: React.ReactNode;
  isInverse?: boolean;
  /**
   * Visible accessible label for the group.
   */
  legend: React.ReactNode;
  /**
   * ID for the legend element. If omitted, a stable ID is generated.
   */
  legendId?: string;
  /**
   * @internal
   */
  testId?: string;
  /**
   * When true, visually hides the legend but keeps it accessible to screen readers.
   * @default false
   */
  visuallyHiddenLegend?: boolean;
}

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
`;

const HiddenLegend = styled.legend`
  ${HiddenStyles};
`;

const StyledSpan = styled.span`
  display: block;
`;

const StyledLegend = styled.legend`
  padding: 0;
`;

const HiddenSpan = styled.span`
  ${HiddenStyles};
`;

export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (props, ref) => {
    const {
      as = 'fieldset',
      children,
      legend,
      legendId: legendIdProp,
      testId,
      visuallyHiddenLegend,
      ...rest
    } = props;

    const legendId = useGenerateId(legendIdProp);
    const theme = React.useContext(ThemeContext);

    useIsInverse(props.isInverse);

    if (as === 'div') {
      const LegendElement = visuallyHiddenLegend ? HiddenSpan : StyledSpan;

      return (
        <StyledFieldset
          {...rest}
          aria-labelledby={legendId}
          data-testid={testId}
          ref={ref}
          role="group"
          as="div"
          theme={theme}
        >
          <LegendElement id={legendId}>{legend}</LegendElement>
          {children}
        </StyledFieldset>
      );
    }

    const LegendElement = visuallyHiddenLegend ? HiddenLegend : StyledLegend;

    return (
      <StyledFieldset {...rest} data-testid={testId} ref={ref} theme={theme}>
        <LegendElement id={legendId}>{legend}</LegendElement>
        {children}
      </StyledFieldset>
    );
  }
);
