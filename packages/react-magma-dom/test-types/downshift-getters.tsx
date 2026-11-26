import * as React from 'react';

import { ComboboxInput } from '../dist/components/Combobox/ComboboxInput';
import { ItemsList } from '../dist/components/Select/ItemsList';
import { SelectContainer } from '../dist/components/Select/SelectContainer';
import { SelectTriggerButton } from '../dist/components/Select/SelectTriggerButton';
import { useCombobox } from '../dist/utils/downshift';

type Item = { id: number; text: string };

declare const input: React.ComponentProps<typeof ComboboxInput<Item>>;
declare const menu: React.ComponentProps<typeof ItemsList<Item>>;
declare const container: React.ComponentProps<typeof SelectContainer<Item>>;
declare const trigger: React.ComponentProps<typeof SelectTriggerButton<Item>>;
declare const inputEvent: React.KeyboardEvent<HTMLInputElement>;

const inputResult = input.getInputProps({ 'data-probe': 42 });
export const inputValue: string = inputResult.value;
export const inputAttribute: number = inputResult['data-probe'];
// @ts-expect-error Getter values must not degrade to any.
export const invalidInputValue: number = inputResult.value;
// @ts-expect-error Custom attributes retain their inferred type.
export const invalidInputAttribute: string = inputResult['data-probe'];

input.getInputProps(
  {
    ref: React.createRef<HTMLInputElement>(),
    refKey: 'inputRef',
    onKeyDown: event => {
      const value: string = event.currentTarget.value;
      void value;
      // @ts-expect-error Input values are strings.
      const invalid: number = event.currentTarget.value;
      void invalid;
    },
  },
  { suppressRefError: true }
);
// @ts-expect-error An input getter cannot receive a textarea ref.
input.getInputProps({ ref: React.createRef<HTMLTextAreaElement>() });

const toggleResult = input.getToggleButtonProps({ 'data-probe': 'toggle' });
export const expanded: boolean = toggleResult['aria-expanded'];
export const toggleAttribute: string = toggleResult['data-probe'];
// @ts-expect-error Getter ARIA state must not degrade to any.
export const invalidExpanded: number = toggleResult['aria-expanded'];

const itemResult = menu.getItemProps({
  item: { id: 1, text: 'Red' },
  index: 0,
  'data-probe': 42,
});
export const itemRole: 'option' = itemResult.role;
export const itemAttribute: number = itemResult['data-probe'];
// @ts-expect-error Item getter returns a boolean selection state.
export const invalidSelected: string = itemResult['aria-selected'];
// @ts-expect-error Internal item data is consumed, not returned as a DOM prop.
itemResult.item;
// @ts-expect-error The item getter retains its component's item shape.
menu.getItemProps({ item: { id: 'wrong', text: 'Red' } });

const menuResult = menu.getMenuProps({ 'data-probe': 'menu' });
menu.getMenuProps({ refKey: 'menuRef' }, { suppressRefError: true });
export const menuRole: 'listbox' = menuResult.role;
export const menuAttribute: string = menuResult['data-probe'];
// @ts-expect-error Menu ids must not degrade to any.
export const invalidMenuId: number = menuResult.id;

const labelResult = container.getLabelProps();
export const labelId: string = labelResult.id;
export const labelTarget: string = labelResult.htmlFor;
// @ts-expect-error Label targets must not degrade to any.
export const invalidLabelTarget: number = labelResult.htmlFor;
const triggerState = trigger.toggleButtonProps['aria-expanded'];
// @ts-expect-error Toggle-button state must not degrade to any.
export const invalidTriggerState: string = triggerState;

input.onInputKeyDown?.(inputEvent);
const onInputKeyDown: NonNullable<typeof input.onInputKeyDown> = event => {
  const value: string = event.currentTarget.value;
  void value;
  // @ts-expect-error The input keyboard callback has an input-specific target.
  event.currentTarget.rows;
};
void onInputKeyDown;

const hook = useCombobox<Item>({ items: [{ id: 1, text: 'Red' }] });
const adaptedInput = hook.getInputProps({ 'data-probe': 42 });
export const adaptedAttribute: number = adaptedInput['data-probe'];
// @ts-expect-error The adapter keeps generic attributes when composing handlers.
export const invalidAdaptedAttribute: string = adaptedInput['data-probe'];
// @ts-expect-error The adapter does not accept handlers with an unrelated event.
hook.getInputProps({ onKeyDown: (event: React.MouseEvent) => void event });
