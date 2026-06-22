---
'react-magma-dom': patch
---

fix(Tabs & NavTabs): allow keyboard focus to move from the scroll buttons back into the tablist. When the tabs overflow and the previous/next scroll buttons are shown, pressing the arrow key that points toward the tabs (ArrowRight/ArrowLeft for horizontal, ArrowDown/ArrowUp for vertical) now moves focus to the nearest fully visible tab instead of doing nothing. Previously focus could land on a scroll button and arrow keys were ignored, so keyboard users felt trapped on the buttons.
