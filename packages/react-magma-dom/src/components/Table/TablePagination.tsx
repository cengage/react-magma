import * as React from 'react';
import { IconButton } from '../IconButton';
import { ButtonColor, ButtonVariant } from '../Button';
import { Select } from '../Select';
import { ArrowRightIcon, ArrowLeftIcon } from 'react-magma-icons';
import { Label } from '../Label';
import styled from '@emotion/styled';

export interface TablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

export const TablePagination = React.forwardRef<
  HTMLDivElement,
  TablePaginationProps
>((props, ref) => {
  const { testId, ...other } = props;

  const selectContainerStyle = { display: 'flex', alignItems: 'center' };
  const labelStyle = { marginRight: '12px' };

  return (
    <StyledContainer {...other} ref={ref} data-testid={testId}>
      <Select
        containerStyle={selectContainerStyle}
        name="pagination"
        labelStyle={labelStyle}
        labelText="Rows per page:"
        items={[
          { label: '10', value: '10' },
          { label: '20', value: '20' },
          { label: '50', value: '50' },
          { label: '100', value: '100' },
        ]}
      />

      <Label>10-10 of 100</Label>

      <IconButton
        aria-label="Previous"
        color={ButtonColor.secondary}
        icon={<ArrowLeftIcon />}
        variant={ButtonVariant.link}
      />
      <IconButton
        aria-label="Next"
        color={ButtonColor.secondary}
        icon={<ArrowRightIcon />}
        variant={ButtonVariant.link}
      />
    </StyledContainer>
  );
});
