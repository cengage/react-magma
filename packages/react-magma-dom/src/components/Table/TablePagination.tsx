import * as React from 'react';
import { IconButton } from '../IconButton';
import { ButtonColor, ButtonVariant } from '../Button';
import { Select } from '../Select';
import { ArrowRight2Icon, ArrowLeft2Icon } from 'react-magma-icons';
import { Label, LabelPosition } from '../Label';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { I18nContext } from '../../i18n';

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
  onChangePage?: (event: any) => void;
  /**
   * Event that fires when the number of rows per page changes
   */
  onChangeRowsPerPage?: (event: any) => void;
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
    isInverse,
    onChangePage,
    onChangeRowsPerPage,
    page = 0,
    rowsPerPage = 10,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const selectContainerStyle = { display: 'flex', alignItems: 'center' };
  const isLastPage = (page + 1) * rowsPerPage >= count;

  const displayPageStart = page * rowsPerPage + 1;
  const displayPageEnd = isLastPage ? count : (page + 1) * rowsPerPage;

  function handleChangeRowsPerPage(changes) {
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(changes.selectedItem.label);
    }
  }

  function handleChangePage(pageNum) {
    if (onChangePage) {
      onChangePage(pageNum);
    }
  }

  function handlePreviousClick() {
    handleChangePage(page - 1);
  }

  function handleNextClick() {
    handleChangePage(page + 1);
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
        initialSelectedItem={{ label: rowsPerPage }}
        isInverse={isInverse}
        items={[{ label: 10 }, { label: 20 }, { label: 50 }, { label: 100 }]}
        onSelectedItemChange={handleChangeRowsPerPage}
      />

      <PageCount isInverse={isInverse} theme={theme}>
        {`${displayPageStart}-${displayPageEnd} ${i18n.table.pagination.ofLabel} ${count}`}
      </PageCount>

      <IconButton
        aria-label={i18n.table.pagination.previousAriaLabel}
        color={ButtonColor.secondary}
        disabled={page <= 0}
        icon={<ArrowLeft2Icon />}
        isInverse={isInverse}
        onClick={handlePreviousClick}
        testId="previousBtn"
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label={i18n.table.pagination.nextAriaLabel}
        color={ButtonColor.secondary}
        disabled={isLastPage}
        icon={<ArrowRight2Icon />}
        isInverse={isInverse}
        onClick={handleNextClick}
        testId="nextBtn"
        variant={ButtonVariant.link}
      />
    </StyledContainer>
  );
});
