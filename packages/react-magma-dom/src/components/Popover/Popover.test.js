import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterAltIcon } from 'react-magma-icons';

import { PopoverPosition } from './Popover';
import { PopoverHeader, PopoverFooter } from './PopoverSection';
import { Button } from '../Button';

import { Popover, PopoverContent, PopoverTrigger } from '.';

describe('Popover', () => {
  it('should find element by testId', () => {
    const popoverTestId = 'popover-test-id';
    const triggerTestId = 'trigger-test-id';
    const contentTestId = 'content-test-id';

    const { getByTestId } = render(
      <Popover testId={popoverTestId}>
        <PopoverTrigger testId={triggerTestId} />
        <PopoverContent testId={contentTestId}>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );

    expect(getByTestId(popoverTestId)).toBeInTheDocument();
    expect(getByTestId(triggerTestId)).toBeInTheDocument();
    expect(getByTestId(contentTestId)).toBeInTheDocument();
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

  it('should render the popover with custom icon on trigger', () => {
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

  it('should render the popover with custom text on trigger', () => {
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
      <Popover focusTrap>
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

    userEvent.tab();

    expect(popoverContent.querySelector('button')).toHaveFocus();

    userEvent.keyboard('{esc}');

    expect(popoverContent).not.toBeVisible();
  });

  it('should close the popover on tab if there is no focusable items in the popover', async () => {
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

  it('should render the popover component with pointer, positioned bottom by default', () => {
    const { getByTestId, container } = render(
      <Popover hasPointer>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    userEvent.click(popoverTrigger);

    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toBeVisible();

    const popoverArrow = getByTestId('popoverArrow');

    expect(popoverArrow).toHaveAttribute('data-popover-placement', 'bottom');
  });

  it('should render the popover component with pointer, positioned top', () => {
    const { getByTestId, container } = render(
      <Popover hasPointer position={PopoverPosition.top}>
        <PopoverTrigger />
        <PopoverContent>
          <span>Content</span>
        </PopoverContent>
      </Popover>
    );
    const popoverTrigger = container.querySelector('button');

    userEvent.click(popoverTrigger);

    const popoverContent = getByTestId('popoverContent');

    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toBeVisible();

    const popoverArrow = getByTestId('popoverArrow');

    expect(popoverArrow).toHaveAttribute('data-popover-placement', 'top');
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

  it('should render the popover with auto width by default', () => {
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

  it('should render the popover with fixed width', () => {
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

  it('should render the popover with target width', () => {
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

  it('should render the popover with header and footer', () => {
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

  it('should render the popover with max height', () => {
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

  it('should render the popover with pointer by default', () => {
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

  it('should render the popover without pointer', () => {
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

  it('should open popover manually on span with api ref', async () => {
    const triggerTestId = 'trigger-test-id';
    const popoverContentTestId = 'popover-content-test-id';
    const popoverApiRef = React.createRef();

    function handleOpenPopover(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        popoverApiRef.current?.openPopoverManually(event);
      }
    }

    const { getByTestId, getByText } = render(
      <Popover apiRef={popoverApiRef}>
        <PopoverTrigger>
          <span
            tabIndex={0}
            role="button"
            onKeyDown={handleOpenPopover}
            data-testid={triggerTestId}
          >
            Press Enter or Space to open popover
          </span>
        </PopoverTrigger>
        <PopoverContent testId={popoverContentTestId}>
          <PopoverHeader>
            <div>Popover Header</div>
          </PopoverHeader>
          <div>Popover Content</div>
        </PopoverContent>
      </Popover>
    );
    const popoverContent = getByTestId(popoverContentTestId);
    const triggerButton = getByTestId(triggerTestId);
    const openButton = getByText('Press Enter or Space to open popover');

    expect(triggerButton).toBeInTheDocument();
    expect(openButton).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();

    await act(async () => {
      triggerButton.focus();
      userEvent.keyboard('{Enter}');
    });

    expect(popoverContent).toBeVisible();
    expect(getByText('Popover Header')).toBeVisible();
    expect(getByText('Popover Content')).toBeVisible();
  });

  it('should open popover by default if openByDefault property was passed', () => {
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

  it('should render the popover with isInverse prop', () => {
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
