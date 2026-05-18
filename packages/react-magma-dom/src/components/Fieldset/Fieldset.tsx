import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { HiddenStyles } from '../../utils/UtilityStyles';

export interface FieldsetCommonProps {
  /**
   * Element to render for the fieldset container.
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

export interface FieldsetAsFieldsetProps
  extends FieldsetCommonProps,
    Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'children'> {
  as?: 'fieldset';
}

export interface FieldsetAsDivProps
  extends FieldsetCommonProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  as: 'div';
}

export type FieldsetProps = FieldsetAsFieldsetProps | FieldsetAsDivProps;

const baseStyles = css`
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
`;

const StyledFieldset = styled.fieldset`
  ${baseStyles};
`;

const StyledDiv = styled.div`
  ${baseStyles};
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

export const Fieldset = React.forwardRef<
  HTMLFieldSetElement | HTMLDivElement,
  FieldsetProps
>((props, ref) => {
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

  const isInverse = useIsInverse(props.isInverse);

  if (as === 'div') {
    const LegendElement = visuallyHiddenLegend ? HiddenSpan : StyledSpan;

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledDiv
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
          aria-labelledby={legendId}
          data-testid={testId}
          ref={ref as React.Ref<HTMLDivElement>}
          role="group"
          theme={theme}
        >
          <LegendElement id={legendId}>{legend}</LegendElement>
          {children}
        </StyledDiv>
      </InverseContext.Provider>
    );
  }

  const LegendElement = visuallyHiddenLegend ? HiddenLegend : StyledLegend;

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledFieldset
        {...(rest as React.FieldsetHTMLAttributes<HTMLFieldSetElement>)}
        data-testid={testId}
        ref={ref as React.Ref<HTMLFieldSetElement>}
        theme={theme}
      >
        <LegendElement id={legendId}>{legend}</LegendElement>
        {children}
      </StyledFieldset>
    </InverseContext.Provider>
  );
});
