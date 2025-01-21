import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '.';
import { act, render, waitFor } from '@testing-library/react';
import { PopoverPosition } from './Popover';
import userEvent from '@testing-library/user-event';
import { FilterAltIcon } from 'react-magma-icons';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { Button } from '../Button';

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

  it('should show an error message if there is no content', async () => {
    const { getByText, getByTestId } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent />
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');
    const errorMessage = getByText('Content must be passed');

    expect(popoverContent).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it('should be hidden before click on trigger', async () => {
    const { container, getByText, getByTestId } = render(
      <Popover position={PopoverPosition.top}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );

    const popoverTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    const popoverContent = getByTestId('popoverContent');

    const popoverContentDialog = container.querySelector('div[role="dialog"]');
    const spanContent = getByText('Content');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContentDialog).toBeInTheDocument();
    expect(spanContent).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();

    await act(async () => {
      popoverTrigger.click();
    });

    expect(popoverContent).toBeVisible();
    expect(popoverContentDialog).toBeVisible();
    expect(spanContent).toBeVisible();
  });

  it('should render the popover with custom icon on trigger', async () => {
    const triggerTestId = 'trigger-test-id';
    const { container, getByTestId } = render(
      <Popover>
        <PopoverTrigger icon={<FilterAltIcon testId={triggerTestId} />} />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');
    const customIcon = getByTestId(triggerTestId);

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(customIcon).toBeInTheDocument();
    expect(popoverTrigger).toContainElement(customIcon);
  });

  it('should render the popover with custom text on trigger', async () => {
    const triggerTestId = 'trigger-test-id';
    const customText = 'Custom Text';
    const { getByTestId } = render(
      <Popover>
        <PopoverTrigger testId={triggerTestId}>{customText}</PopoverTrigger>
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = getByTestId(triggerTestId);

    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverTrigger).toBeEnabled();
    expect(popoverTrigger).toHaveTextContent(customText);
  });

  it('should lock focus inside the popover', async () => {
    const { container, getByTestId } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');
    const popoverContent = getByTestId('popoverContent');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();

    await act(async () => {
      popoverTrigger.click();
    });

    expect(popoverContent).toBeVisible();
    const buttons = popoverContent.querySelectorAll('button');

    expect(buttons[0]).toHaveFocus();

    userEvent.tab();

    expect(buttons[0]).not.toHaveFocus();
    expect(buttons[1]).toHaveFocus();

    userEvent.tab();

    expect(buttons[1]).not.toHaveFocus();
    expect(buttons[2]).toHaveFocus();

    userEvent.tab();

    expect(buttons[2]).not.toHaveFocus();
    expect(buttons[0]).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(buttons[0]).not.toHaveFocus();
    expect(buttons[2]).toHaveFocus();
  });

  it('sholud close the popover on `Escape` button', async () => {
    const { container, getByTestId } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <button>Button 1</button>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');
    const popoverContent = getByTestId('popoverContent');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();

    await act(async () => {
      popoverTrigger.click();
    });

    expect(popoverContent).toBeVisible();
    expect(popoverContent.querySelector('button')).toHaveFocus();

    userEvent.keyboard('{esc}');

    expect(popoverContent).not.toBeVisible();
  });

  it('sholud close the popover on tab if there is no focusable items in the popover', async () => {
    const { container, getByTestId, getByText } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');
    const popoverContent = getByTestId('popoverContent');
    const spanContent = getByText('Content');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();
    expect(spanContent).not.toBeVisible();

    await act(async () => {
      popoverTrigger.click();
    });

    expect(popoverContent).toBeVisible();
    expect(spanContent).toBeVisible();

    userEvent.tab();

    expect(popoverContent).not.toBeVisible();
    expect(spanContent).not.toBeVisible();
  });

  it('should render the popover component, positioned bottom by default', async () => {
    const { getByTestId } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');
    expect(popoverContent).toBeInTheDocument();

    expect(popoverContent).toHaveAttribute('data-popover-placement', 'bottom');
  });

  it('should render the popover component with position top', async () => {
    const { getByTestId } = render(
      <Popover position={PopoverPosition.top}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');
    expect(popoverContent).toBeInTheDocument();

    expect(popoverContent).toHaveAttribute('data-popover-placement', 'top');
  });

  it('should open the popover on hover', async () => {
    const { container, getByText, getByTestId } = render(
      <Popover hoverable>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();

    const popoverContent = getByTestId('popoverContent');
    const popoverContentDialog = container.querySelector('div[role="dialog"]');
    const spanContent = getByText('Content');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContentDialog).toBeInTheDocument();
    expect(spanContent).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();

    await act(async () => {
      userEvent.hover(popoverTrigger);
    });

    expect(popoverContent).toBeVisible();
    expect(popoverContentDialog).toBeVisible();
    expect(spanContent).toBeVisible();

    await act(async () => {
      userEvent.unhover(popoverTrigger);
    });

    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();
  });

  it('should not open the popover on hover if it has focusable elements', async () => {
    const { container, getByText, getByTestId } = render(
      <Popover hoverable>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
          <button>Button</button>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();

    const popoverContent = getByTestId('popoverContent');
    const popoverContentDialog = container.querySelector('div[role="dialog"]');
    const spanContent = getByText('Content');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContentDialog).toBeInTheDocument();
    expect(spanContent).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();

    await act(async () => {
      userEvent.hover(popoverTrigger);
    });

    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();
  });

  it('should render the popover with disabled button', async () => {
    const { container, getByText, getByTestId } = render(
      <Popover isDisabled>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
          <button>Button</button>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    expect(container).toBeInTheDocument();
    expect(popoverTrigger).toBeInTheDocument();
    expect(popoverTrigger).toBeDisabled();

    const popoverContent = getByTestId('popoverContent');
    const popoverContentDialog = container.querySelector('div[role="dialog"]');
    const spanContent = getByText('Content');

    await act(async () => {
      popoverTrigger.click();
    });

    expect(popoverContent).not.toBeVisible();
    expect(popoverContentDialog).not.toBeVisible();
    expect(spanContent).not.toBeVisible();
  });

  it('should render the popover with auto width by default', async () => {
    const { getByTestId } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveAttribute('width', 'auto');
  });

  it('should render the popover with fixed width', async () => {
    const { getByTestId } = render(
      <Popover width={320}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveStyle('width: 320px');
  });

  it('should render the popover with target width', async () => {
    const { getByTestId } = render(
      <Popover id="popoverWithTargetWidth" width="target">
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toMatchSnapshot();
  });

  it('should render the popover with header and footer', async () => {
    const { getByTestId, getByText } = render(
      <Popover>
        <PopoverTrigger />
        <PopoverContent>
          <PopoverHeader>
            <span>Header</span>
          </PopoverHeader>
          <span>Content</span>
          <PopoverFooter>
            <span>Footer</span>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');
    const popoverHeader = getByText('Header');
    const popoverFooter = getByText('Footer');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverHeader).toBeInTheDocument();
    expect(popoverFooter).toBeInTheDocument();
    expect(popoverContent).toContainElement(popoverHeader);
    expect(popoverContent).toContainElement(popoverFooter);
  });

  it('should render the popover with max height', async () => {
    const { getByTestId } = render(
      <Popover maxHeight={300} width={100}>
        <PopoverTrigger />
        <PopoverContent>
          <PopoverHeader>
            <span>Header</span>
          </PopoverHeader>
          <span>
            Very Very Very Very Very Very Very Very Very Very Very Very Very
            Very Very Very Very Very Very Very Very Very Very Very Very Very
            Very Very Very Very Very Very Very Very Very Very Very Long Content
          </span>
          <PopoverFooter>
            <span>Footer</span>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveStyle('width: 100px');
    expect(popoverContent).toHaveStyle('max-height: 300px');
  });

  it('should render the popover with pointer by default', async () => {
    const { getByTestId } = render(
      <Popover id="popoverWithPointer">
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toMatchSnapshot();
  });

  it('should render the popover without pointer', async () => {
    const { getByTestId } = render(
      <Popover id="popoverWithoutPointer" hasPointer={false}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toMatchSnapshot();
  });

  it('should close popover manually on button with api ref', async () => {
    const triggerTestId = 'trigger-test-id';
    const closeButtonTestId = 'close-button-test-id';

    const popoverApiRef = React.createRef();

    const onClose = event => {
      popoverApiRef.current.closePopoverManually(event);
    };

    const { getByTestId } = render(
      <Popover apiRef={popoverApiRef}>
        <PopoverTrigger testId={triggerTestId} />
        <PopoverContent>
          <span>Content</span>
          <Button onClick={onClose} testId={closeButtonTestId}>
            Close Button
          </Button>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');
    const triggerButton = getByTestId(triggerTestId);
    const closeButton = getByTestId(closeButtonTestId);

    expect(popoverContent).toBeInTheDocument();
    expect(triggerButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    expect(popoverContent).not.toBeVisible();
    expect(closeButton).not.toBeVisible();

    await act(async () => {
      triggerButton.click();
    });

    expect(popoverContent).toBeVisible();
    expect(closeButton).toBeVisible();

    await act(async () => {
      closeButton.click();
    });

    expect(popoverContent).not.toBeVisible();
    expect(closeButton).not.toBeVisible();
  });

  it('should open popover by default if openByDefault property was passed', async () => {
    const { getByTestId } = render(
      <Popover openByDefault>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toBeVisible();
  });

  it('should render the popover with isInverse prop', async () => {
    const { getByTestId } = render(
      <Popover id="popoverWithInverseStyles" isInverse>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toMatchSnapshot();
  });
});
