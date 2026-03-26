import * as React from 'react';

import styled from '@emotion/styled';
import { Button, Modal, ModalSize } from 'react-magma-dom';

import { ChartDataTable, ChartDataTableColumn } from './ChartDataTable';

export interface ChartTableModalProps {
  /** The chart's data passed to ChartDataTable */
  dataSet: Array<Record<string, React.ReactNode>>;
  /** Column definitions forwarded to ChartDataTable */
  columns?: ChartDataTableColumn[];
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
   * @default "Tabular representation"
   */
  headerLabel?: string;
  /** Magma Modal size */
  size?: ModalSize;
}

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`;

export function ChartTableModal({
  columns,
  dataSet,
  headerLabel = 'Tabular representation',
  headerLevel = 2,
  isInverse,
  isOpen,
  onClose,
  onDownloadCsv,
  size,
  title,
}: ChartTableModalProps) {
  const header = React.useMemo(
    () => (
      <span>
        <span style={{ display: 'block' }}>{headerLabel}</span>
        <span style={{ display: 'block' }}>{title}</span>
      </span>
    ),
    [headerLabel, title]
  );

  return (
    <Modal
      header={header}
      headerLevel={headerLevel}
      isInverse={isInverse}
      isOpen={isOpen}
      onClose={onClose}
      size={size}
    >
      <ChartDataTable
        columns={columns}
        dataSet={dataSet}
        isInverse={isInverse}
      />
      {onDownloadCsv && (
        <ModalFooter>
          <Button isInverse={isInverse} onClick={onDownloadCsv}>
            Download as CSV
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
}
