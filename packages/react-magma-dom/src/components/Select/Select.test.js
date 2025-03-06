import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import { HelpIcon } from 'react-magma-icons';

import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { LabelPosition } from '../Label';
import { Modal } from '../Modal';
import { Tooltip } from '../Tooltip';

import { Select } from '.';

describe('Select', () => {
  const labelText = 'Label';
  const items = ['Red', 'Blue', 'Green'];

  it('should render a select with items', () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toBeInTheDocument();

    fireEvent.click(renderedSelect);

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should render a select with a passed in placeholder', () => {
    const placeholder = 'Test';

    const { getByText } = render(
      <Select labelText={labelText} items={items} placeholder={placeholder} />
    );

    expect(getByText(placeholder)).toBeInTheDocument();
  });

  it('should render a select with the default i18n placeholder', () => {
    const { getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    expect(getByText(defaultI18n.select.placeholder)).toBeInTheDocument();
  });

  it('should accept items in the default object format', () => {
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

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
  });

  it('should accept items in a custom item format', () => {
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

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].representation)).toBeInTheDocument();
  });

  it('should render an items list with the default max height', () => {
    const { container, getByLabelText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      magma.select.menu.maxHeight
    );
  });

  it('should render an items list with the passed in max height as a string', () => {
    const maxHeight = '100px';
    const { container, getByLabelText } = render(
      <Select
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      maxHeight
    );
  });

  it('should render an items list with the passed in max height as a number', () => {
    const maxHeight = 50;
    const { container, getByLabelText } = render(
      <Select
        itemListMaxHeight={maxHeight}
        labelText={labelText}
        items={items}
      />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    fireEvent.click(renderedSelect);

    expect(container.querySelector('ul')).toHaveStyleRule(
      'max-height',
      `${maxHeight}px`
    );
  });

  it('should render custom item component', () => {
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

    fireEvent.click(renderedSelect);

    expect(getByText(items[0].label)).toBeInTheDocument();
    expect(getByTestId(items[0].id)).toBeInTheDocument();
  });

  it('should not select an item when typing and select is closed', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();

    const { getByLabelText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, { key: 'r' });

    act(() => jest.runAllTimers());

    expect(getByTestId('selectedItemText').textContent).not.toEqual(items[0]);

    jest.useRealTimers();
  });

  it('should allow for selection of an item', () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <Select labelText={labelText} items={items} />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[0]));

    expect(getByTestId('selectedItemText').textContent).toEqual(items[0]);
  });

  it('should call the passed in onIsOpenChange function on select open', () => {
    const onIsOpenChange = jest.fn();

    const { getByLabelText } = render(
      <Select
        labelText={labelText}
        items={items}
        onIsOpenChange={onIsOpenChange}
      />
    );

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    expect(onIsOpenChange).toHaveBeenCalled();
  });

  it('should allow for a controlled select', () => {
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

    fireEvent.click(getByLabelText(labelText, { selector: 'div' }));

    fireEvent.click(getByText(items[1]));

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

  it('should have an initial selected item', () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Red" />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');
  });

  it('should not select an item that is not in the items list', () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} selectedItem="Pink" />
    );

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should not use the initial selected item if it is not in the items list', () => {
    const { getByTestId } = render(
      <Select labelText={labelText} items={items} initialSelectedItem="Pink" />
    );

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should disable the select', () => {
    const { getByLabelText } = render(
      <Select labelText={labelText} items={items} disabled />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    expect(renderedSelect).toHaveAttribute('disabled');
  });

  it('should allow a selection to be cleared', () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        initialSelectedItem="Red"
        isClearable
      />
    );

    expect(getByTestId('selectedItemText').textContent).toEqual('Red');

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Red');

    expect(getByTestId('selectTriggerButton')).toHaveFocus();
  });

  it('should select the default selected item when cleared', () => {
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

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).toEqual('Blue');
  });

  it('should not select the default selected item when cleared if it is not in the items list', () => {
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

    fireEvent.click(getByTestId('clearIndicator'));

    expect(getByTestId('selectedItemText').textContent).not.toEqual('Pink');
  });

  it('should open select when clicking the enter key', () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: 'Enter',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should open select when clicking the spacebar', () => {
    const { getByLabelText, getByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: ' ',
    });

    expect(getByText(items[0])).toBeInTheDocument();
  });

  it('should close the menu when escape key is pressed, and retain the active modal', () => {
    const { getByLabelText, getByText, getByTestId, queryByText } = render(
      <Modal testId="modal" isOpen>
        <Select labelText={labelText} items={items} />
      </Modal>
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: ' ',
    });

    expect(getByText(items[0])).toBeInTheDocument();

    fireEvent.keyDown(getByLabelText(labelText, { selector: 'div' }), {
      key: 'Escape',
      code: 27,
    });

    expect(queryByText(items[0], { selector: 'Red' })).not.toBeInTheDocument();

    expect(getByTestId('modal')).toBeInTheDocument();
  });

  it('should not open select when clicking another key other than the enter or spacebar', () => {
    // Use fake timers here for downshift's debounce on input change.
    jest.useFakeTimers();

    const { getByLabelText, queryByText } = render(
      <Select labelText={labelText} items={items} />
    );

    const renderedSelect = getByLabelText(labelText, { selector: 'div' });

    renderedSelect.focus();

    fireEvent.keyDown(renderedSelect, {
      key: 'a',
    });

    act(() => jest.runAllTimers());

    expect(queryByText(items[0])).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should show an error message', () => {
    const errorMessage = 'This is an error';

    const { getByText } = render(
      <Select labelText={labelText} items={items} errorMessage={errorMessage} />
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should show an helper message', () => {
    const helperMessage = 'This is an error';

    const { getByText } = render(
      <Select
        labelText={labelText}
        items={items}
        helperMessage={helperMessage}
      />
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
  });

  it('should show a left aligned label', () => {
    const { getByTestId } = render(
      <Select
        labelText={labelText}
        items={items}
        labelPosition={LabelPosition.left}
      />
    );

    expect(getByTestId('selectContainerElement')).toHaveStyleRule(
      'display',
      'flex'
    );
  });

  it('Should have a defined width for label when labelPosition is "left"', () => {
    const { getByText } = render(
      <Select
        items={items}
        labelPosition={LabelPosition.left}
        labelText={labelText}
        labelWidth={20}
      />
    );
    expect(getByText(labelText)).toHaveStyle('flex-basis: 20%');
  });

  it('should allow you to send in your own components', () => {
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

    expect(getByTestId('customClearIndicator')).toBeInTheDocument();
  });

  describe('additional content', () => {
    const helpLinkLabel = 'Learn more';

    const onHelpLinkClick = () => {
      alert('Help link clicked!');
    };

    it('Should accept additional content', () => {
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

      expect(getByTestId('Icon Button')).toBeInTheDocument();
    });

    it('Should accept additional content to the right of the multi-select label', () => {
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

      expect(getByTestId('Icon Button')).toBeInTheDocument();
    });

    it('When label position is left, should accept additional content to display inline with the label and select', () => {
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

      expect(getByTestId('selectContainerElement')).toBeInTheDocument();
      expect(getByTestId('selectContainerElement')).toHaveStyleRule(
        'display',
        'flex'
      );
    });

    it('When label position is left and isLabelVisuallyHidden is true, should accept additional content to display along select with a visually hidden label', () => {
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

      expect(getByText(labelText)).toHaveStyleRule('height', '1px');

      expect(getByTestId('selectContainerElement')).toBeInTheDocument();
      expect(getByTestId('selectContainerElement')).toHaveStyleRule(
        'display',
        'flex'
      );
    });

    it('Should handle disabled items', () => {
      const items = [
        { label: 'Red', value: 'red', disabled: true },
        { label: 'Blue', value: 'blue', disabled: false },
        { label: 'Green', value: 'green' },
      ];
      const { getByLabelText, getByText } = render(
        <Select labelText={labelText} items={items} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });
      fireEvent.click(renderedSelect);

      expect(getByText('Red')).toHaveAttribute('aria-disabled', 'true');
      expect(getByText('Blue')).toHaveAttribute('aria-disabled', 'false');
      expect(getByText('Green')).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('events', () => {
    it('onBlur', () => {
      const onBlur = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onBlur={onBlur} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      fireEvent.blur(renderedSelect);

      expect(onBlur).toHaveBeenCalled();
    });

    it('onFocus', () => {
      const onFocus = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onFocus={onFocus} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      renderedSelect.focus();

      expect(onFocus).toHaveBeenCalled();
    });

    it('onKeyDown', () => {
      const onKeyDown = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyDown={onKeyDown} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyDown(renderedSelect, { key: 'Enter' });

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('onKeyUp', () => {
      const onKeyUp = jest.fn();

      const { getByLabelText } = render(
        <Select labelText={labelText} items={items} onKeyUp={onKeyUp} />
      );

      const renderedSelect = getByLabelText(labelText, { selector: 'div' });

      fireEvent.keyUp(renderedSelect, { key: 'Enter' });

      expect(onKeyUp).toHaveBeenCalled();
    });
  });
});
