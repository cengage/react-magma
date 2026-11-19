import { findItemIndex, getSelectedItemIndexes, isSameItem } from './utils';

describe('isSameItem', () => {
  const labelToString = item =>
    item && typeof item === 'string' ? item : item ? item.label : '';

  it('should compare string items by their value', () => {
    expect(isSameItem('Red', 'Red', labelToString)).toBe(true);
    expect(isSameItem('Red', 'Blue', labelToString)).toBe(false);
  });

  it('should treat object items with the same label but different values as different items', () => {
    expect(
      isSameItem(
        { label: 'Red', value: 'red' },
        { label: 'Red', value: 'green' },
        labelToString
      )
    ).toBe(false);
  });

  it('should treat object items with the same label and value as the same item', () => {
    expect(
      isSameItem(
        { label: 'Red', value: 'red' },
        { label: 'Red', value: 'red', disabled: false },
        labelToString
      )
    ).toBe(true);
  });

  it('should treat object items with the same value but different labels as different items', () => {
    expect(
      isSameItem(
        { label: 'Red', value: 'red' },
        { label: 'Crimson', value: 'red' },
        labelToString
      )
    ).toBe(false);
  });

  it('should fall back to itemToString for items without a value', () => {
    const itemToString = item => (item ? item.representation : '');

    expect(
      isSameItem(
        { representation: 'Red', id: '1' },
        { representation: 'Red', id: '2' },
        itemToString
      )
    ).toBe(true);
    expect(
      isSameItem(
        { representation: 'Red' },
        { representation: 'Blue' },
        itemToString
      )
    ).toBe(false);
  });

  it('should not match empty items', () => {
    expect(isSameItem(null, { label: '', value: '' }, labelToString)).toBe(
      false
    );
    expect(isSameItem(undefined, 'Red', labelToString)).toBe(false);
  });
});

describe('findItemIndex', () => {
  const labelToString = item => (item ? item.label : '');
  const items = [
    { label: 'Red', value: 'red' },
    { label: 'Red', value: 'green' },
    { label: 'Blue', value: 1 },
  ];

  it('should prefer an exact match over a label match', () => {
    expect(
      findItemIndex(items, { label: 'Red', value: 'green' }, labelToString)
    ).toBe(1);
  });

  it('should fall back to a label match when no item matches exactly', () => {
    expect(
      findItemIndex(items, { label: 'Blue', value: '1' }, labelToString)
    ).toBe(2);
    expect(
      findItemIndex(
        [{ label: 'Red', value: { id: 1 } }],
        { label: 'Red', value: { id: 1 } },
        labelToString
      )
    ).toBe(0);
  });

  it('should return -1 when the item is not in the list', () => {
    expect(
      findItemIndex(items, { label: 'Yellow', value: 'yellow' }, labelToString)
    ).toBe(-1);
    expect(findItemIndex(items, null, labelToString)).toBe(-1);
  });
});

describe('getSelectedItemIndexes', () => {
  const labelToString = item => (item ? item.label : '');
  const items = [
    { label: 'Red', value: 1 },
    { label: 'Red', value: 2 },
    { label: 'Blue', value: 3 },
  ];

  it('should resolve each selected item to a single index', () => {
    expect([
      ...getSelectedItemIndexes(
        items,
        [{ label: 'Red', value: 2 }],
        labelToString
      ),
    ]).toEqual([1]);
  });

  it('should not let a label fallback claim an exactly matched item', () => {
    expect([
      ...getSelectedItemIndexes(
        items,
        [
          { label: 'Red', value: '1' },
          { label: 'Red', value: 1 },
        ],
        labelToString
      ),
    ]).toEqual([0, 1]);
  });
});
