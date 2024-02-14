import React from 'react';
import { axe } from '../../../axe-helper';
import { render } from '@testing-library/react';
import { TabScrollSpyPanel, TabsScrollSpyContainer } from '.';
import { AndroidIcon } from 'react-magma-icons';

const TEXT = 'Test Text';
const testId = 'test-id';

describe('TabsScrollSpyContainer', () => {
  it('Should find element by testId', () => {
    const { getByTestId } = render(<TabsScrollSpyContainer testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Tab Panels are compliant with accessibility', () => {
    const { container } = render(
      <TabsScrollSpyContainer aria-label="TabsScrollSpyContainer">
        {TEXT}
      </TabsScrollSpyContainer>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
