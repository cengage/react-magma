# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.28](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2020-03-30)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.27](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2020-03-25)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.26](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2020-03-25)


### Bug Fixes

* **input labels:** allow react node not just string ([a95f9b8](http://stash.corp.web:7999/FRONT/react-magma/commits/a95f9b8))
* **tooltip:** allow custom styling of tooltip container and element ([e7b3083](http://stash.corp.web:7999/FRONT/react-magma/commits/e7b3083))





# [2.0.0-beta.25](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2020-03-09)


### Bug Fixes

* **textarea:** use value not children ([e6326f4](http://stash.corp.web:7999/FRONT/react-magma/commits/e6326f4))
* **timepicker:** allow timepicker to display well in flex div ([136cc93](http://stash.corp.web:7999/FRONT/react-magma/commits/136cc93))


### Features

* **icon button:** allow custom icon size ([c62c62e](http://stash.corp.web:7999/FRONT/react-magma/commits/c62c62e))
* **magma palette:** add purple to palette, also change order of docs ([6606932](http://stash.corp.web:7999/FRONT/react-magma/commits/6606932))





# [2.0.0-beta.24](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2020-02-19)


### Bug Fixes

* **tabs:** custom tab component fixes and examples for in in docs ([d9f5ea3](http://stash.corp.web:7999/FRONT/react-magma/commits/d9f5ea3))
* **tabs:** fix styles ([aafed31](http://stash.corp.web:7999/FRONT/react-magma/commits/aafed31))
* **tabs:** fix styles and themes ([41810c9](http://stash.corp.web:7999/FRONT/react-magma/commits/41810c9))
* **tabs:** important names in tab docs is capitalized ([8384990](http://stash.corp.web:7999/FRONT/react-magma/commits/8384990))


### Code Refactoring

* **tooltip:** make trigger children, make content a prop ([b082bc0](http://stash.corp.web:7999/FRONT/react-magma/commits/b082bc0))


### Features

* **date and timepickers:** allow custom message styles ([e9f4d35](http://stash.corp.web:7999/FRONT/react-magma/commits/e9f4d35))
* **icon-button:** Make IconButton a separate component from Button ([d7b3767](http://stash.corp.web:7999/FRONT/react-magma/commits/d7b3767))
* **input message:** allow custom styles on input message ([7cf75a4](http://stash.corp.web:7999/FRONT/react-magma/commits/7cf75a4))
* **input message:** allow input message to take node ([50961f8](http://stash.corp.web:7999/FRONT/react-magma/commits/50961f8))
* **inputs:** New separate components for inputs, inc pword, textarea ([b39b3ec](http://stash.corp.web:7999/FRONT/react-magma/commits/b39b3ec))
* **password:** create separate password component ([566f11b](http://stash.corp.web:7999/FRONT/react-magma/commits/566f11b))
* **search:** isLoading prop for search, docs for spinner as icon ([f0a051e](http://stash.corp.web:7999/FRONT/react-magma/commits/f0a051e))
* **tabs:** Add in typing for component vs children tab ([eb15ce1](http://stash.corp.web:7999/FRONT/react-magma/commits/eb15ce1))
* **tabs:** add padding to tabPanel, minor doc updates ([8650ba0](http://stash.corp.web:7999/FRONT/react-magma/commits/8650ba0))
* **tabs:** added tabs component ([0dc0439](http://stash.corp.web:7999/FRONT/react-magma/commits/0dc0439))
* **tabs:** allow for flexible widths ([8e29e15](http://stash.corp.web:7999/FRONT/react-magma/commits/8e29e15))
* **tabs:** allow nav tabs to show icon ([8b12fd6](http://stash.corp.web:7999/FRONT/react-magma/commits/8b12fd6))
* **tabs:** make alignment an enum, remove children from custom tabs ([57f7dee](http://stash.corp.web:7999/FRONT/react-magma/commits/57f7dee))
* **tabs:** more styles, move props to container, not tabs ([1a467d7](http://stash.corp.web:7999/FRONT/react-magma/commits/1a467d7))
* **tabs:** refer to theme instead of magma directly ([6d6d241](http://stash.corp.web:7999/FRONT/react-magma/commits/6d6d241))
* **tabs:** rename boolean props ([93cb9fd](http://stash.corp.web:7999/FRONT/react-magma/commits/93cb9fd))
* **time-picker:** allow typed input and passed in value ([90ffbe8](http://stash.corp.web:7999/FRONT/react-magma/commits/90ffbe8))
* **timepicker:** docs page and basic style ([f07bf06](http://stash.corp.web:7999/FRONT/react-magma/commits/f07bf06))
* **timepicker:** docs update, fix bg color, remove unused ref ([af45728](http://stash.corp.web:7999/FRONT/react-magma/commits/af45728))
* **timepicker:** error and helper messages ([3d2f22a](http://stash.corp.web:7999/FRONT/react-magma/commits/3d2f22a))
* **timepicker:** start of timepicker ([6b40a8d](http://stash.corp.web:7999/FRONT/react-magma/commits/6b40a8d))
* **timepicker:** timepicker! ([5e20d02](http://stash.corp.web:7999/FRONT/react-magma/commits/5e20d02))
* **tooltip:** throw error if children is more than one element ([eb59fe1](http://stash.corp.web:7999/FRONT/react-magma/commits/eb59fe1))


### BREAKING CHANGES

* **icon-button:** Button component no longer accepts the icon props. IconButton provides the
functionality now
* **tooltip:** Removed the trigger prop from tooltip and we are now using the children to provide
* **inputs:** Many props removed from Input component.  Password related props have been moved to
PasswordInput.  HelpLink related props removed and replaced with simply passing children. Multiline
prop removed and replaced with separate Textarea component.  Error and help messaging removed from
search.  New BaseInput component created.





# [2.0.0-beta.23](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2020-02-07)


### Bug Fixes

* **modal:** Stop multiple onClose function calls ([d159b00](http://stash.corp.web:7999/FRONT/react-magma/commits/d159b00))





# [2.0.0-beta.22](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2020-02-04)


### Documentation

* **select:** upgrade docs to reflect react-select props change ([2de8b50](http://stash.corp.web:7999/FRONT/react-magma/commits/2de8b50))


### BREAKING CHANGES

* **select:** react-select props api breaking change





# [2.0.0-beta.21](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2020-01-29)


### Features

* New and updated icons ([e204ef3](http://stash.corp.web:7999/FRONT/react-magma/commits/e204ef3))


### BREAKING CHANGES

* Added new stats icons. Added new empty star icon. Updated reply and forward icons.





# [2.0.0-beta.20](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2020-01-29)


### Features

* Icons audit ([52444cd](http://stash.corp.web:7999/FRONT/react-magma/commits/52444cd))


### BREAKING CHANGES

* Resolved redundant icons. Remove unnecessary icons: ArrowUp3, ArrowDown3,
ArrowLeft3, ArrowRight3, Exclamation, List3, Menu2, Menu3, Menu4, PieChart, Question2, Question,
Spinner2, Star, ThList, Timed, Unlock, Wrench3





# [2.0.0-beta.19](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2020-01-28)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.18](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2020-01-21)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.17](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2020-01-15)


### Features

* **hide at breakponit:** new component to hide at specified breakpoinit ([786eeec](http://stash.corp.web:7999/FRONT/react-magma/commits/786eeec))
* **hideatbreakpoint:** remove ref, update tests ([7a932a3](http://stash.corp.web:7999/FRONT/react-magma/commits/7a932a3))





# [2.0.0-beta.16](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2020-01-15)


### Features

* **date-picker:** adding in allowable dates ([6565fe8](http://stash.corp.web:7999/FRONT/react-magma/commits/6565fe8))





# [2.0.0-beta.15](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2020-01-13)


### Features

* **checkbox:** separate indeterminate checkbox ([fea93c1](http://stash.corp.web:7999/FRONT/react-magma/commits/fea93c1))


### BREAKING CHANGES

* **checkbox:** removed indeterminiate prop from checkbox, put in separate component

MAGMA-196





# [2.0.0-beta.14](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2020-01-13)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.13](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2020-01-13)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.12](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2020-01-13)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.11](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2020-01-07)


### Features

* **alert, toast:** change dismissible prop name to isDismissible ([99d6786](http://stash.corp.web:7999/FRONT/react-magma/commits/99d6786))
* rename inverse prop to isInverse ([6a95471](http://stash.corp.web:7999/FRONT/react-magma/commits/6a95471))
* **button:** change fullWidth prop to isFullWidth ([3b4477b](http://stash.corp.web:7999/FRONT/react-magma/commits/3b4477b))
* **input:** rename hidePasswordMaskButton to isPasswordMaskButtonHidden ([4968f74](http://stash.corp.web:7999/FRONT/react-magma/commits/4968f74))
* **input:** rename labelVisuallyHidden prop to isLabelVisuallyHidden ([3939dd7](http://stash.corp.web:7999/FRONT/react-magma/commits/3939dd7))
* **modal:** change boolean prop names ([2723ed7](http://stash.corp.web:7999/FRONT/react-magma/commits/2723ed7))
* **modal:** update boolean prop names ([cc27b7e](http://stash.corp.web:7999/FRONT/react-magma/commits/cc27b7e))
* **progressbar:** change boolean prop names ([0788dd0](http://stash.corp.web:7999/FRONT/react-magma/commits/0788dd0))
* **radio, checkbox, toggle, formgroup:** textVisuallyHidden prop ([4bd2115](http://stash.corp.web:7999/FRONT/react-magma/commits/4bd2115))


### BREAKING CHANGES

* **modal:** change prop names in modal component - open to isOpen, disableBackdropClick to
isBackgroundClickDisabled, disableEscKeyDown to isEscKeyDisabled and hideCloseButton to
isCloseButtonHidden

MAGMA-212
* **progressbar:** prop name changes in progressbar component - animated to isAnimated and
labelVisible to isLabelVisible

MAGMA-212
* **modal:** update props names for modal - disableBackdropClick, disableEscKeyDown,
hideCloseButton, open to isBackgroundClickDisabled, isEscKeyDownDisabled, isCloseButtonHidden and
isOpen

MAGMA-212
* **input:** prop name change in input component labelVisuallyHidden to isLabelVisuallyHidden
* **input:** rename prop in input component hidePasswordMaskButton to isPasswordMaskButtonHidden

MAGMA-212
* **radio, checkbox, toggle, formgroup:** renamed textVisuallyHidden prop to isTextVisuallyHidden in checkbox, formgroup,
radio, radiogroup and toggle components

MAGMA-212
* **button:** prop name in button changed from fullWidth, to isFullWidth. It was previously named
block

MAGMA-212
* Across many components, the inverse prop has been renamed to isInverse.  Affects
Alert, Breadcrumb, Button, Card, Checkbox, Datepicker, Heading, HyperLink, Input, ProgressBar,
Radio, Search, Select, SkipLinik, Toast, Toggle, Tooltip

MAGMA-212
* **alert, toast:** prop name changed in alert, toast components.  Was dismissible, now is
isDismissible





# [2.0.0-beta.10](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2020-01-07)


### Bug Fixes

* **search:** pass search value to onsearch function ([9f7c9a2](http://stash.corp.web:7999/FRONT/react-magma/commits/9f7c9a2))


### Features

* **search:** call onchange event if passed as prop ([76ea4eb](http://stash.corp.web:7999/FRONT/react-magma/commits/76ea4eb))





# [2.0.0-beta.9](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2020-01-07)


### Features

* **input:** add default value prop ([4aa61de](http://stash.corp.web:7999/FRONT/react-magma/commits/4aa61de))





# [2.0.0-beta.8](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2020-01-07)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.7](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2020-01-07)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.6](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2020-01-07)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.5](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2020-01-06)


### Features

* **datepicker:** add value prop ([430f5c8](http://stash.corp.web:7999/FRONT/react-magma/commits/430f5c8))





# [2.0.0-beta.4](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2020-01-06)


### Features

* **all:** pass through base html attributes as props ([4715e2c](http://stash.corp.web:7999/FRONT/react-magma/commits/4715e2c))





# [2.0.0-beta.3](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2019-12-20)


### Code Refactoring

* **breadcrumb, spinner:** renamed ariaLabel prop to aria-label ([df23d35](http://stash.corp.web:7999/FRONT/react-magma/commits/df23d35))
* **tooltip:** remove content prop, use children instead ([b0316e9](http://stash.corp.web:7999/FRONT/react-magma/commits/b0316e9))


### BREAKING CHANGES

* **breadcrumb, spinner:** prop name changed in breadcrumb and spinner components -- ariaLabel changed to
aria-label

MAGMA-193
* **tooltip:** removed the content prop from Tooltip component, uses children instead

MAGMA-208





# [2.0.0-beta.2](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2019-12-19)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-beta.1](http://stash.corp.web:7999/FRONT/react-magma/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2019-12-19)


### Code Refactoring

* **breadcrumb:** add context for inverse ([9917233](http://stash.corp.web:7999/FRONT/react-magma/commits/9917233))


### Features

* **all:** add testId prop to all components ([3732a49](http://stash.corp.web:7999/FRONT/react-magma/commits/3732a49))
* **button:** change block prop name to fullWidth ([ff09002](http://stash.corp.web:7999/FRONT/react-magma/commits/ff09002))
* **datepicker:** add required prop ([feaad82](http://stash.corp.web:7999/FRONT/react-magma/commits/feaad82))
* **input:** rename helpLinkText to helpLinkAriaLabel ([a57726d](http://stash.corp.web:7999/FRONT/react-magma/commits/a57726d))
* **input, datepicker, search:** change prop name ([22960bb](http://stash.corp.web:7999/FRONT/react-magma/commits/22960bb))
* **modal:** rename hideEscButton prop to hideCloseButton ([82aa2c7](http://stash.corp.web:7999/FRONT/react-magma/commits/82aa2c7))
* **modal, alert:** change closeLabel prop ([9e92c09](http://stash.corp.web:7999/FRONT/react-magma/commits/9e92c09))
* **progressbar:** change prop name from bgColor to color ([2c726d2](http://stash.corp.web:7999/FRONT/react-magma/commits/2c726d2))


### BREAKING CHANGES

* **breadcrumb:** removed inverse prop from BreadcrumbItem, now inherits prop from Breadcrumb

MAGMA-195
* **modal, alert:** changed prop name in modal, alert and toast component from closeLabel to
closeAriaLabel

MAGMA-207
* **progressbar:** change prop name in progressbar component from bgColor to color

MAGMA-204
* **modal:** prop name change in modal from hideEscButton to hideCloseButton

MAGMA-203
* **input:** renamed prop in input from helpLinkText to helpLinkAriaLabel

MAGMA-202
* **button:** change prop name in button component from block to fullWidth

MAGMA-191
* **input, datepicker, search:** changed prop name across three components (input, datepicker, search) from
placeholderText to placeholder

MAGMA-190





# [2.0.0-beta.0](http://stash.corp.web:7999/FRONT/react-magma/compare/v1.0.1-beta.1...v2.0.0-beta.0) (2019-12-16)


### Bug Fixes

* **dismissible:** fixing the spelling of the word dismissible ([d429931](http://stash.corp.web:7999/FRONT/react-magma/commits/d429931))


### Features

* **focus color:** add new focus color that works against grey ([865880b](http://stash.corp.web:7999/FRONT/react-magma/commits/865880b))
* **hooks:** alert changed to using hooks ([fc4546c](http://stash.corp.web:7999/FRONT/react-magma/commits/fc4546c))
* **hooks:** checkbox hooks and indeterminate behaviour ([8a75293](http://stash.corp.web:7999/FRONT/react-magma/commits/8a75293))
* **hooks:** update alert component to hooks ([38a1f23](http://stash.corp.web:7999/FRONT/react-magma/commits/38a1f23))


### BREAKING CHANGES

* **dismissible:** spelling of a prop has changed





# [2.0.0-alpha.1](http://stash.corp.web:7999/front/react-magma/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2019-12-16)

**Note:** Version bump only for package react-magma-docs





# [2.0.0-alpha.0](http://stash.corp.web:7999/front/react-magma/compare/v1.0.0...v2.0.0-alpha.0) (2019-12-16)


### Bug Fixes

* **dismissible:** fixing the spelling of the word dismissible ([d429931](http://stash.corp.web:7999/front/react-magma/commits/d429931))


### Features

* **focus color:** add new focus color that works against grey ([865880b](http://stash.corp.web:7999/front/react-magma/commits/865880b))
* **hooks:** alert changed to using hooks ([fc4546c](http://stash.corp.web:7999/front/react-magma/commits/fc4546c))
* **hooks:** checkbox hooks and indeterminate behaviour ([8a75293](http://stash.corp.web:7999/front/react-magma/commits/8a75293))
* **hooks:** update alert component to hooks ([38a1f23](http://stash.corp.web:7999/front/react-magma/commits/38a1f23))
* **icons:** new font size icon ([efc5012](http://stash.corp.web:7999/front/react-magma/commits/efc5012))


### BREAKING CHANGES

* **dismissible:** spelling of a prop has changed
