import React from 'react';

import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { HelpIcon } from 'react-magma-icons';

import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { LabelPosition } from '../Label';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';

import { Select } from '.';
import userEvent from '@testing-library/user-event';

describe('Select', () => {
  const labelText = 'Label';
  const items = ['Red', 'Blue', 'Green'];

  it('should render a select with items', async () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    await userEvent.click(renderedSelect);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should render a select with a passed in placeholder', async () => {
    const placeholder = 'Test';

    const { getByText } = render(
      <Select labelText={labelText} items={items} placeholder={placeholder} />
    );

    await waitFor(() => {
      expect(getByText(placeholder)).toBeInTheDocument();
    });
  });

  it('should render a select with the default i18n placeholder', async () => {
    const { getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    await waitFor(() => {
      expect(getByText(defaultI18n.select.placeholder)).toBeInTheDocument();
    });
  });

  it('should accept items in the default object format', async () => {
    const items = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ];

    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    await userEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
  });

  it('should accept items in a custom item format', async () => {
    function itemToString(item) {
      return item ? item.representation : '';
    }

    const items = [
      {
        id: 1,
        actual: 'red',
        representation: 'Red',
      },
      {
        id: 2,
        actual: 'blue',
        representation: 'Blue',
      },
      {
        id: 3,
        actual: 'green',
        representation: 'Green',
      },
    ];

    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} itemToString={itemToString} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    await userEvent.click(renderedSelect);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render an items list with the default max height', async () => {
    const { container, getByLabelText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', async () => {
    const maxHeight = '100px';

    const { container, getByLabelText } = render(
      <Select
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('should render an items list with the passed in max height as a number', async () => {
    const maxHeight = 50;

    const { container, getByLabelText } = render(
      <Select
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      `${maxHeight}px`
    );
  });

  it('should render custom item component', async () => {
    const items = [
      { id: '0', label: 'Red', value: 'red' },
      { id: '1', label: 'Blue', value: 'blue' },
      { id: '2', label: 'Green', value: 'green' },
    ];

    const CustomItem = props => {
      const { itemRef, item, itemString } = props;

      return (
        <li data-testid={item.id} ref={itemRef}>
          {itemString}
        </li>
      );
    };

    const { getByLabelText, getByText, getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        components={{ Item: CustomItem }}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await userEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should not select an item when typing and select is closed', async () => {
    const { getByLabelText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('r');

    expect(getByTestId('selectedItemText').textContent).not.toEqual(items[0]);
  });

  it('should allow for selection of an item', async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[0]));

    expect(getByTestId('selectedItemText').textContent).toEqual(items[0]);
  });

  it('should call the passed in onIsOpenChange function on select open', async () => {
    const onIsOpenChange = jest.fn();

    const { getByLabelText } = render(
      <Select
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for a controlled select', async () => {
    let selectedItem = 'Red';

    const { getByLabelText, getByText, getByTestId, rerender } = render(
      <Select
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    await userEvent.click(getByLabelText(labelText, { selector: 'div' }));
    await userEvent.click(getByText(items[1]));

    expect(selectedItem).toEqual(items[1]);

    rerender(
      <Select
        labelText={labelText}
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={changes => (selectedItem = changes.selectedItem)}
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual(items[1]);
  });

  it('should have an initial selected item', async () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    await waitFor(() => {
      expect(getByTestId('selectedItemText').textContent).toEqual('Red');
    });
  });

  it('should not select an item that is not in the items list', async () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} selectedItem="Pink" />
    );

    await waitFor(() => {
      expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
    });
  });

  it('should not use the initial selected item if it is not in the items list', async () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Pink" />
    );

    await waitFor(() => {
      expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
    });
  });

  it('should disable the select', async () => {
    const { getByLabelText } = render(
      <Select labelText={labelText} items={items} disabled />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    await waitFor(() => {
      expect(renderedSelect).toHaveAttribute('disabled');
    });
  });

  it('should allow a selection to be cleared', async () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    await userEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Red');
    expect(getByTestId('selectTriggerButton')).toHaveFocus();
  });

  it('should select the default selected item when cleared', async () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Blue"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    await userEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).toEqual('Blue');
  });

  it('should not select the default selected item when cleared if it is not in the items list', async () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        defaultSelectedItem="Pink"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    await userEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should open select when clicking the enter key', async () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('{Enter}');

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should open select when clicking the spacebar', async () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard(' ');

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should close the menu when escape key is pressed, and retain the active modal', async () => {
    const { getByLabelText, getByText, getByTestId, queryByText } = render(
      <Modal testId="modal" isOpen>
        <Select labelText={labelText} items={items} />
      </Modal>
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard(' ');

    expect(getByText(items[0])).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    expect(queryByText(items[0], { selector: 'Red' })).not.toBeInTheDocument();
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should not open select when clicking another key other than the enter or spacebar', async () => {
    const { getByLabelText, queryByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    act(() => {
      renderedSelect.focus();
    });

    await userEvent.keyboard('a');

    expect(queryByText(items[0])).not.toBeInTheDocument();
  });

  it('should show an error message', async () => {
    const errorMessage = 'This is an error';

    const { getByText } = render(
      <Select labelText={labelText} items={items} errorMessage={errorMessage} />
    );

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show an helper message', async () => {
    const helperMessage = 'This is an error';

    const { getByText } = render(
      <Select
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    await waitFor(() => {
      expect(getByText(helperMessage)).toBeInTheDocument();
    });
  });

  it('should show a left aligned label', async () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        labelPosition={LabelPosition.left}
      />
    );

    await waitFor(() => {
      expect(getByTestId('selectContainerElement')).toHaveStyleRule(
        'display',
        'flex'
      );
    });
  });

  it('Should have a defined width for label when labelPosition is "left"', async () => {
    const { getByText } = render(
      <Select
        items={items}
        labelPosition={LabelPosition.left}
        labelText={labelText}
        labelWidth={20}
      />
    );

    await waitFor(() => {
      expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
    });
  });

  it('should allow you to send in your own components', async () => {
    const ClearIndicator = () => (
      <button data-testid="customClearIndicator">Clear</button>
    );

    const { getByTestId } = render(
      <Select
        labelText={labelText}
        isClearable
        items={items}
        selectedItem={items[0]}
        components={{
          ClearIndicator,
        }}
      />
    );

    await waitFor(() => {
      expect(getByTestId('customClearIndicator')).toBeInTheDocument();
    });
  });

  describe('additional content', () => {
    const helpLinkLabel = 'Learn more';

    const onHelpLinkClick = () => {
      alert('Help link clicked!');
    };

    it('Should accept additional content', async () => {
      const { getByTestId } = render(
        <Select
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                testId={'Icon Button'}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
          labelText={labelText}
          items={items}
        />
      );

      await waitFor(() => {
        expect(getByTestId('Icon Button')).toBeInTheDocument();
      });
    });

    it('Should accept additional content to the right of the multi-select label', async () => {
      const { getByTestId } = render(
        <Select
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                testId={'Icon Button'}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
          labelText={labelText}
          isMulti
          items={items}
        />
      );

      await waitFor(() => {
        expect(getByTestId('Icon Button')).toBeInTheDocument();
      });
    });

    it('When label position is left, should accept additional content to display inline with the label and select', async () => {
      const { getByTestId } = render(
        <Select
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
          labelPosition={LabelPosition.left}
          labelText={labelText}
          items={items}
          data-testid="selectContainerElement"
        />
      );

      await waitFor(() => {
        expect(getByTestId('selectContainerElement')).toBeInTheDocument();
        expect(getByTestId('selectContainerElement')).toHaveStyleRule(
          'display',
          'flex'
        );
      });
    });

    it('When label position is left and isLabelVisuallyHidden is true, should accept additional content to display along select with a visually hidden label', async () => {
      const { getByTestId, getByText } = render(
        <Select
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
          isLabelVisuallyHidden
          labelPosition={LabelPosition.left}
          labelText={labelText}
          items={items}
          data-testid="selectContainerElement"
        />
      );

      await waitFor(() => {
        expect(getByText(labelText)).toHaveStyleRule('height', '1px');
        expect(getByTestId('selectContainerElement')).toBeInTheDocument();
        expect(getByTestId('selectContainerElement')).toHaveStyleRule(
          'display',
          'flex'
        );
      });
    });

    it('Should handle disabled items', async () => {
      const items = [
        { label: 'Red', value: 'red', disabled: true },
        { label: 'Blue', value: 'blue', disabled: false },
        { label: 'Green', value: 'green' },
      ];

      const { getByLabelText, getByText } = render(
        <Select labelText={labelText} items={items} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      await userEvent.click(renderedSelect);

      expect(getByText('Red')).toHaveAttribute('aria-disabled', 'true');
      expect(getByText('Blue')).toHaveAttribute('aria-disabled', 'false');
      expect(getByText('Green')).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('events', () => {
    it('onBlur', async () => {
      const onBlur = jest.fn();

      const { findByLabelText } = render(
        <Select labelText={labelText} items={items} onBlur={onBlur} />
      );

      const renderedSelect = await findByLabelText(labelText, {
        selector: 'div',
      });

      act(() => {
        renderedSelect.focus();
        renderedSelect.blur();
      });

      expect(onBlur).toHaveBeenCalled();
    });

    it('onFocus', async () => {
      const onFocus = jest.fn();

      const { findByLabelText } = render(
        <Select labelText={labelText} items={items} onFocus={onFocus} />
      );

      const renderedSelect = await findByLabelText(labelText, {
        selector: 'div',
      });

      act(() => {
        renderedSelect.focus();
      });

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', async () => {
      const onKeyDown = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyDown={onKeyDown} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      act(() => {
        renderedSelect.focus();
      });

      await userEvent.keyboard('{Enter}');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', async () => {
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyUp={onKeyUp} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      act(() => {
        renderedSelect.focus();
      });

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard('{Enter}');

      expect(onKeyUp).toHaveBeenCalled();
    });
  });
});
