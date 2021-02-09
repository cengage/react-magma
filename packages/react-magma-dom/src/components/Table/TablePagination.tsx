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
  count: number;
  isInverse?: boolean;
  page?: number;
  rowsPerPage?: number;
  testId?: string;
}

const StyledContainer = styled.div<{
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
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
    page = 1,
    rowsPerPage = 10,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const selectContainerStyle = { display: 'flex', alignItems: 'center' };

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
      />

      <PageCount isInverse={isInverse} theme={theme}>
        {`${page}-${rowsPerPage} ${i18n.table.pagination.ofLabel} ${count}`}
      </PageCount>

      <IconButton
        aria-label={i18n.table.pagination.previousAriaLabel}
        color={ButtonColor.secondary}
        icon={<ArrowLeft2Icon />}
        isInverse={isInverse}
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label={i18n.table.pagination.nextAriaLabel}
        color={ButtonColor.secondary}
        icon={<ArrowRight2Icon />}
        isInverse={isInverse}
        variant={ButtonVariant.link}
      />
    </StyledContainer>
  );
});
