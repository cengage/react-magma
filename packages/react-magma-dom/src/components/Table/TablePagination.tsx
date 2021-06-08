import * as React from 'react';
import { IconButton } from '../IconButton';
import { ButtonColor, ButtonVariant } from '../Button';
import { Select } from '../Select';
import { EastIcon, WestIcon } from 'react-magma-icons';
import { Label, LabelPosition } from '../Label';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/ThemeInterface';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';

export interface TablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of rows
   */
  count: number;
  isInverse?: boolean;
  /**
   * Event that fires when the page number changes
   */
  onChangePage?: (event: React.SyntheticEvent, newPage: number) => void;
  /**
   * Event that fires when the number of rows per page changes
   */
  onChangeRowsPerPage?: (newRowsPerPage: number) => void;
  /**
   * Zero-based page number
   *  @default 0
   */
  page?: number;
  /**
   * Number of rows per page
   * @default 10
   */
  rowsPerPage?: number;
  /**
   * Values added to the rows per page select
   */
  rowsPerPageValues?: number[];
  testId?: string;
}

const StyledContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse ? props.theme.colors.tint03 : props.theme.colors.neutral07};
  border-top: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral06};
  display: flex;
  justify-content: flex-end;
  padding: ${props => props.theme.spaceScale.spacing02};
`;

const PageCount = styled(Label)<{ theme: ThemeInterface }>`
  margin: 0 ${props => props.theme.spaceScale.spacing08};
`;

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>((props, ref) => {
  const {
    testId,
    count,
    onChangePage,
    onChangeRowsPerPage,
    page = 0,
    rowsPerPage = 10,
    rowsPerPageValues,
    ...other
  } = props;

  const { theme } = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const isInverse = useIsInverse(props.isInverse);

  const selectContainerStyle = { display: 'flex', alignItems: 'center' };
  const isLastPage = (page + 1) * rowsPerPage >= count;

  const displayPageStart = page * rowsPerPage + 1;
  const displayPageEnd = isLastPage ? count : (page + 1) * rowsPerPage;

  const rowsPerPageItems = rowsPerPageValues
    ? rowsPerPageValues.map(value => ({ label: value.toString(), value }))
    : [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
      ];

  function handleChangeRowsPerPage(changes) {
    onChangeRowsPerPage &&
      typeof onChangeRowsPerPage === 'function' &&
      onChangeRowsPerPage(changes.selectedItem.value);
  }

  function handleChangePage(event: React.SyntheticEvent, pageNum: number) {
    onChangePage &&
      typeof onChangePage === 'function' &&
      onChangePage(event, pageNum);
  }

  function handlePreviousClick(event: React.SyntheticEvent) {
    handleChangePage(event, page - 1);
  }

  function handleNextClick(event: React.SyntheticEvent) {
    handleChangePage(event, page + 1);
  }

  return (
    <StyledContainer
      {...other}
      data-testid={testId}
      isInverse={isInverse}
      ref={ref}
      theme={theme}
    >
      <Select
        containerStyle={selectContainerStyle}
        labelPosition={LabelPosition.left}
        labelText={`${i18n.table.pagination.rowsPerPageLabel}:`}
        selectedItem={rowsPerPageItems.find(item => item.value === rowsPerPage)}
        isInverse={isInverse}
        items={rowsPerPageItems}
        onSelectedItemChange={handleChangeRowsPerPage}
      />

      <PageCount isInverse={isInverse} theme={theme}>
        {`${displayPageStart}-${displayPageEnd} ${i18n.table.pagination.ofLabel} ${count}`}
      </PageCount>

      <IconButton
        aria-label={i18n.table.pagination.previousAriaLabel}
        color={ButtonColor.secondary}
        disabled={page <= 0}
        icon={<WestIcon />}
        isInverse={isInverse}
        onClick={handlePreviousClick}
        testId="previousBtn"
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label={i18n.table.pagination.nextAriaLabel}
        color={ButtonColor.secondary}
        disabled={isLastPage}
        icon={<EastIcon />}
        isInverse={isInverse}
        onClick={handleNextClick}
        testId="nextBtn"
        variant={ButtonVariant.link}
      />
    </StyledContainer>
  );
});
