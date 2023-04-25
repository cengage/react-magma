import * as React from 'react';

import {
  ThemeInterface,
  ThemeContext,
  useIsInverse,
  styled,
} from 'react-magma-dom';

import '@carbon/styles/css/styles.css';
import '@carbon/charts/styles.css';
import { AreaChart, SimpleBarChart, BubbleChart, WordCloudChart } from '@carbon/charts-react';

export enum CarbonChartType {
  area = 'area',
  bar = 'bar',
  bubble = 'bubble',
  word = 'word',
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
  theme: ThemeInterface
}>`
  p, div, text, .cds--cc--axes g.axis .axis-title,
  .cds--cc--title p.title,
  .cds--cc--axes g.axis g.tick text {
    font-family: 'Work Sans', Helvetica, sans-serif !important;
  }

  div.cds--cc--legend div.legend-item p {
    font-size: 14px;
  }

  .cds--btn--primary {
    background: ${props => props.isInverse ? props.theme.colors.primary600 : props.theme.colors.primary}
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
`;

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
      area: AreaChart,
      bar: SimpleBarChart,
      bubble: BubbleChart,
      word: WordCloudChart,
    };

    function buildColors() {
      let scaleColorsObj: Object = {};
      const allGroups = [...new Set<string>(dataSet.map(item => item.group))];
      allGroups.forEach((key, i) => {
        if (allGroups.length <= theme.iterableColors.length) {
          return (scaleColorsObj[key] = theme.iterableColors[i]);
        }
        return {};
      });

      return scaleColorsObj;
    }

    const newOptions = {
      ...options,
      theme: isInverse ? 'g100' : 'white',
      color: {
        scale: buildColors(),
      },
    };

    const ChartType = allCharts[type];

    return (
      <CarbonChartWrapper data-testid={testId} ref={ref} isInverse={isInverse} theme={theme} {...rest}>
        <ChartType data={dataSet} options={newOptions} />
      </CarbonChartWrapper>
    );
  }
);
