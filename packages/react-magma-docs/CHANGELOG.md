# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
