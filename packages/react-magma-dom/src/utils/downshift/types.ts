// Public compatibility contracts are owned by React Magma, not inferred from Downshift.
export interface Environment {
  addEventListener: typeof window.addEventListener;
  removeEventListener: typeof window.removeEventListener;
  document: Document;
}

export enum UseSelectStateChangeTypes {
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownArrowDown = '__menu_keydown_arrow_down__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownArrowUp = '__menu_keydown_arrow_up__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownEscape = '__menu_keydown_escape__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownHome = '__menu_keydown_home__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownEnd = '__menu_keydown_end__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownEnter = '__menu_keydown_enter__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownSpaceButton = '__menu_keydown_space_button__',
  /** @deprecated Use the corresponding ToggleButton event through modernType. Removed in a future major. */
  MenuKeyDownCharacter = '__menu_keydown_character__',
  /** @deprecated Use ToggleButtonBlur through modernType. Removed in a future major. */
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

export interface UseComboboxState<Item> {
  highlightedIndex: number;
  selectedItem: Item;
  isOpen: boolean;
  inputValue: string;
}
export interface UseSelectState<Item> {
  highlightedIndex: number;
  selectedItem: Item;
  isOpen: boolean;
  inputValue?: string;
  /** @deprecated Use inputValue. Removed in a future major. */
  keySoFar: string;
}
export interface SelectionState<Item> {
  highlightedIndex: number;
  selectedItem: Item | null;
  isOpen: boolean;
  inputValue: string;
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
export interface SelectionAction<Item> {
  type: string;
  changes: SelectionState<Item>;
  props: { items: Item[] };
  source?: 'outside';
}
interface CommonProps<Item> {
  items: Item[];
  selectionStateReducer?: (
    state: SelectionState<Item>,
    action: SelectionAction<Item>
  ) => Partial<SelectionState<Item>>;
  onSelectionStateChange?: (
    state: SelectionState<Item> & { type: string }
  ) => void;
  itemToString?: (item: Item) => string;
  itemToKey?: (item: Item | null) => unknown;
  isItemDisabled?: (item: Item, index: number) => boolean;
  /** @deprecated Use a11yStatusMessage. Removed in a future major. */
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  /** @deprecated Use a11yStatusMessage or an aria-live region. Removed in a future major. */
  getA11ySelectionMessage?: (options: A11yStatusMessageOptions<Item>) => string;
  a11yStatusMessage?: (state: SelectionState<Item>) => string;
  /** @deprecated Use navigationMode. Removed in a future major. */
  circularNavigation?: boolean;
  navigationMode?: 'circular' | 'bounded';
  highlightedIndex?: number;
  initialHighlightedIndex?: number;
  defaultHighlightedIndex?: number;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  defaultIsOpen?: boolean;
  selectedItem?: Item | null;
  initialSelectedItem?: Item | null;
  defaultSelectedItem?: Item | null;
  id?: string;
  labelId?: string;
  menuId?: string;
  toggleButtonId?: string;
  getItemId?: (index: number) => string;
  scrollIntoView?: (node: HTMLElement, menuNode: HTMLElement) => void;
  environment?: Environment;
  /** Receives the nullable selected item. Prefer this to the legacy callback. */
  onSelectionChange?: (selectedItem: Item | null) => void;
}
export interface UseSelectStateChange<Item>
  extends Partial<UseSelectState<Item>> {
  type: UseSelectStateChangeTypes;
  modernType?: string;
}
export interface UseComboboxStateChange<Item>
  extends Partial<UseComboboxState<Item>> {
  type: UseComboboxStateChangeTypes;
  modernType?: string;
}
export interface UseSelectStateChangeOptions<Item> {
  type: UseSelectStateChangeTypes;
  modernType?: string;
  changes: UseSelectState<Item>;
  props: LegacyUseSelectProps<Item>;
  source?: 'outside';
}
export interface UseComboboxStateChangeOptions<Item> {
  type: UseComboboxStateChangeTypes;
  modernType?: string;
  changes: UseComboboxState<Item>;
  props: LegacyUseComboboxProps<Item>;
  source?: 'outside';
}
export interface UseSelectProps<Item> extends CommonProps<Item> {
  /** @deprecated Use selectionStateReducer. Removed in a future major. */
  stateReducer?: (
    state: UseSelectState<Item>,
    action: UseSelectStateChangeOptions<Item>
  ) => Partial<UseSelectState<Item>>;
  /** @deprecated Use onSelectionChange. Removed in a future major. */
  onSelectedItemChange?: (changes: UseSelectStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onIsOpenChange?: (changes: UseSelectStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onHighlightedIndexChange?: (changes: UseSelectStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onStateChange?: (changes: UseSelectStateChange<Item>) => void;
}
export interface UseComboboxProps<Item> extends CommonProps<Item> {
  inputValue?: string;
  initialInputValue?: string;
  defaultInputValue?: string;
  inputId?: string;
  /** @deprecated Use selectionStateReducer. Removed in a future major. */
  stateReducer?: (
    state: UseComboboxState<Item>,
    action: UseComboboxStateChangeOptions<Item>
  ) => Partial<UseComboboxState<Item>>;
  /** @deprecated Use onSelectionChange. Removed in a future major. */
  onSelectedItemChange?: (changes: UseComboboxStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onIsOpenChange?: (changes: UseComboboxStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onHighlightedIndexChange?: (changes: UseComboboxStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onStateChange?: (changes: UseComboboxStateChange<Item>) => void;
  /** @deprecated Use onSelectionStateChange. Removed in a future major. */
  onInputValueChange?: (changes: UseComboboxStateChange<Item>) => void;
}
export interface UseMultipleSelectionState<Item> {
  selectedItems: Item[];
  activeIndex: number;
}
export interface UseMultipleSelectionStateChange<Item>
  extends Partial<UseMultipleSelectionState<Item>> {
  type: UseMultipleSelectionStateChangeTypes;
}
export interface UseMultipleSelectionStateChangeOptions<Item> {
  type: UseMultipleSelectionStateChangeTypes;
  changes: Partial<UseMultipleSelectionState<Item>>;
  props: UseMultipleSelectionProps<Item>;
  index?: number;
  selectedItem?: Item | null;
  selectedItems?: Item[];
  activeIndex?: number;
}
export interface UseMultipleSelectionProps<Item> {
  selectedItems?: Item[];
  initialSelectedItems?: Item[];
  defaultSelectedItems?: Item[];
  itemToString?: (item: Item) => string;
  itemToKey?: (item: Item | null) => unknown;
  /** @deprecated Use multipleA11yStatusMessage or an aria-live region. Removed in a future major. */
  getA11yRemovalMessage?: (options: A11yRemovalMessage<Item>) => string;
  multipleA11yStatusMessage?: (
    state: UseMultipleSelectionState<Item>
  ) => string;
  stateReducer?: (
    state: UseMultipleSelectionState<Item>,
    action: UseMultipleSelectionStateChangeOptions<Item>
  ) => Partial<UseMultipleSelectionState<Item>>;
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

export interface LegacyUseSelectProps<Item> {
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

export interface LegacyUseComboboxProps<Item> {
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
