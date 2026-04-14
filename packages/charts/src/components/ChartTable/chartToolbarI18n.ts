import * as React from 'react';

import { I18nContext } from 'react-magma-dom';

export interface ChartToolbarI18n {
  defaultTitle: string;
  downloadAsCsv: string;
  downloadAsJpg: string;
  downloadAsPng: string;
  exitFullScreen: string;
  makeFullScreen: string;
  moreOptionsAriaLabel: string;
  showAsTableTooltip: string;
  tabularRepresentationLabel: string;
}

const defaults: ChartToolbarI18n = {
  defaultTitle: 'Chart',
  downloadAsCsv: 'Download as CSV',
  downloadAsJpg: 'Download as JPG',
  downloadAsPng: 'Download as PNG',
  exitFullScreen: 'Exit full screen',
  makeFullScreen: 'Make full screen',
  moreOptionsAriaLabel: 'More options',
  showAsTableTooltip: 'Show as table',
  tabularRepresentationLabel: 'Tabular representation',
};

/**
 * Reads chart toolbar i18n strings from the I18nContext if available,
 * falling back to English defaults.
 */
// eslint-disable-next-line complexity
export function useChartToolbarI18n(): ChartToolbarI18n {
  const i18n = React.useContext(I18nContext);
  const toolbar = (i18n.charts as { toolbar?: Partial<ChartToolbarI18n> })
    ?.toolbar;

  if (!toolbar) return defaults;

  return {
    defaultTitle: toolbar.defaultTitle ?? defaults.defaultTitle,
    downloadAsCsv: toolbar.downloadAsCsv ?? defaults.downloadAsCsv,
    downloadAsJpg: toolbar.downloadAsJpg ?? defaults.downloadAsJpg,
    downloadAsPng: toolbar.downloadAsPng ?? defaults.downloadAsPng,
    exitFullScreen: toolbar.exitFullScreen ?? defaults.exitFullScreen,
    makeFullScreen: toolbar.makeFullScreen ?? defaults.makeFullScreen,
    moreOptionsAriaLabel:
      toolbar.moreOptionsAriaLabel ?? defaults.moreOptionsAriaLabel,
    showAsTableTooltip:
      toolbar.showAsTableTooltip ?? defaults.showAsTableTooltip,
    tabularRepresentationLabel:
      toolbar.tabularRepresentationLabel ?? defaults.tabularRepresentationLabel,
  };
}
