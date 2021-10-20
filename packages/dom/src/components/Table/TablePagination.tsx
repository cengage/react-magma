import * as React from 'react';
import { IconButton } from '../IconButton';
import { ButtonColor, ButtonVariant } from '../Button';
import { EastIcon, WestIcon } from 'react-magma-icons';
import { Label } from '../Label';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { usePagination } from '../Pagination/usePagination';
import { XOR } from '../../utils';
import { useControlled } from '../../hooks/useControlled';
import {
  Dropdown,
  DropdownAlignment,
  DropdownDropDirection,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';

export interface BaseTablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the dropdown content
   * @default `DropdownDropDirection.up`
   */
  dropdownDropDirection?: DropdownDropDirection;
  /**
   * Total number of rows
   */
  itemCount: number;
  isInverse?: boolean;
  /**
   * Event that fires when the page number changes
   */
  onPageChange?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Event that fires when the number of rows per page changes
   */
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  /**
   * Values added to the rows per page select
   */
  rowsPerPageValues?: number[];
  testId?: string;
}

export interface ControlledPageProps {
  /**
   * Current page number
   */
  page?: number;
}

export interface UncontrolledPageProps {
  /**
   * Page selected by default when the component is uncontrolled
   * @default 1
   */
  defaultPage?: number;
}

export type PagePaginationProps = XOR<
  ControlledPageProps,
  UncontrolledPageProps
>;

export interface ControlledRowsPerPageProps {
  /**
   * Number of rows per page
   */
  rowsPerPage?: number;
}

export interface UncontrolledRowsPerPageProps {
  /**
   * Number of rows per page by default when component is uncontrolled
   * @default 10
   */
  defaultRowsPerPage?: number;
}

export type RowsPaginationProps = XOR<
  ControlledRowsPerPageProps,
  UncontrolledRowsPerPageProps
>;

export type TablePaginationProps = BaseTablePaginationProps &
  PagePaginationProps &
  RowsPaginationProps;

const StyledContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse ? 'var(--colors-tint03)' : 'var(--colors-neutral07)'};
  border-top: 1px solid
    ${props =>
      props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral06)'};
  display: flex;
  justify-content: flex-end;
  padding: var(--spaceScale-spacing02);
`;

const PageCount = styled(Label)<{ theme: ThemeInterface }>`
  margin: 0 var(--spaceScale-spacing08);
`;

const RowsPerPageLabel = styled.span`
  font-weight: 600;
  line-height: 20px;
  margin: 0 16px 0 0;
  text-align: left;
`;

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>((props, ref) => {
  const {
    testId,
    defaultPage,
    defaultRowsPerPage = 10,
    dropdownDropDirection = DropdownDropDirection.up,
    itemCount,
    onPageChange,
    onRowsPerPageChange,
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    rowsPerPageValues = [10, 20, 50, 100],
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const isInverse = useIsInverse(props.isInverse);

  const [rowsPerPage, setRowsPerPageState] = useControlled({
    controlled: rowsPerPageProp,
    default: defaultRowsPerPage,
  });

  const { page, pageButtons, setPageState } = usePagination({
    count: itemCount / rowsPerPage,
    defaultPage,
    numberOfEdgePages: 0,
    numberOfAdjacentPages: 0,
    onPageChange,
    page: pageProp,
  });

  const isLastPage = page * rowsPerPage >= itemCount;

  const displayPageStart = (page - 1) * rowsPerPage + 1;
  const displayPageEnd = isLastPage ? itemCount : page * rowsPerPage;

  const rowsPerPageItems = rowsPerPageValues.map(value => ({
    label: value.toString(),
    value,
  }));

  function handleRowsPerPageChange(value: number) {
    if (!pageProp) {
      setPageState(1);

      onPageChange &&
        typeof onPageChange === 'function' &&
        onPageChange({} as React.SyntheticEvent, 1);
    }

    if (!rowsPerPageProp) {
      setRowsPerPageState(value);
    }

    onRowsPerPageChange &&
      typeof onRowsPerPageChange === 'function' &&
      onRowsPerPageChange(value);
  }

  const previousButton = pageButtons[0];
  const nextButton = pageButtons[pageButtons.length - 1];

  return (
    <StyledContainer
      {...other}
      data-testid={testId}
      isInverse={isInverse}
      ref={ref}
    >
      <RowsPerPageLabel>
        {i18n.table.pagination.rowsPerPageLabel}:
      </RowsPerPageLabel>
      <Dropdown
        alignment={DropdownAlignment.end}
        dropDirection={dropdownDropDirection}
      >
        <DropdownButton
          aria-label={i18n.table.pagination.rowsPerPageLabel}
          color={ButtonColor.secondary}
          style={{ minWidth: 0 }}
          testId="rowPerPageDropdownButton"
        >
          {rowsPerPageItems.find(item => item.value === rowsPerPage).label}
        </DropdownButton>
        <DropdownContent>
          {rowsPerPageItems.map((row, index) => (
            <DropdownMenuItem
              key={index}
              onClick={handleRowsPerPageChange}
              value={row.value}
            >
              {row.label}
            </DropdownMenuItem>
          ))}
        </DropdownContent>
      </Dropdown>

      <PageCount isInverse={isInverse}>
        {`${displayPageStart}-${displayPageEnd} ${i18n.table.pagination.ofLabel} ${itemCount}`}
      </PageCount>

      <IconButton
        aria-label={i18n.table.pagination.previousAriaLabel}
        color={ButtonColor.secondary}
        disabled={previousButton.disabled}
        icon={<WestIcon />}
        isInverse={isInverse}
        onClick={previousButton.onClick}
        testId="previousBtn"
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label={i18n.table.pagination.nextAriaLabel}
        color={ButtonColor.secondary}
        disabled={nextButton.disabled}
        icon={<EastIcon />}
        isInverse={isInverse}
        onClick={nextButton.onClick}
        testId="nextBtn"
        variant={ButtonVariant.link}
      />
    </StyledContainer>
  );
});
