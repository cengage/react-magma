---
'react-magma-dom': patch
---

fix(Combobox, ToggleButtonGroup, PopoverTrigger): Fix ARIA id references

- Combobox now passes its generated id correctly

- ToggleButtonGroup no longer uses aria describedby with an id that does not exist

- PopoverTrigger now puts aria label on the actual trigger element instead of a wrapper with no role
