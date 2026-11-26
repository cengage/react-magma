/*
The MIT License (MIT)
Copyright (c) 2017 PayPal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Relevant frozen published 5.4.7 declarations; do not adapt them to the implementation.
export interface Environment {
  addEventListener: typeof window.addEventListener;
  removeEventListener: typeof window.removeEventListener;
  document: Document;
}

export interface A11yStatusMessageOptions<Item> {
  highlightedIndex: number | null;
  inputValue: string;
  isOpen: boolean;
  itemToString: (item: Item) => string;
  previousResultCount: number;
  resultCount: number;
  highlightedItem: Item;
  selectedItem: Item;
}

export interface A11yRemovalMessage<Item> {
  itemToString: (item: Item) => string;
  resultCount: number;
  activeSelectedItem: Item;
  removedSelectedItem: Item;
  activeIndex: number;
}

export interface UseSelectState<Item> {
  highlightedIndex: number;
  selectedItem: Item;
  isOpen: boolean;
  keySoFar: string;
}

export enum UseSelectStateChangeTypes {
  MenuKeyDownArrowDown = '__menu_keydown_arrow_down__',
  MenuKeyDownArrowUp = '__menu_keydown_arrow_up__',
  MenuKeyDownEscape = '__menu_keydown_escape__',
  MenuKeyDownHome = '__menu_keydown_home__',
  MenuKeyDownEnd = '__menu_keydown_end__',
  MenuKeyDownEnter = '__menu_keydown_enter__',
  MenuKeyDownSpaceButton = '__menu_keydown_space_button__',
  MenuKeyDownCharacter = '__menu_keydown_character__',
  MenuBlur = '__menu_blur__',
  MenuMouseLeave = '__menu_mouse_leave__',
  ItemMouseMove = '__item_mouse_move__',
  ItemClick = '__item_click__',
  ToggleButtonKeyDownCharacter = '__togglebutton_keydown_character__',
  ToggleButtonKeyDownArrowDown = '__togglebutton_keydown_arrow_down__',
  ToggleButtonKeyDownArrowUp = '__togglebutton_keydown_arrow_up__',
  ToggleButtonClick = '__togglebutton_click__',
  FunctionToggleMenu = '__function_toggle_menu__',
  FunctionOpenMenu = '__function_open_menu__',
  FunctionCloseMenu = '__function_close_menu__',
  FunctionSetHighlightedIndex = '__function_set_highlighted_index__',
  FunctionSelectItem = '__function_select_item__',
  FunctionSetInputValue = '__function_set_input_value__',
  FunctionReset = '__function_reset__',
}

export interface UseSelectProps<Item> {
  items: Item[];
  itemToString?: (item: Item) => string;
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  getA11ySelectionMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  circularNavigation?: boolean;
  highlightedIndex?: number;
  initialHighlightedIndex?: number;
  defaultHighlightedIndex?: number;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  defaultIsOpen?: boolean;
  selectedItem?: Item;
  initialSelectedItem?: Item;
  defaultSelectedItem?: Item;
  id?: string;
  labelId?: string;
  menuId?: string;
  toggleButtonId?: string;
  getItemId?: (index: number) => string;
  scrollIntoView?: (node: HTMLElement, menuNode: HTMLElement) => void;
  stateReducer?: (
    state: UseSelectState<Item>,
    actionAndChanges: UseSelectStateChangeOptions<Item>
  ) => UseSelectState<Item>;
  onSelectedItemChange?: (changes: Partial<UseSelectState<Item>>) => void;
  onIsOpenChange?: (changes: Partial<UseSelectState<Item>>) => void;
  onHighlightedIndexChange?: (changes: Partial<UseSelectState<Item>>) => void;
  onStateChange?: (changes: Partial<UseSelectState<Item>>) => void;
  environment?: Environment;
}

export interface UseSelectStateChangeOptions<Item> {
  type: UseSelectStateChangeTypes;
  changes: UseSelectState<Item>;
  props: UseSelectProps<Item>;
}

export interface UseComboboxState<Item> {
  highlightedIndex: number;
  selectedItem: Item;
  isOpen: boolean;
  inputValue: string;
}

export enum UseComboboxStateChangeTypes {
  InputKeyDownArrowDown = '__input_keydown_arrow_down__',
  InputKeyDownArrowUp = '__input_keydown_arrow_up__',
  InputKeyDownEscape = '__input_keydown_escape__',
  InputKeyDownHome = '__input_keydown_home__',
  InputKeyDownEnd = '__input_keydown_end__',
  InputKeyDownEnter = '__input_keydown_enter__',
  InputChange = '__input_change__',
  InputBlur = '__input_blur__',
  MenuMouseLeave = '__menu_mouse_leave__',
  ItemMouseMove = '__item_mouse_move__',
  ItemClick = '__item_click__',
  ToggleButtonClick = '__togglebutton_click__',
  FunctionToggleMenu = '__function_toggle_menu__',
  FunctionOpenMenu = '__function_open_menu__',
  FunctionCloseMenu = '__function_close_menu__',
  FunctionSetHighlightedIndex = '__function_set_highlighted_index__',
  FunctionSelectItem = '__function_select_item__',
  FunctionSetInputValue = '__function_set_input_value__',
  FunctionReset = '__function_reset__',
  ControlledPropUpdatedSelectedItem = '__controlled_prop_updated_selected_item__',
}

export interface UseComboboxProps<Item> {
  items: Item[];
  itemToString?: (item: Item) => string;
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  getA11ySelectionMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  circularNavigation?: boolean;
  highlightedIndex?: number;
  initialHighlightedIndex?: number;
  defaultHighlightedIndex?: number;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  defaultIsOpen?: boolean;
  selectedItem?: Item;
  initialSelectedItem?: Item;
  defaultSelectedItem?: Item;
  inputValue?: string;
  initialInputValue?: string;
  defaultInputValue?: string;
  id?: string;
  labelId?: string;
  menuId?: string;
  toggleButtonId?: string;
  inputId?: string;
  getItemId?: (index: number) => string;
  scrollIntoView?: (node: HTMLElement, menuNode: HTMLElement) => void;
  stateReducer?: (
    state: UseComboboxState<Item>,
    actionAndChanges: UseComboboxStateChangeOptions<Item>
  ) => UseComboboxState<Item>;
  onSelectedItemChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onIsOpenChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onHighlightedIndexChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onStateChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onInputValueChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  environment?: Environment;
}

export interface UseComboboxStateChangeOptions<Item> {
  type: UseComboboxStateChangeTypes;
  changes: UseComboboxState<Item>;
  props: UseComboboxProps<Item>;
}

export interface UseMultipleSelectionState<Item> {
  selectedItems: Item[];
  activeIndex: number;
}

export enum UseMultipleSelectionStateChangeTypes {
  SelectedItemClick = '__selected_item_click__',
  SelectedItemKeyDownDelete = '__selected_item_keydown_delete__',
  SelectedItemKeyDownBackspace = '__selected_item_keydown_backspace__',
  SelectedItemKeyDownNavigationNext = '__selected_item_keydown_navigation_next__',
  SelectedItemKeyDownNavigationPrevious = '__selected_item_keydown_navigation_previous__',
  DropdownKeyDownNavigationPrevious = '__dropdown_keydown_navigation_previous__',
  DropdownKeyDownBackspace = '__dropdown_keydown_backspace__',
  DropdownClick = '__dropdown_click__',
  FunctionAddSelectedItem = '__function_add_selected_item__',
  FunctionRemoveSelectedItem = '__function_remove_selected_item__',
  FunctionSetSelectedItems = '__function_set_selected_items__',
  FunctionSetActiveIndex = '__function_set_active_index__',
  FunctionReset = '__function_reset__',
}

export interface UseMultipleSelectionProps<Item> {
  selectedItems?: Item[];
  initialSelectedItems?: Item[];
  defaultSelectedItems?: Item[];
  itemToString?: (item: Item) => string;
  getA11yRemovalMessage?: (options: A11yRemovalMessage<Item>) => string;
  stateReducer?: (
    state: UseMultipleSelectionState<Item>,
    actionAndChanges: UseMultipleSelectionStateChangeOptions<Item>
  ) => UseMultipleSelectionState<Item>;
  activeIndex?: number;
  initialActiveIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (
    changes: UseMultipleSelectionStateChange<Item>
  ) => void;
  onSelectedItemsChange?: (
    changes: UseMultipleSelectionStateChange<Item>
  ) => void;
  onStateChange?: (changes: UseMultipleSelectionStateChange<Item>) => void;
  keyNavigationNext?: string;
  keyNavigationPrevious?: string;
  environment?: Environment;
}

export interface UseMultipleSelectionStateChangeOptions<Item>
  extends UseMultipleSelectionDispatchAction {
  changes: Partial<UseMultipleSelectionState<Item>>;
}

export interface UseMultipleSelectionDispatchAction {
  type: UseMultipleSelectionStateChangeTypes;
  [data: string]: any;
}

export interface UseMultipleSelectionStateChange<Item>
  extends Partial<UseMultipleSelectionState<Item>> {
  type: UseMultipleSelectionStateChangeTypes;
}
