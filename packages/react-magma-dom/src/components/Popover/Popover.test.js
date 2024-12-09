import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '.';
import { act, render } from '@testing-library/react';

describe('Popover', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Popover testId={testId}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the popover component, positioned bottom by default', async () => {
    const testId = 'test-id';

    const { container, getByText, getByTestId } = render(
      <Popover testId={testId}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();

    await act(async () => {
      popoverTrigger.click();
    });

    const popoverContent = getByTestId('popoverContent');
    const popoverContentDialog = container.querySelector('div[role="dialog"]');
    const spanContent = getByText('Content');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContentDialog).toBeInTheDocument();
    expect(spanContent).toBeInTheDocument();

    expect(popoverContent).toHaveAttribute('data-popover-placement', 'bottom');
    expect(popoverContent).toMatchSnapshot();
  });
});
