import * as React from 'react';

import styled from '@emotion/styled';
import { Button, Modal, ModalSize, ThemeContext } from 'react-magma-dom';

import { ChartDataTable, ChartDataTableColumn } from './ChartDataTable';
import { useChartToolbarI18n } from './chartToolbarI18n';

export interface ChartTableModalProps {
  /** The chart's data passed to ChartDataTable */
  dataSet: Array<Record<string, React.ReactNode>>;
  /** Column definitions forwarded to ChartDataTable */
  columns?: ChartDataTableColumn[];
  /**
   * DOM element to portal the modal into. Defaults to `document.body`.
   * When the chart is in fullscreen, pass the fullscreen element so the
   * modal renders inside it and is visible to the browser.
   */
  portalContainer?: HTMLElement | null;
  /**
   * If true, the modal uses inverse (dark) styling.
   * @default false
   */
  isInverse?: boolean;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Called when the modal requests to close */
  onClose: () => void;
  /** Called when the "Download as CSV" footer button is clicked */
  onDownloadCsv?: () => void;
  /** Chart title – displayed as a second line in the modal heading */
  title: string;
  /**
   * Heading level for the modal header (1–6).
   * @default 2
   */
  headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * First line of the modal heading.
   * @default "Tabular representation" (i18n overridable)
   */
  headerLabel?: string;
  /**
   * Magma Modal size.
   * @default ModalSize.large
   */
  size?: ModalSize;
}

const ModalFooter = styled.div<{ theme: any }>`
  display: flex;
  justify-content: flex-end;
  padding-top: ${props => props.theme.spaceScale.spacing05};
`;

const HeaderLabel = styled.span<{ isInverse?: boolean; theme: any }>`
  display: block;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-weight: normal;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
`;

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const contentStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};

const HeaderTitle = styled.span`
  display: block;
`;

export function ChartTableModal({
  columns,
  portalContainer,
  dataSet,
  headerLabel,
  headerLevel = 2,
  isInverse,
  isOpen,
  onClose,
  onDownloadCsv,
  size = ModalSize.large,
  title,
}: ChartTableModalProps) {
  const t = useChartToolbarI18n();
  const theme = React.useContext(ThemeContext);
  const resolvedHeaderLabel = headerLabel ?? t.tabularRepresentationLabel;
  const header = React.useMemo(
    () => (
      <span>
        <HeaderLabel isInverse={isInverse} theme={theme}>
          {resolvedHeaderLabel}
        </HeaderLabel>
        <HeaderTitle>{title}</HeaderTitle>
      </span>
    ),
    [resolvedHeaderLabel, title, isInverse, theme]
  );

  return (
    <Modal
      portalContainer={portalContainer}
      containerStyle={portalContainer ? containerStyle : undefined}
      header={header}
      headerLevel={headerLevel}
      isInverse={isInverse}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      style={portalContainer ? contentStyle : undefined}
    >
      <ChartDataTable
        columns={columns}
        dataSet={dataSet}
        isInverse={isInverse}
      />
      {onDownloadCsv && (
        <ModalFooter theme={theme}>
          <Button isInverse={isInverse} onClick={onDownloadCsv}>
            {t.downloadAsCsv}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
}
