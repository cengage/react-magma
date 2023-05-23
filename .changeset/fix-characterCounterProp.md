---
'react-magma-dom': patch
---

fix(Character Counter): Two new props have been added. The `hasCharacterCounter` prop which defaults to `true` and the `maxCount` prop which replaces `maxLength` and enables the Character Counter.

In the interim if an input needs a native `maxlength` and not a Character Counter, set `hasCharacterCounter={false}` and then use `maxLength`.

Please note that in the meantime, `maxLength` is still supported but will need to be changed to `maxCount` as future releases will remove `maxLength` and `hasCharacterCounter`.
