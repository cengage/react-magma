# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
