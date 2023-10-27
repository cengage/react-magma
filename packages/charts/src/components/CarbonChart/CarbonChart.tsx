import * as React from 'react';

import {
  ThemeInterface,
  ThemeContext,
  useIsInverse,
  styled,
} from 'react-magma-dom';

import {
  SimpleBarChart,
  LollipopChart,
  GroupedBarChart,
} from '@carbon/charts-react';
import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';

export enum CarbonChartType {
  bar = 'bar',
  lollipop = 'lollipop',
  grouped = 'grouped',
}

export interface CarbonChartProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  type: CarbonChartType;
  dataSet: Array<Object>;
  options: Object;
}

const CarbonChartWrapper = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`

  .cds--cc--tooltip .content-box .datapoint-tooltip p{
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    padding: ${props => props.theme.spaceScale.spacing02};
  }

  .cds--modal-container{
    border-radius:${props => props.theme.borderRadius};
  }

  p, div, text, .cds--cc--axes g.axis .axis-title,
  .cds--cc--title p.title,
  .cds--cc--axes g.axis g.tick text {
    font-family: ${props => props.theme.bodyFont} !important;
  }

  .cds--cc--axes {
    overflow: visible;
  }

  div.cds--cc--legend div.legend-item p {
    font-size:  ${props => props.theme.typeScale.size03.fontSize};
    margin: 0  ${props => props.theme.spaceScale.spacing03} 0 0;
  }

  .cds--cc--grid rect.chart-grid-backdrop{
    fill:none;
  }

  .cds--btn {
    min-height: auto;
    display: flex;
    flex: 0 auto;
    align-items: center;
    text-align: center;
    padding: 20px;
    margin: 0;
    line-height:  ${props => props.theme.typeScale.size03.lineHeight};
    margin: 0;
    min-width:  ${props => props.theme.spaceScale.spacing13};
    overflow: hidden;
    padding: ;
    position: relative;
    right: ${props => props.theme.spaceScale.spacing04};
    text-align: center;
    height: 40px;
    font-family: ${props => props.theme.bodyFont};
    font-size: ${props => props.theme.typeScale.size03.fontSize};
    border-radius: ${props => props.theme.borderRadius};
    font-weight: 500;
  }

  .cds--btn--primary {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.primary}
  }

  :focus {
    outline: 2px solid ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
    outline-offset: 0;
  }

  .cds--btn--primary {
    &:focus {
        outline: 2px solid ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
        }
        outline-offset: 0;
        border: none;
        box-shadow: none;
    }
  }

  .cds--modal-close {
    &:focus {
      outline: 2px solid ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      }
      outline-offset: 0;
      border: none;
    }
  }

.cds--modal-footer.cds--modal-footer {
    display: flex;
    align-items: center;
}
`;

// Carbon themes (https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/interfaces/enums.ts#L12)
enum ChartTheme {
  WHITE = 'white',
  G100 = 'g100',
  G90 = 'g90',
  G10 = 'g10',
}

interface ColorsObject {
  [key: string]: string;
}

export const CarbonChart = React.forwardRef<HTMLDivElement, CarbonChartProps>(
  (props, ref) => {
    const {
      children,
      testId,
      isInverse: isInverseProp,
      type,
      dataSet,
      options,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const allCharts = {
      bar: SimpleBarChart,
      lollipop: LollipopChart,
      grouped: GroupedBarChart,
    };

    function buildColors() {
      let scaleColorsObj: ColorsObject = {};

      const allGroups = dataSet.map(item => {
        return 'group' in item ? item['group'] : null;
      });
      const uniqueGroups = allGroups.filter(
        (g, index) => allGroups.indexOf(g) === index
      );

      uniqueGroups.forEach((group, i) => {
        if (uniqueGroups.length <= theme.chartColors.length) {
          return (scaleColorsObj[group || 'null'] = isInverse
            ? theme.chartColorsInverse[i]
            : theme.chartColors[i]);
        }
        return {};
      });

      return scaleColorsObj;
    }

    const newOptions = {
      ...options,
      theme: isInverse ? ChartTheme.G100 : ChartTheme.WHITE,
      color: {
        scale: buildColors(),
      },
    };

    const ChartType = allCharts[type];

    return (
      <CarbonChartWrapper
        data-testid={testId}
        ref={ref}
        isInverse={isInverse}
        theme={theme}
        {...rest}
      >
        <ChartType data={dataSet} options={newOptions} />
      </CarbonChartWrapper>
    );
  }
);
