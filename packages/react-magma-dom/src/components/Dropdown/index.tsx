import * as React from 'react';
import styled from '../../theme/styled';
import { Button } from '../Button';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: any;
  testId?: string;
}

const Container = styled.div`
  position: relative;
`;

const StyledCard = styled(Card)<{ isOpen?: boolean }>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 150px;
`;

export const Dropdown: React.FunctionComponent<
  DropdownProps
> = React.forwardRef(
  ({ children, testId, ...other }: DropdownProps, ref: any) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    return (
      <Container {...other} ref={ref} data-testid={testId}>
        <Button onClick={toggleDropdown}>Toggle me</Button>
        <StyledCard testId="dropdownMenu" isOpen={isOpen}>
          <CardBody>{children}</CardBody>
        </StyledCard>
      </Container>
    );
  }
);
