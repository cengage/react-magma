## 3.5.0

### Minor Changes

- 3d00dcc7e: feat(SimplePagination): New PaginationType `simple` which changes the pages in Pagination from a series of individual buttons to a dropdown.

### Patch Changes

- c0a658b5a: fix(Button): Update button z-index when it's in focus to bring the focus outline to the front.
- 35a33a7ae: fix(combobox): Disabled Multi Combobox disables the buttons inside it.
- cca876b3a: fix(dropdown): Dropdowns without `DropdownMenuItem` will get focused on open.
  Fixes issue where these dropdowns could not be closed on Escape in Safari, and should be readable by screenreaders.
- 630bb5ab3: fix(Character Counter): Two new props have been added. The `hasCharacterCounter` prop which defaults to `true` and the `maxCount` prop which replaces `maxLength` and enables the Character Counter.

  In the interim if an input needs a native `maxlength` and not a Character Counter, set `hasCharacterCounter={false}` and then use `maxLength`.

  Please note that in the meantime, `maxLength` is still supported but will need to be changed to `maxCount` as future releases will remove `maxLength` and `hasCharacterCounter`.

- d0c69155a: fix(inputbase): Update icon/button position for inputs with two icons.
- 6f53d1891: fix(Modal): Added support for closing individual nested modals with escape key.
- 395aea21c: fix(Pagination): Spacing, Tooltip inverse state, and VoiceOver support fixes.
- 7066b5c84: fix(TablePagination): TablePagination component now respects theme border radius on bottom corners
- f487b936f: fix(alertbase): Update height for toasts in AlertBase
- 4a10f8905: fix(select): Fix Multi Select placeholder text alignment

## 3.4.0

**We accidentally skipped version 3.4.0. Please use 3.5.0 instead**

## 3.3.0

## Minor Changes

- 17fc12212: feat(Alert): New additionalContent prop to enable adding styled children within an Alert or Banner.
- 17fc12212: feat(toggleButton): New Toggle Button component.
- 17fc12212: (TablePagination, DataGrid) switch dropdown component in table pagination to native select
  Deprecations: dropdownDropDirection prop is now deprecated

## Patch Changes

- 17fc12212: Set fallback font-family for all components.
- 17fc12212: fix(character counter): Added value capability for Input and Textarea when using maxLength for an initial value.
- 17fc12212: chore: Fix broken build
- 17fc12212: chore: Fixed warnings in the console.
- 17fc12212: fix(inputbase): Add optional width prop for InputBase - this affects and can be used in Input, PasswordInput, and Search
- 17fc12212: fix(heading): Fix error that "Property 'css' is missing"
- 17fc12212: fix: Revert the change to hex values of secondaryColors (secondary500, secondary600 & secondary700)
- 17fc12212: fix(toggleButton): Fix hover states

## 3.2.1

### Patch Changes

- 0bf79d5de: style: fix linting errors and warnings
- 7b4549726: Update react-magma-icons version to 2.3.6
- 0d3e008bf: fix: Update hex of secondaryColors (secondary500, secondary600 & secondary700)
- 962253d56: fix(navtabs) Added focus state on first NavTab for accessibility fix.
- 6a01a5325: fix(input): Inputs with long placeholders && `isClearable` have appropriate padding
- fafe31580: fix(search): Search components with long placeholders && `isClearable` have appropriate padding
- f5189569b: fix(tabs): Disabled tabs have the disabled cursor

## 3.2.0

### Minor Changes

- 47015f38: feat(characterCounter): New Character Counter component.
- 15bdd2d0: fix(characterCounter): Added dynamic aria-live states for screen readers based on the amount of text in the input.
- 9daf9331: feat(combobox): `hasPersistentMenu` prop allows for the items list to stay visible after each selection on Multi Comboboxes
  fix(combobox): Placeholder on Multi Comboboxes now disappears when at least one item is selected
- eb9ed1f3: feat(input): Added left label position capability for Combobox, DatePicker, Input, NativeSelect, PasswordInput, Textarea, and TimePicker. An additional prop of labelWidth has also been implemented for use in a column of Inputs for styling purposes.
- 1893be73: feat(button): Subtle button

### Patch Changes

- 34c2957a: fix(combobox): Combobox items have a default `type="button"` to prevent issues when used inside a form.
- 85853eae: fix(MultiCombobox): Support for `isClearable` button for multi comboboxes. `isClearable` button supports `isInverse` for single and multi comboboxes.
  feat(combobox): Add `isTypeahead` prop to allow `selectedItems` items that are not in `items`.
  feat(combobod): Add `isLoading` prop to `ItemsList` to show a loading state
- 1110043a: fix(table): Add keyboard only focus to tables without a focusable element.
- 2fe13d60: docs(table): Storybook example with adjustable number of rows
- 95fc5ae7: chore(npm/node): Update versions

## 3.1.2

### Patch Changes

- 754c389b: fix(GlobalStyles): Fix default `a:hover` color to match Hyperlink
- ffa94511: fix(ButtonGroup): Add `flex-wrap: wrap` to ButtonGroup
- 9502d28a: fix(Input): Fix placement of `children` inside Input component (ex: help icon).
- 0de78513: build(deps): Bump react-magma-icons to 2.3.4
- 17ee57af: build: Update storybook packages to latest (6.4.12 -> 6.5.10)

## 3.1.1

### Patch Changes

- 663a334d: refactor(Input): Update Storybook example with a11y violations.
- 663a334d: fix(accordion): Accordion Item `buttonId` will be based on the index to avoid duplicate ids.
  refactor(accordion): Update Storybook example with a11y violations.
- 663a334d: refactor(appbar): Update Storybook example with a11y violations.
- 663a334d: fix(Native Select): Fixed dropdown caret which wasn't selecting the options on click.
- 663a334d: fix(Tabs): Removing unnecessary aria-label from wrapping div
- 663a334d: fix(datagrid): Add aria-label to sort by selectable button
- 663a334d: feat(datagrid): Add `isSortableBySelected` prop to DataGrid, allowing tables to be sorted by the selected items.
- 663a334d: fix(DatePicker): Fix support for non-default date formats (dd/mm/yyyy, yyyy/MM/dd, yyyy/dd/MM). Add support for MMMM d, yyyy.
- 663a334d: fix(input): Fix double focus on all input types (search, datepicker, password). When the icon is focused, only the icon will have visible focus and not the whole input.
- 663a334d: refactor(indeterminatecheckbox): Update Storybook example with a11y violations.
- 663a334d: fix(input): Fix double focus on the `isClearable` button on all input types (input, search, datepicker).
- 663a334d: fix(pagination): Fix Pagination a11y issue regarding `<ul>` only having `<li>` as children.
- 663a334d: refactor(radio): Update Storybook examples with a11y violations.
- 663a334d: refactor(skiplink): Update Storybook example with a11y violations.
- 663a334d: build(deps): bump parse-url from 6.0.0 to 6.0.2
- 663a334d: build(deps): bump terser from 4.8.0 to 4.8.1

## 3.1.0

### Minor Changes

- 04e0a5a8: Release 3.1.0

## 3.0.0

**NOTE: 3.0.0 was an accidental release. Please use 3.1.x and above**

### Major Changes

- 732f5c908: fix(button): Remove margin from buttons
  BREAKING CHANGE: Margin from buttons have been removed. Use `ButtonGroup` when using multiple buttons.

- 8690bbf3f: feat: Updating alerts to V3 styling, this effects banners and toasts in addition.
  Breaking Change: Muted Alert variant has been removed.

- 81b1b76d: dropdown: Remove deprecated prop `onBeforeShiftFocus`

### Minor Changes

- e9e7a600: fix(alert/banner/toast): Update hyperlink styles
  fix(banner): Update styles for close button
- d70e4cf17: feat(badge): Update hover/active/focus styles
- eeec9950: fix(input): fixed positioning for clearable button when inputs have an icon on the right or top.
- 787017f90: feat(buttongroup): New ButtonGroup component

- 8c17d7e8: feat(button): Updated hover/focus/active states on buttons using the new color palette.
- 23fc1b1a: fix(buttongroup): Add `Dropdown` support
- ce262ae30: feat(combobox): Update combobox items colors and error styling
- 97ea53aca: feat(spinner): Add `isInverse` support for Spinner component.
  feat(combobox/select): Update styling for items list inverse.
- e93d09159: fix(container): Update Storybook examples
- 733aa23b: fix(theme): Update `danger100` hex color
- 058ddea9: feat(datepicker): Update spacing around buttons
- c765e88d: feat(dropdown): Update dropdown item `isInverse` && `disabled` color.
- b5c4415d: 800 fix focus state in Dropdown Component. Updated modal docs
- ab69379b: fix(nativeSelect): Add background color to the options for `isInverse`. In Windows, the Native Select dropdown has a white background which makes the options invisible.
- 9ca1827b2: feat: Update colors throughout various components
- 27e91f1e9: feat(DatePicker): Update DatePicker with new colors. Add `isInverse` support.
- 484578a87: feat(Dropdowns): Updating Dropdowns with rebrand styles
- a4acd9ac6: feat(heading): Update expressive `contextVariant` styles.
- 7ab1d3c3: feat(table): Removing `hasOuterBorder` prop. This was a new prop this version, so this is not a breaking change.
- 7cec9a9ab: feat(button): Update Secondary button hover/active/focus states.
- ce9088243: bug(select): Fix hover styles in Select component to not have focus border.
- 133d2cf32: fix(table): update sortable table header cursor
- 0d9b45043: fix(select): update disabled state down arrow color
  fix(toggle): update toggle border color
  fix(combobox): update input border inverse danger color
  fix(table): update table inverse hasZebraStripes color
- a46f65ee: fix(table): fix `minWidth` scroll
- 31dfdba9: feat(table): Add `isInverse` support for TablePagination dropdowns
- 41215ce1e: feat(table): Update Storybook examples
- 403e601a: feat(tabs): Update Storybook examples
- 7d66f867: fix(timepicker): `onChange` is called on 'Backspace' key press
- cc23aacf6: fix(toast): bring back dropshadow for toasts
- ca2c61de6: feat(tooltip): Fix tooltip position bug
- 465fd0fce: fix: Toast X center alignment

### Patch Changes

- 9d8ae22c: fix(accordion): Update Storybook `isInverse` example
- 3a27353aa: bug: Dropdowns/Selects are hidden when used inside other components.
- 3a27353aa: fix(textarea): Textarea can now be cleared

## 2.5.11

### Patch Changes

- 72db207d: fix: adding in reference for list props within the index
- 7ed798b5: fix(accordion.stories.tsx): fix Accordion expand collapse all story & change background to transparent
- a7e57b54: build(publish-next-yml): Add Deploy Dev Storybook to Netlify step to publish-next.

## 2.5.10

### Patch Changes

- fdc6b27f: fix: adding in reference for list props within the index
- fdc6b27f: fix(accordion.stories.tsx): fix Accordion expand collapse all story & change background to transparent
- fdc6b27f: build(publish-next-yml): Add Deploy Dev Storybook to Netlify step to publish-next.

## 2.5.10

### Patch Changes

- e4c69ca5: fix(alert): add right padding of 12px
- 39b2fc49: fix(modal.tsx): Remove title attribute from modals
- cbadaccb: feat: List component
- 27cad886: Build/fix publish step
- 92e31554: Fix/drawer issues
- 6e481733: fix(tag.stories.tsx): On Delete With Icon Tags not updating color and isInverse
- 41522e87: feat: add `xLarge` for iconSizes
  fix: export `styled` and `useGeneratedId` for external components
- 5e9f8de5: fix(select.stories.tsx): fix Select multi example (again)
- ecd43306: fix(iconbutton.stories.tsx): updating IconButton stories to hide some properties
- 290efc90: fix(tablepagination.tsx): add activeIndex to tablepagination
- 8202898b: fix(select.stories.tsx): Fixing Select Multi story
- 3ed0d7de: chore(deps): bump browserslist from 4.14.2 to 4.20.2
- 452e52d5: fix(schemarenderer.stories.tsx): clean up schema data
- 0fc84127: fix(tag.tsx): Disabled tags have the correct cursor
- 14b24dd7: fix(tag.stories.tsx): Tag preview updates when control props are toggled
- ae7a1fc2: fix(InputBase/index.tsx): fix alignment for "Choose file" button for inputSize large
- 4f483f8f: docs: storybook Addon Measure package added
- 3208cf6f: docs(storybook): updating storybook version to 6.4.20 and adding essentials addon

## 2.5.9

### Patch Changes

This was an accidental release. Please skip this version and upgrade to to 2.5.10.

## 2.5.8

### Patch Changes

- 444cd2bb: Update to fix header
- 7b0c5714: fix(form): allow customization of Heading in Form component

## 2.5.7

### Patch Changes

- 465dc468: feat: Tag Updates for additional colors
- 4da10cb8: fix(Tabs): call onChange function when tab panel is changed by keyboard navigation
- 1bbd5017: feat(tooltip): add an `open` prop for persistent tooltips
- a23e8307: Fix: Added portal back into modal
- c9907a67: feat: Inputs update

  Removed top margin from helper and error messages related to inputs.

- fb4741bd: fix(dropdown): changed link color in dropdown to be dark gray instead of blue
- 6cbb9cf2: feat(dropdown): add onOpen property to be called when dropdown opens
- edbdda88: Release 2.5.7
- 2e4f06d6: feat: Predictive Search
- 22749327: feat: initial commit of the block quote component
- 253fd1c1: feat: input updates to support additional icon positioning
- dd443552: Remove unknown props on dom elements in breadcrumb. Specifically `isInverse`
- 156c5c1e: docs: page layout templates

## 2.5.6

### Patch Changes

- 19ac34d7: chore: update storybook to 6.4.0-beta.20 fixes react 17
- 2cdc9c2a: Allow for mouse to hover in to tooltip message
- 3435eede: fix(textarea): use specific TextareaHTMLAttributes
- 5ac10dfb: chore: letter-spacing additions for smaller font sizes
- cec68d47: fix(magma.ts): added type for primaryInverse color

## 2.5.5

### Patch Changes

- 84507cc4: feat: add fileuploader to i18n
- 8771bbfe: chore: update icons to 2.3.1
- ab506800: change to dropdown for table pagination, change drop direction to 'up', and allow dropdown drop direction to be changed through props.

## 2.5.3

### Patch Changes

- 52062bae: fix(input): passed messageStyle prop to inputMessage component

## 2.5.2

### Patch Changes

- 4980c87a: - disable the clear and action buttons when the input is disabled
- ebdacccc: refactor(Dropdown): renamed handleMenuBlur to handleDropdownBlur
- 8ee194d4: - extend TypographyProps for HeadingProps
  - use Generic for TypographyProps
- aea1e089: - fix(datepicker): keep close button below the helper information
  - fix(datepicker): return focus to the previous element after closing helper information
- 21c2ac2e: fix(time-picker): prevent time from switching to am when hour changes
- 12380623: fix(input): add onClear function to be called when the input is cleared by clicking the clear button

## 2.5.1

### Patch Changes

- 95f30ed9: fix(modal): stopped background from scrolling when a modal is open
- 1fbd86f3: fix(timepicker): update am/pm to use type=button
- 92579adb: chore: updating styling
- c3b90d1d: feat: add xLarge for iconSizes
  fix: export styled and useGeneratedId for external components
- 3260fafb: Call onClose function when clicking outside of the dropdown menu
- e12e00cf: fix(textarea): default width to 100%
- 12d6d789: fix StyledButton: move creation of wrappers outside of StyledButton render function
- 93ecc6c8: Feature/grid

  CSS-Grid component for Magma. Grid styles can be applied as props to quickly and easily create a layout.

- c5cec3f6: Add useFocusLock hook to fix focus jumping around inside of a modal that has components re-rendered.

## 2.5.0

### Minor Changes

- 8e3559c3: Refactor pagination component to use the new `usePagination` hook.
  Create new `Datagrid` component as well as a new `useDataPagination` hook to handle datagrid data.

### Patch Changes

- 68b265d0: fix: place ref for dropdown on the card
- acc9219d: refactor(text alignment): changing the banner alignment to left aligned
- 9a89c7af: feat(input): added isClearable prop to input base

## 2.4.0

### Minor Changes

- f0a1882f: fix/controlled-toggle

  Update `Toggle` to have controlled and uncontrolled variants akin to `Checkbox`

- 88e2daee: Feature/datagrid

  Creating a `Datagrid` component with the options to have selectable rows and pagination.

  As a part of pagination for the `Datagrid` component there is now a `useDataPagination` hook that creates a `pagination` object with the data needed to build any of our pagination components.

- b7f7e431: feature/transitions: Add `Transition` component.

  A reusable Transition components that allows teams to use the same standard transitions everywhere.

  ```
  <Transition fade nudgeTop>
    <div>child</div>
  </Transition>
  ```

- c49cda0e: Add new transition component
- 1ceb9951: Feature/accordion

  Adding a new accordion component

### Patch Changes

- aaa4d559: Some minor adjustments to the appearance of inverse (dark) states in some components. Also some updates to docs structure for dark mode.
- efb6f297: feat: updating error styles for radios
- 6d2a2be6: chore: update icons
- 57e28ac7: feat(pagination): create new pagination component

## 2.3.12

### Patch Changes

- d0a7687d: fix(input): fix issue with inline inputs rendering too wide (such as search box)

### Patch Changes

- d0a7687d: fix(input): fix issue with inline inputs rendering too wide (such as search box)

### 2.3.9 (2021-03-24)

- chore: update to node 14, npm 7
- fix(checkbox): switch to icon for unchecked state
- fix(dropdown): improve dropdown button styles for icons v2
- feature(flex): add flex component
- feature(spacer): add spacer component
- fix(formgroup): add label
- fix(Button): default to ButtonType.button
- fix(icons): update remaining v1 icons

### 2.3.8 (2021-03-01)

- fix: update dependencies accross packages
- docs(checkbox): improve stories

### 2.3.7 (2021-02-22)

- feat(icons): release v2.0.0

### 2.3.6 (2021-02-18)

- Note: Version bump only for package react-magma-dom
-

### 2.3.5 (2021-02-18)

- table: duplicate exports (1583413)
- ci(stories): add remaining stories
- refactor(breadcrumb): add generic index
- refactor(card): add generic index
- refactor(dropdown): add generic index
- refactor(navtabs): add generic index
- refactor(table): add generic index
- refactor(tabs): add generic index
- fix(combobox): fix error message and styling
- fix(select): fix error message and styling
- fix(checkbox): use IndeterminateCheckboxStatus in type
- fix(label): add labelPosition enum
- feature(table): add pagination

### 2.3.4 (2021-01-25)

- ci(storybook): add storybook
- chore: update contributing guide
- fix(tooltip): improve positioning

### 2.3.3 (2021-01-20)

- docs(theme): use magma theme in more places
- feat(combobox): add isMulti XOR
- feat(select): add isMulti XOR
- fix(dropdown): set border to 0
- feat(form): create form component
- fix(hyperlink): extend Anchor
- fix(theme): remove jsx pragma

### 2.3.2 (2020-12-30)

- ci(actions): new github Actions
- ci(actions): deploy to Netlify
- test: add instructions for wallabyjs
- chore: delete archived packages
- build(lerna): update
- build(gatsby): add flags for faster docs preview
- docs(gatsby): switch to magic props tables
- feat(tooltip): introduce popperjs
- fix(combobox): support maxHeight
- fix(combobox): support customComponents

### [2.3.1-alpha.0](https://github.com/cengage/react-magma/compare/react-magma-dom@2.3.0...react-magma-dom@2.3.1-alpha.0) (2020-12-11)

### Bug Fixes

- **combobox:** select correct item using keyboard navigation ([bb05403](https://github.com/cengage/react-magma/commit/bb05403ef49166b3a38de4f7ac8d02fe979e2a83))
- **dropdown:** add interfaces with default props, testids ([65d15d7](https://github.com/cengage/react-magma/commit/65d15d70131cf45d40622f41e45bd96284729c10))
- **tab:** handle click parameter names fixed ([70dc881](https://github.com/cengage/react-magma/commit/70dc881078a1823c7031eb973362eef369682dc3))

## [2.3.0](https://github.com/cengage/react-magma/compare/react-magma-dom@2.3.0...react-magma-dom@2.3.0) (2020-12-08)

### Features

- **combobox, select:** use spacing from theme ([71d3026](https://github.com/cengage/react-magma/commit/71d302656a82a286c16bd2eb4f73893ab5f450f4))
- **component:** spacing updates ([e2ffcaa](https://github.com/cengage/react-magma/commit/e2ffcaa3718625a01d8778366c0db13e46c595ac))
- **datepicker:** use spacing from theme ([cec752f](https://github.com/cengage/react-magma/commit/cec752f1f78a11e8ab571264b4673cfdbfad1a9f))
- **loadingindicator, progressbar, spinner:** use new spacing ([513fa48](https://github.com/cengage/react-magma/commit/513fa487348b06386648f7a93571c058883d37cc))
- **paragraph, heading:** use spacing scale from theme ([4afac5f](https://github.com/cengage/react-magma/commit/4afac5ffd7e3b7d3c78b4bdf9f32a695833ccba7))
- **progress bar:** update spacing and animation, docs fixes ([221c944](https://github.com/cengage/react-magma/commit/221c9445b8e7f6ab47ad22c1bd950958da3bc535))
- **spinner, progressbar:** allow string or number for size ([e6030d5](https://github.com/cengage/react-magma/commit/e6030d56d3e386fe906ef426c5655bd53bdf1620))

### Bug Fixes

- **dropdown:** export DropdownAlignment and DropdownDropDirection ([458c4b4](https://github.com/cengage/react-magma/commit/458c4b4adcbad85a63b1883d5b613cff3cce257d))
- **dropdown:** remove auto focus of button on close ([2d9a27c](https://github.com/cengage/react-magma/commit/2d9a27c6c62165f6b8614ede80a6f5899c12c4af))
- **modal:** fix modal body, header padding ([33a9b8a](https://github.com/cengage/react-magma/commit/33a9b8a6f7a955eb2da4ac77247bb623b22b1410))
- **modal:** fix style issues ([52e3dc8](https://github.com/cengage/react-magma/commit/52e3dc8ca60f14684361d44abad1a9204294ba21))
- **tab:** handle click parameter names fixed ([70dc881](https://github.com/cengage/react-magma/commit/70dc881078a1823c7031eb973362eef369682dc3))
- **tabs:** allow for custom onClick on individual tab ([b3f598a](https://github.com/cengage/react-magma/commit/b3f598af11ca9a7d4a2a82accaa84d2dc865075a))
- **tooltip:** added event watcher on esc key ([3060740](https://github.com/cengage/react-magma/commit/3060740a8f23f68f7dd441b73ddb6d01e668748c))
- **tooltip:** removed deprciated keyCode ([3ad9cb9](https://github.com/cengage/react-magma/commit/3ad9cb9b0cd9b9ccd01431b04862ffbfe174df6c))
- **typography:** export TypographyContextVariant ([1012171](https://github.com/cengage/react-magma/commit/101217160ba2b5bce1e3931d77f39ee77d6f8b64))
