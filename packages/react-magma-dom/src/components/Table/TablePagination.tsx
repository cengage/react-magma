import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { EastIcon, WestIcon } from 'react-magma-icons';

import { useControlled } from '../../hooks/useControlled';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { magma, ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { XOR } from '../../utils';
import { ButtonColor, ButtonVariant } from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { DropdownDropDirection } from '../Dropdown';
import { IconButton } from '../IconButton';
import { Label } from '../Label';
import { NativeSelect } from '../NativeSelect';
import { usePagination } from '../Pagination/usePagination';

export interface BaseTablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the dropdown content
   * @default DropdownDropDirection.up
   * @deprecated true
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
   * Event that fires when the number of rows per page changes.
   * If no function is passed, the rows per page select will be hidden
   */
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  /**
   * Values added to the rows per page select
   */
  rowsPerPageValues?: number[];
  /**
   * @internal
   */
  testId?: string;
  /**
   * If true, the table paginator will have square edges
   * @default true
   */
  hasSquareCorners?: boolean;
  /**
   * If true, the table paginator will have outer border
   * @default false
   */
  hasOutsideBorder?: boolean;
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

function getBorder(hasOutsideBorder: boolean, isInverse: boolean) {
  return hasOutsideBorder
    ? `1px solid ${
        isInverse
          ? transparentize(0.6, magma.colors.neutral100)
          : magma.colors.neutral300
      }`
    : 'none';
}

const StyledContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
  hasOutsideBorder?: boolean;
  hasSquareCorners?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? transparentize(0.9, props.theme.colors.neutral100)
      : props.theme.colors.neutral200};
  display: flex;
  justify-content: flex-end;
  padding: ${props => props.theme.spaceScale.spacing02};
  border-left: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-right: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-bottom: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-radius: ${props =>
    props.hasSquareCorners
      ? '0'
      : `0 0 ${props.theme.borderRadius} ${props.theme.borderRadius}`};
`;

const PageCount = styled(Label)<{ theme: ThemeInterface }>`
  margin: 0 ${props => props.theme.spaceScale.spacing08};
`;

const RowsPerPageLabel = styled.span<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  font-weight: 600;
  font-family: ${props => props.theme.bodyFont};
  line-height: 20px;
  margin: 0 16px 0 0;
  text-align: left;
  color: ${props => (props.isInverse ? props.theme.colors.neutral100 : '')};
`;

interface RowsPerPageControllerProps {
  /**
   * Event that fires when the number of rows per page changes
   */
  handleRowsPerPageChange?: (value: any) => void;
  /**
   * Values added to the rows per page select
   */
  rowsPerPageValues: number[];
  isInverse?: boolean;
  rowsPerPage: number;
}

const RowsPerPageController = (props: RowsPerPageControllerProps) => {
  const { handleRowsPerPageChange, rowsPerPageValues, isInverse, rowsPerPage } =
    props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const rowsPerPageItems = rowsPerPageValues.map(value => ({
    label: value.toString(),
    value,
  }));

  return (
    <>
      <RowsPerPageLabel isInverse={isInverse} theme={theme}>
        {i18n.table.pagination.rowsPerPageLabel}:
      </RowsPerPageLabel>
      <NativeSelect
        onChange={event => handleRowsPerPageChange(event.target.value)}
        aria-label={i18n.table.pagination.rowsPerPageLabel}
        style={{ minWidth: 80 }}
        testId="rowPerPageSelect"
        fieldId={''}
        value={rowsPerPage}
      >
        {rowsPerPageItems.map((row, index) => (
          <option key={index} value={row.value}>
            {row.label}
          </option>
        ))}
      </NativeSelect>
    </>
  );
};

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>((props, ref) => {
  const {
    dropdownDropDirection,
    testId,
    defaultPage,
    defaultRowsPerPage = 10,
    itemCount,
    onPageChange,
    onRowsPerPageChange = null,
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    rowsPerPageValues = [10, 20, 50, 100],
    hasOutsideBorder,
    hasSquareCorners = true,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const hasRowPerPageChangeFunction =
    onRowsPerPageChange && typeof onRowsPerPageChange === 'function';

  const isInverse = useIsInverse(props.isInverse);

  const [rowsPerPage, setRowsPerPageState] = useControlled({
    controlled: rowsPerPageProp,
    default: defaultRowsPerPage,
  });

  React.useEffect(() => {
    const checkedRowsPerPage = rowsPerPageProp
      ? rowsPerPageProp
      : defaultRowsPerPage;

    if (!rowsPerPageValues.includes(checkedRowsPerPage)) {
      setRowsPerPageState(rowsPerPageValues[0]);
      handleRowsPerPageChange(rowsPerPageValues[0]);
    }
  }, []);

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

  function handleRowsPerPageChange(value) {
    if (!pageProp) {
      setPageState(1);

      onPageChange &&
        typeof onPageChange === 'function' &&
        onPageChange({} as React.SyntheticEvent, 1);
    }

    if (!rowsPerPageProp) {
      setRowsPerPageState(value);
    }

    hasRowPerPageChangeFunction && onRowsPerPageChange(value);
  }

  const previousButton = pageButtons[0];
  const nextButton = pageButtons[pageButtons.length - 1];

  return (
    <StyledContainer
      {...other}
      data-testid={testId}
      isInverse={isInverse}
      hasOutsideBorder={hasOutsideBorder}
      hasSquareCorners={hasSquareCorners}
      ref={ref}
      theme={theme}
    >
      {hasRowPerPageChangeFunction && (
        <RowsPerPageController
          isInverse={isInverse}
          handleRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageValues={rowsPerPageValues}
          rowsPerPage={rowsPerPage}
        />
      )}

      <PageCount isInverse={isInverse} theme={theme}>
        {`${displayPageStart}-${displayPageEnd} ${i18n.table.pagination.ofLabel} ${itemCount}`}
      </PageCount>

      <ButtonGroup alignment={ButtonGroupAlignment.center}>
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
      </ButtonGroup>
    </StyledContainer>
  );
});
