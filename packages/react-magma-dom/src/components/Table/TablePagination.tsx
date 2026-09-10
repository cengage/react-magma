import * as React from 'react';

import styled from '@emotion/styled';
import { EastIcon, WestIcon } from 'react-magma-icons';

import { useControlled } from '../../hooks/useControlled';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { magma, ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { XOR } from '../../utils';
import { AnnouncePoliteness } from '../Announce';
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
        isInverse ? magma.colors.neutral800 : magma.colors.neutral200
      }`
    : 'none';
}

const ResponsiveContainer = styled.div`
  container-name: tablePaginationContainer;
  container-type: inline-size;
  width: 100%;
`;

const StyledContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
  hasOutsideBorder?: boolean;
  hasSquareCorners?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral1000
      : props.theme.colors.neutral150};
  display: flex;
  justify-content: flex-start;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing05};
  border-left: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-right: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-bottom: ${props => getBorder(props.hasOutsideBorder, props.isInverse)};
  border-radius: ${props =>
    props.hasSquareCorners
      ? '0'
      : `0 0 ${props.theme.borderRadius} ${props.theme.borderRadius}`};

  @container tablePaginationContainer (max-width: 600px) {
    padding-left: ${props => props.theme.spaceScale.spacing03};
    padding-right: ${props => props.theme.spaceScale.spacing03};
  }
`;

const LeftControls = styled.div<{ hasRowsPerPage?: boolean }>`
  align-items: center;
  display: flex;

  @container tablePaginationContainer (max-width: 600px) {
    align-items: flex-start;
    display: ${props => (props.hasRowsPerPage ? 'grid' : 'flex')};
    flex: 1;
    grid-template-columns: ${props =>
      props.hasRowsPerPage ? 'minmax(100px, 1fr) 1px minmax(0, 1fr)' : 'none'};
    min-width: 0;
  }
`;

const NavigationControls = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  align-self: stretch;
  display: flex;
  margin-left: auto;
`;

const VerticalDivider = styled.span<{
  isCompactGridDivider?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-self: stretch;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral800
      : props.theme.colors.neutral200};
  display: block;
  margin: calc(-1 * ${props => props.theme.spaceScale.spacing03})
    ${props => props.theme.spaceScale.spacing05};
  width: 1px;

  @container tablePaginationContainer (max-width: 600px) {
    margin-left: ${props =>
      props.isCompactGridDivider ? '0' : props.theme.spaceScale.spacing03};
    margin-right: ${props =>
      props.isCompactGridDivider ? '0' : props.theme.spaceScale.spacing03};
  }
`;

const PageCount = styled(Label)<{
  hasRowsPerPage?: boolean;
  theme: ThemeInterface;
}>`
  font-weight: 400;
  margin: 0;

  @container tablePaginationContainer (max-width: 600px) {
    align-self: flex-start;
    font-size: ${props => props.theme.typeScale.size01.fontSize};
    min-width: 0;
    overflow-wrap: anywhere;
    padding-left: ${props =>
      props.hasRowsPerPage ? props.theme.spaceScale.spacing03 : '0'};
  }
` as React.ComponentType<
  React.ComponentProps<typeof Label> & {
    'aria-live'?: 'polite' | 'assertive' | 'off';
    hasRowsPerPage?: boolean;
  }
>;

const PageNumber = styled.span`
  font-weight: 500;

  @container tablePaginationContainer (max-width: 600px) {
    display: block;
  }
`;

const PageRange = styled.span`
  white-space: nowrap;

  @container tablePaginationContainer (max-width: 600px) {
    white-space: normal;
  }
`;

const RowsPerPageControl = styled.div<{ theme: ThemeInterface }>`
  align-items: center;
  display: flex;

  @container tablePaginationContainer (max-width: 600px) {
    align-items: flex-start;
    box-sizing: border-box;
    flex-direction: column;
    min-width: 100px;
    padding-right: ${props => props.theme.spaceScale.spacing03};
  }
`;

const RowsPerPageLabel = styled.span<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-weight: 500;
  font-family: ${props => props.theme.bodyFont};
  line-height: 20px;
  margin: 0 16px 0 0;
  text-align: left;
  white-space: nowrap;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.brand.navy};

  @container tablePaginationContainer (max-width: 600px) {
    font-size: ${props => props.theme.typeScale.size01.fontSize};
    margin: 0 0 ${props => props.theme.spaceScale.spacing02} 0;
  }
`;

interface RowsPerPageControllerProps {
  /**
   * Event that fires when the number of rows per page changes
   */
  handleRowsPerPageChange?: (value: number) => void;
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

  const selectedValueLength = Math.max(rowsPerPage.toString().length, 2);

  return (
    <RowsPerPageControl data-testid="rows-per-page-control" theme={theme}>
      <RowsPerPageLabel isInverse={isInverse} theme={theme} aria-hidden="true">
        {i18n.table.pagination.rowsPerPageLabel}:
      </RowsPerPageLabel>
      <NativeSelect
        onChange={event => handleRowsPerPageChange(+event.target.value)}
        aria-label={i18n.table.pagination.rowsPerPageLabel}
        isInverse={isInverse}
        style={{ width: `calc(${selectedValueLength}ch + 56px)` }}
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
    </RowsPerPageControl>
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
  const previousButtonRef = React.useRef<HTMLButtonElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);

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
    // Always reset page to 1 when rows per page changes
    if (!pageProp) {
      setPageState(1);
    }

    // Always notify parent to reset page, even if controlled
    onPageChange &&
      typeof onPageChange === 'function' &&
      onPageChange({} as React.SyntheticEvent, 1);

    if (!rowsPerPageProp) {
      setRowsPerPageState(value);
    }

    hasRowPerPageChangeFunction && onRowsPerPageChange(value);
  }

  const previousButton = pageButtons[0];
  const nextButton = pageButtons[pageButtons.length - 1];

  const previousButtonClick = event => {
    previousButton.onClick(event);

    setTimeout(() => {
      if (previousButtonRef.current?.disabled) {
        nextButtonRef.current?.focus();
      }
    }, 0);
  };

  const nextButtonClick = event => {
    nextButton.onClick(event);

    setTimeout(() => {
      if (nextButtonRef.current?.disabled) {
        previousButtonRef.current?.focus();
      }
    }, 0);
  };

  return (
    <ResponsiveContainer data-testid="table-pagination-responsive-container">
      <StyledContainer
        {...other}
        data-testid={testId}
        isInverse={isInverse}
        hasOutsideBorder={hasOutsideBorder}
        hasSquareCorners={hasSquareCorners}
        ref={ref}
        theme={theme}
      >
        <LeftControls
          data-testid="pagination-details"
          hasRowsPerPage={!!hasRowPerPageChangeFunction}
        >
          {hasRowPerPageChangeFunction && (
            <>
              <RowsPerPageController
                isInverse={isInverse}
                handleRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageValues={rowsPerPageValues}
                rowsPerPage={rowsPerPage}
              />
              <VerticalDivider
                aria-hidden="true"
                data-testid="rows-page-divider"
                isCompactGridDivider
                isInverse={isInverse}
                theme={theme}
              />
            </>
          )}

          <PageCount
            hasRowsPerPage={!!hasRowPerPageChangeFunction}
            isInverse={isInverse}
            textColor={
              isInverse ? theme.colors.neutral0 : theme.colors.brand.navy
            }
            theme={theme}
            testId="page-count"
            aria-live={AnnouncePoliteness.polite}
            aria-atomic="true"
          >
            <PageNumber data-testid="page-number">{`Page ${page}:`}</PageNumber>{' '}
            <PageRange data-testid="page-range">
              {`${displayPageStart}-${displayPageEnd} ${i18n.table.pagination.ofLabel} ${itemCount}`}
            </PageRange>
          </PageCount>
        </LeftControls>

        <NavigationControls
          data-testid="pagination-navigation"
          isInverse={isInverse}
          theme={theme}
        >
          <VerticalDivider
            aria-hidden="true"
            data-testid="navigation-divider"
            isInverse={isInverse}
            theme={theme}
          />
          <ButtonGroup alignment={ButtonGroupAlignment.center}>
            <IconButton
              ref={previousButtonRef}
              aria-label={i18n.table.pagination.previousAriaLabel}
              color={ButtonColor.subtle}
              disabled={previousButton.disabled}
              icon={<WestIcon />}
              isInverse={isInverse}
              onClick={previousButtonClick}
              testId="previousBtn"
              variant={ButtonVariant.link}
            />
            <IconButton
              ref={nextButtonRef}
              aria-label={i18n.table.pagination.nextAriaLabel}
              color={ButtonColor.subtle}
              disabled={nextButton.disabled}
              icon={<EastIcon />}
              isInverse={isInverse}
              onClick={nextButtonClick}
              testId="nextBtn"
              variant={ButtonVariant.link}
            />
          </ButtonGroup>
        </NavigationControls>
      </StyledContainer>
    </ResponsiveContainer>
  );
});
