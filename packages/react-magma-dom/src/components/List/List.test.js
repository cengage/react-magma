import React from 'react';
import { axe } from 'jest-axe';
import { List, ListItem } from '.';
import { render } from '@testing-library/react';

const TEXT = 'Test Text';

describe('List', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(<List>{TEXT}</List>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<List testId={testId}>{TEXT}</List>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <List>
        <ListItem>{TEXT}</ListItem>
      </List>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
