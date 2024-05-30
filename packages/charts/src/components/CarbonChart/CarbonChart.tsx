import * as React from 'react';
import { ThemeInterface, ThemeContext, useIsInverse } from 'react-magma-dom';
import { transparentize } from 'polished';
import styled, { CreateStyled } from '@emotion/styled';
import {
  AreaChart,
  StackedAreaChart,
  DonutChart,
  GroupedBarChart,
  LineChart,
  LollipopChart,
  PieChart,
  SimpleBarChart,
  StackedBarChart,
} from '@carbon/charts-react';
import './styles.min.css';

const typedStyled = styled as CreateStyled<ThemeInterface>;

export enum CarbonChartType {
  area = 'area',
  areaStacked = 'areaStacked',
  bar = 'bar',
  barGrouped = 'barGrouped',
  barStacked = 'barStacked',
  donut = 'donut',
  line = 'line',
  pie = 'pie',
  lollipop = 'lollipop',
}

export interface CarbonChartProps extends React.HTMLAttributes<HTMLDivElement> {
  dataSet: Array<Object>;
  isInverse?: boolean;
  /**
   * For a complete list of options, see Carbon Charts documentation
   */
  options: Object;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Type of Chart: area, bar, donut, line, etc.
   */
  type: CarbonChartType;
}

const CarbonChartWrapper = typedStyled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  .cds--data-table thead tr th {
    background: ${props =>
      props.isInverse ? props.theme.colors.primary700 : ''} !important;
  }
  .cds--data-table td,
  .cds--data-table tbody th {
    color: ${props => props.theme.colors.neutral700};
  }
  .cds--data-table tbody tr,
  .cds--data-table tbody tr td,
  .cds--data-table tbody tr th {
    color: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
  }
  .cds--data-table tr {
    block-size: 2.5rem;
  }

  .cds--cc--tooltip .content-box .datapoint-tooltip p {
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    padding: ${props => props.theme.spaceScale.spacing02};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
        max-width:142px;
        white-space: normal;
  }

  .cds--modal-container {
    clip-path: inset(0% 0% 0% 0% round ${props => props.theme.borderRadius});
    background: ${props =>
      props.isInverse ? props.theme.colors.primary700 : ''};
    .cds--data-table th {
      background: ${props =>
        props.isInverse ? props.theme.colors.primary600 : ''};
    }
    .cds--data-table td {
      border-top: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : 'inherit'};
      border-bottom: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : 'inherit'};
      background: ${props => (props.isInverse ? '#202565' : '')};
    }
    .cds--data-table tr:hover td {
      background: ${props =>
        props.isInverse ? props.theme.colors.primary600 : ''};
    }
  }

  p,
  div,
  text,
  .cds--cc--axes g.axis .axis-title,
  .cds--cc--title p.title,
  .cds--cc--axes g.axis g.tick text {
    font-family: ${props => props.theme.bodyFont} !important;
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};
  }

  .cds--cc--axes {
    overflow: visible;
  }

  div.cds--cc--legend {
    div.legend-item {
      div.checkbox {
        background: ${props =>
          props.isInverse
            ? props.theme.colors.neutral900
            : props.theme.colors.neutral100};
        border: none;
        width: ${props => props.theme.spaceScale.spacing05};
        height: ${props => props.theme.spaceScale.spacing05};
        svg {
          left: 2px;
          position: relative;
        }
      }
      p {
        font-size: ${props => props.theme.typeScale.size03.fontSize};
        margin: 0 ${props => props.theme.spaceScale.spacing03} 0 0;
      }
    }
  }
  div.cds--cc--legend.has-deactivated-items {
    div.legend-item {
      div.checkbox {
        border: 1px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.neutral100
              : props.theme.colors.neutral900};
      }
      div.checkbox.active {
        border: 1px solid transparent;
      }
    }
  }
  .chart-holder {
    .cds--cc--axes g.axis g.tick text {
      fill: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
    }
    .cds--cc--axes g.axis path.domain {
      stroke: ${props =>
        props.isInverse ? props.theme.colors.neutral100 : ''};
    }
    .cds--cc--grid g.x.grid g.tick line,
    .cds--cc--grid g.y.grid g.tick line {
      stroke: ${props =>
        props.isInverse
          ? transparentize(0.5, props.theme.colors.neutral100)
          : ''};
    }
    .cds--cc--grid rect.chart-grid-backdrop.stroked{
      stroke: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')}
    }
    .cds--cc--skeleton .shimmer-effect-lines {
      filter: ${props => (props.isInverse ? 'invert(1)' : '')};
    }
    /* .chart-holder.cds--chart-holder.filled,
    .cds--cc--skeleton rect.chart-skeleton-backdrop,
    .cds--cc--grid rect.chart-grid-backdrop {
    } */
    
    .cds--cc--grid rect.chart-grid-backdrop{
      fill:transparent;
    }
    .cds--cc--scatter circle.dot.hovered {
      padding: 10px;
    }
    .cds--cc--scatter-stacked circle.dot.hovered,
    .cds--cc--scatter-stacked circle.dot.unfilled,
    .cds--cc--scatter circle.dot.unfilled{
      stroke-width: 6px;
      transition: 0.1s all linear;
     
    }
    .cds--cc--scatter circle.dot.hovered {
      stroke-width: 0.5em;
      transition: 0.1s all linear;
       filter: 
        drop-shadow( 1px  0px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100}) 
        drop-shadow(-1px  0px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100})
        drop-shadow( 0px  1px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100}) 
        drop-shadow( 0px -1px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100});
      }
    }
      .cds--cc--lollipop circle.dot.filled,
      .cds--cc--lollipop circle.dot.hovered {
        stroke-width: 15px;
      }
      .cds--cc--scatter-stacked circle.dot.hovered,
    .cds--cc--scatter-stacked circle.dot.unfilled,
    .cds--cc--scatter circle.dot.unfilled,
    .cds--cc--lollipop circle.dot.filled,
      .cds--cc--lollipop circle.dot.hovered{
        transition: 0.1s all linear;
        filter: 
        drop-shadow( 1px  0px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100}) 
        drop-shadow(-1px  0px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100})
        drop-shadow( 0px  1px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100}) 
        drop-shadow( 0px -1px 0px ${props =>
          props.isInverse
            ? props.theme.colors.primary600
            : props.theme.colors.neutral100});
      }
      .cds--cc--lollipop .cds--cc--scatter circle.dot.hovered{
        transition: 0.1s all linear;
        stroke-width: 1.1em;
      }

      .cds--overflow-menu-options__btn:focus {
        outline-color: ${props =>
          props.isInverse ? props.theme.colors.focusInverse : ''};
      }

      .cds--btn {
        min-height: auto;
        display: flex;
        flex: 0 auto;
        align-items: center;
        text-align: center;
        padding: 20px;
        margin: 0;
        line-height: ${props => props.theme.typeScale.size03.lineHeight};
        margin: 0;
        min-width: ${props => props.theme.spaceScale.spacing13};
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
            ? props.theme.colors.tertiary500
            : props.theme.colors.primary};
        color: ${props =>
          props.isInverse ? props.theme.colors.neutral900 : ''};
      }

      *:focus {
        outline: 2px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.focusInverse
              : props.theme.colors.focus} !important;
      }
      outline-offset: 0;
    }
    .cds--overflow-menu-options__btn:focus,
    .cds--overflow-menu:focus,
    .cds--overflow-menu__trigger:focus,
    .toolbar-control:focus {
      outline: 2px solid
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus} !important;
    }
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):focus
      div.checkbox,
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):hover
      div.checkbox {
      border: ${props =>
        props.isInverse ? `1px solid ${props.theme.colors.focusInverse}` : ''};
    }
    div.cds--cc--legend.clickable
      div.legend-item:not(.additional):hover
      div.checkbox {
      box-shadow: 0 0 0 2px
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus} !important;
    }

    .cds--btn--primary {
      &:focus {
        outline: 2px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.focusInverse
              : props.theme.colors.focus};
      }
      outline-offset: 2px;
      border: none;
      box-shadow: none;
    }
    .cds--modal-header {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.primary600
          : props.theme.colors.neutral100};
      margin-bottom: 0;
      border-bottom: 1px solid
        ${props =>
          props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral100)
            : props.theme.colors.neutral300};
    }
    .cds--modal-header__heading {
      font-weight: 600;
    }

    .cds--modal-close {
      position: absolute;
      top: 0;
      right: 0;
      &:focus {
        outline: 2px solid
          ${props =>
            props.isInverse
              ? props.theme.colors.focusInverse
              : props.theme.colors.focus};
        border-color: none;
      }
      outline-offset: 0;
      border: none;
    }
  }

  .cds--modal-footer.cds--modal-footer {
    display: flex;
    align-items: center;
    border-top: 1px solid
      ${props =>
        props.isInverse
          ? transparentize(0.8, props.theme.colors.neutral100)
          : props.theme.colors.neutral300};
    background: ${props =>
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.neutral100} !important;
  }
  .layout-child.header {
    height: auto !important;
    p {
      text-overflow: inherit;
      overflow: auto;
      white-space: normal;
    }
  }

  svg:not(:root) {
    overflow: visible;
  }

  .cds--cc--chart-wrapper text {
    font-size: ${props => props.theme.typeScale.size02.fontSize};
  }

  g.center text,
  .pie-label{
    fill: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')} ;
  }

  // Zoom responsive tweaks

  @media screen and (max-width: 760px) {
    .cds--modal-container {
      overflow-y: auto;
    }
    .cds--chart-holder .cds--modal .cds--modal-container .cds--modal-content {
      overflow: visible;
    }
    .cds--chart-holder
      .cds--modal
      .cds--modal-container
      .cds--modal-content
      table
      th {
      position: relative;
    }
  }
`;

/* Carbon themes
https://github.com/carbon-design-system/carbon-charts/blob/master/packages/core/src/interfaces/enums.ts#L12)
*/
enum ChartTheme {
  WHITE = 'white', // default
  G100 = 'g100', // isInverse
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
      area: AreaChart,
      areaStacked: StackedAreaChart,
      bar: SimpleBarChart,
      barGrouped: GroupedBarChart,
      barStacked: StackedBarChart,
      donut: DonutChart,
      line: LineChart,
      lollipop: LollipopChart,
      pie: PieChart,
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
          return (scaleColorsObj[group || ('null' as any)] = isInverse
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
      tooltip: {
        truncation: {
          type: 'none',
        },
      },
    };

    const ChartType = allCharts[type] as any;

    // Adding aria-label to main SVG container
    React.useEffect(() => {
      document.querySelectorAll('.graph-frame ').forEach(div => {
        div.setAttribute('aria-label', 'Interactive chart');
      });
    });

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
