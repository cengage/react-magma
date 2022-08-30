// *
// * Colors
// *
// const yellow200 = '#FFF59D';
// const deepOrange600 = '#F4511E';
// const lime300 = '#DCE775';
// const lightGreen500 = '#8BC34A';
// const teal700 = '#00796B';
// const cyan900 = '#006064';

// const colors = [
//   '#0085CC',
//   '#E0004D',
//   '#FA6600',
//   '#48A200',
//   '#B12FAD',
//   '#00A393',
// ];

const colors = [
  '#00507A',
  '#8F0033',
  '#B84900',
  '#255200',
  '#711E6E',
  '#005249',
];

const blueGrey50 = '#DFDFDF';
const blueGrey300 = '#8F8F8F';
const blueGrey700 = '#3F3F3F';
const grey900 = 'pink';

// *
// * Typography
// *
const sansSerif = '"Work Sans",Helvetica,sans-serif';
const letterSpacing = 'normal';
const fontSize = 12;

// *
// * Layout
// *
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
};

// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: 'transparent',
  strokeWidth: 0,
};

const centeredLabelStyles = { textAnchor: 'middle', ...baseLabelStyles };
// *
// * Strokes
// *
// const strokeDasharray = '10, 5';
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

export const magmaTheme: any = {
  area: {
    style: {
      data: {
        fill: grey900,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  axis: {
    style: {
      axis: {
        fill: 'transparent',
        stroke: blueGrey300,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      axisLabel: {
        ...centeredLabelStyles,
        padding,
        stroke: 'transparent',
      },
      grid: {
        fill: 'none',
        stroke: '#dfdfdf',
        //strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: 'painted',
      },
      ticks: {
        fill: 'transparent',
        size: 0,
        stroke: blueGrey300,
        strokeWidth: 0,
        strokeLinecap,
        strokeLinejoin,
      },
      tickLabels: {
        ...baseLabelStyles,
        fill: blueGrey700,
      },
    },
    ...baseProps,
  },
  polarDependentAxis: {
    style: {
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent',
      },
    },
  },
  bar: {
    style: {
      data: {
        fill: blueGrey700,
        padding,
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  boxplot: {
    style: {
      max: { padding, stroke: blueGrey700, strokeWidth: 1 },
      maxLabels: { ...baseLabelStyles, padding: 3 },
      median: { padding, stroke: blueGrey700, strokeWidth: 1 },
      medianLabels: { ...baseLabelStyles, padding: 3 },
      min: { padding, stroke: blueGrey700, strokeWidth: 1 },
      minLabels: { ...baseLabelStyles, padding: 3 },
      q1: { padding, fill: blueGrey700 },
      q1Labels: { ...baseLabelStyles, padding: 3 },
      q3: { padding, fill: blueGrey700 },
      q3Labels: { ...baseLabelStyles, padding: 3 },
    },
    boxWidth: 20,
    ...baseProps,
  },
  candlestick: {
    style: {
      data: {
        stroke: blueGrey700,
      },
      labels: { ...baseLabelStyles, padding: 5 },
    },
    candleColors: {
      positive: '#ffffff',
      negative: blueGrey700,
    },
    ...baseProps,
  },
  chart: baseProps,
  errorbar: {
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  group: {
    colorScale: colors,
    ...baseProps,
  },
  histogram: {
    style: {
      data: {
        fill: blueGrey700,
        stroke: grey900,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 },
    },
  },
  line: {
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: blueGrey700,
        strokeWidth: 2,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  pie: {
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: blueGrey50,
        strokeWidth: 1,
      },
      labels: { ...baseLabelStyles, padding: 20 },
    },
    ...baseProps,
  },
  scatter: {
    style: {
      data: {
        fill: blueGrey700,
        opacity: 1,
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  stack: {
    colorScale: colors,
    ...baseProps,
  },
  tooltip: {
    style: { ...baseLabelStyles, padding: 0, pointerEvents: 'none' },
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: {
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: { ...baseLabelStyles, padding: 5, pointerEvents: 'none' },
      flyout: {
        stroke: grey900,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none',
      },
    },
    ...baseProps,
  },
};
