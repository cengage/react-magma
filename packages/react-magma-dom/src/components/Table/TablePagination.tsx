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
import { transparentize } from 'polished';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { NativeSelect } from '../NativeSelect';
import { Dropdown, DropdownAlignment, DropdownButton, DropdownContent, DropdownDropDirection, DropdownMenuItem } from '../Dropdown';

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
   * Event that fires when the number of rows per page changes
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
   * @default false
   */
  hasSquareCorners?: boolean;
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
  hasSquareCorners?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? transparentize(0.9, props.theme.colors.neutral100)
      : props.theme.colors.neutral200};
  border-top: 1px solid
    ${props =>
    props.isInverse
      ? transparentize(0.6, props.theme.colors.neutral100)
      : props.theme.colors.neutral300};
  display: flex;
  justify-content: flex-end;
  padding: ${props => props.theme.spaceScale.spacing02};
  border-radius: ${props => 
    props.hasSquareCorners 
    ? "0;"
    : `0 0 ${props.theme.borderRadius} ${props.theme.borderRadius};`}
`;

const PageCount = styled(Label) <{ theme: ThemeInterface }>`
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

  const [activeIndex, setActiveIndex] = React.useState(rowsPerPage);
  const isLastPage = page * rowsPerPage >= itemCount;

  const displayPageStart = (page - 1) * rowsPerPage + 1;
  const displayPageEnd = isLastPage ? itemCount : page * rowsPerPage;

  const rowsPerPageItems = rowsPerPageValues.map(value => ({
    label: value.toString(),
    value,
  }));

  function handleRowsPerPageChange(event) {
    if (!pageProp) {
      setPageState(1);

      onPageChange &&
        typeof onPageChange === 'function' &&
        onPageChange({} as React.SyntheticEvent, 1);
    }

    if (!rowsPerPageProp) {
      setRowsPerPageState(event.target.value);
    }

    onRowsPerPageChange &&
      typeof onRowsPerPageChange === 'function' &&
      onRowsPerPageChange(event.target.value);
      if(dropdownDropDirection) {
        setActiveIndex(rowsPerPage);
      }
  }

  const previousButton = pageButtons[0];
  const nextButton = pageButtons[pageButtons.length - 1];

  return (
    <StyledContainer
      {...other}
      data-testid={testId}
      isInverse={isInverse}
      ref={ref}
      theme={theme}
    >
      <RowsPerPageLabel isInverse={isInverse} theme={theme}>
        {i18n.table.pagination.rowsPerPageLabel}:
      </RowsPerPageLabel>
      {dropdownDropDirection ? 
        <Dropdown
          alignment={DropdownAlignment.end}
          dropDirection={dropdownDropDirection}
          activeIndex={activeIndex}
          isInverse={isInverse}
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
        </Dropdown> : 
        <NativeSelect
          onChange={handleRowsPerPageChange}
          aria-label={i18n.table.pagination.rowsPerPageLabel}
          style={{minWidth: 80}}
          testId="rowPerPageSelect" 
          fieldId={''}
        >
          {rowsPerPageItems.map((row, index) => (
            <option
              key={index}
              value={row.value}
            >
              {row.label}
            </option>
          ))}
        </NativeSelect> 
      }
      

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
