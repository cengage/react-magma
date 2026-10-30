/**
 * Hand-written part of the AI skill catalog (see scripts/generateAi.js).
 *
 * Shape: { [category]: { [componentFolder]: entry } }
 *   purpose     what the component is for, a few words
 *   keywords    words people use when asking for it; this is how agents find
 *               the component instead of building one, so include synonyms
 *   useInstead  optional { need: BetterComponent } to steer similar requests
 *   includes    optional extra folders whose exports belong to this entry
 *
 * Every component folder exported from src/index.ts must appear here;
 * `npm run check-ai` fails otherwise.
 */
module.exports = {
  Actions: {
    Button: {
      purpose: 'Performs an action or submits a form',
      keywords: ['button', 'cta', 'submit', 'primary action'],
      useInstead: {
        navigation: 'Hyperlink',
        'icon only': 'IconButton',
        'on/off setting': 'Toggle',
      },
    },
    IconButton: {
      purpose: 'Button with an icon, with or without text',
      keywords: ['icon button', 'close button', 'toolbar button'],
    },
    AIButton: {
      purpose: 'Animated gradient button for AI features',
      keywords: ['ai action', 'generate', 'assistant button'],
    },
    ButtonGroup: {
      purpose: 'Lays out and aligns related buttons',
      keywords: ['button bar', 'actions row', 'button set'],
    },
    ToggleButton: {
      purpose: 'Button with a pressed/selected state',
      keywords: ['pressed button', 'bold/italic toggle', 'selectable button'],
    },
    ToggleButtonGroup: {
      purpose: 'Group of ToggleButtons with single or multiple selection',
      keywords: ['segmented control', 'view switcher', 'button toggle group'],
    },
    Dropdown: {
      purpose: 'Menu of actions or links opened from a button',
      keywords: [
        'menu',
        'actions menu',
        'kebab menu',
        'overflow menu',
        'split button',
      ],
      useInstead: { 'choosing a form value': 'Select' },
    },
  },

  Forms: {
    Form: {
      purpose: 'Form container with header, description and actions',
      keywords: ['form', 'form layout'],
    },
    Input: {
      purpose: 'Text field with label, helper and error message',
      keywords: [
        'text field',
        'textbox',
        'email field',
        'number field',
        'form field',
      ],
    },
    PasswordInput: {
      purpose: 'Password field with show/hide toggle',
      keywords: ['password', 'show password'],
    },
    Search: {
      purpose: 'Search field with `onSearch`, clear and loading states',
      keywords: ['search box', 'search bar', 'filter field'],
    },
    Textarea: {
      purpose: 'Multi-line text field',
      keywords: ['textarea', 'comment box', 'multiline input'],
    },
    CharacterCounter: {
      purpose:
        'Remaining-characters counter; prefer `maxCount` on Input/Textarea',
      keywords: ['character limit', 'char count'],
    },
    Select: {
      purpose: 'Choose one or many (`isMulti`) values from a list',
      keywords: ['dropdown list', 'picker', 'single select', 'multi select'],
      useInstead: {
        'typing to filter or create': 'Combobox',
        'browser-native list': 'NativeSelect',
        'action menu': 'Dropdown',
      },
    },
    Combobox: {
      purpose: 'Select with typing, filtering and creating items',
      keywords: [
        'autocomplete',
        'typeahead',
        'searchable select',
        'creatable select',
      ],
    },
    NativeSelect: {
      purpose: 'Magma-styled browser <select>',
      keywords: ['native select', 'html select'],
    },
    Checkbox: {
      purpose: 'Checkbox for one boolean or one of many options',
      keywords: ['checkbox', 'check box', 'agree'],
    },
    IndeterminateCheckbox: {
      purpose: 'Tri-state checkbox (checked, unchecked, indeterminate)',
      keywords: ['select all', 'partial selection', 'tri-state'],
    },
    Radio: {
      purpose: 'Single radio option; use inside RadioGroup',
      keywords: ['radio', 'radio button', 'option'],
    },
    RadioGroup: {
      purpose: 'Labelled group of mutually exclusive Radios',
      keywords: ['radio group', 'choose one'],
    },
    Toggle: {
      purpose: 'On/off switch for a setting',
      keywords: ['switch', 'toggle switch', 'enable setting'],
    },
    DatePicker: {
      purpose: 'Date field with calendar popup',
      keywords: ['date', 'calendar', 'date input'],
    },
    TimePicker: {
      purpose: 'Time field with keyboard entry',
      keywords: ['time', 'time input', 'clock'],
    },
    DateTimePicker: {
      purpose: 'Combined date and time field',
      keywords: ['datetime', 'date and time', 'schedule'],
    },
    FormGroup: {
      purpose: 'Labelled group of Checkboxes or Toggles with shared error',
      keywords: ['checkbox group', 'checkbox list', 'options group'],
    },
    Fieldset: {
      purpose: 'Semantic <fieldset> with legend for related controls',
      keywords: ['fieldset', 'legend', 'group of fields'],
    },
    Label: {
      purpose: 'Standalone field label; fields already render `labelText`',
      keywords: ['label'],
    },
    FormFieldContainer: {
      purpose: 'Label, helper and error wiring for a custom field',
      keywords: ['custom field', 'field wrapper'],
    },
    InputBase: {
      purpose: 'Low-level unlabelled input; prefer Input',
      keywords: ['bare input'],
    },
  },

  Overlays: {
    Modal: {
      purpose: 'Dialog that blocks the page and traps focus',
      keywords: ['dialog', 'popup', 'lightbox', 'confirm window', 'overlay'],
      useInstead: {
        'side panel': 'Drawer',
        'small anchored content': 'Popover',
      },
    },
    Drawer: {
      purpose: 'Panel sliding in from a screen edge',
      keywords: ['side panel', 'off-canvas', 'slide-out', 'sheet', 'sidebar'],
    },
    Popover: {
      purpose: 'Interactive content anchored to a trigger',
      keywords: ['popover', 'flyout', 'callout', 'info bubble'],
      useInstead: { 'hover text only': 'Tooltip' },
    },
    Tooltip: {
      purpose: 'Short text on hover or focus',
      keywords: ['tooltip', 'hint', 'hover text'],
    },
  },

  Feedback: {
    AlertBase: {
      purpose: 'Low-level alert primitive used by Alert and Toast',
      keywords: ['alert primitive', 'toast primitive'],
      useInstead: { 'standard inline alert': 'Alert' },
    },
    Alert: {
      purpose: 'Inline message with optional dismiss',
      keywords: ['alert', 'message', 'warning', 'error message', 'info box'],
      useInstead: { 'page-wide notice': 'Banner', 'temporary notice': 'Toast' },
    },
    Banner: {
      purpose: 'Full-width system or app-level message',
      keywords: ['banner', 'announcement bar', 'site notice'],
    },
    Toast: {
      purpose: 'Temporary notification; render inside ToastsContainer',
      keywords: ['toast', 'snackbar', 'notification', 'flash message'],
    },
    EmptyState: {
      purpose: 'No-content message with icon and actions',
      keywords: ['empty state', 'no results', 'nothing here', 'zero state'],
    },
    LoadingIndicator: {
      purpose: 'Page or section loading with progressive messages',
      keywords: ['loading screen', 'loader', 'please wait'],
    },
    Spinner: {
      purpose: 'Small inline loading spinner',
      keywords: ['spinner', 'busy indicator'],
    },
    ProgressBar: {
      purpose: 'Linear progress of a task',
      keywords: ['progress bar', 'percent complete', 'upload progress'],
    },
    ProgressRing: {
      purpose: 'Circular progress indicator',
      keywords: ['progress circle', 'radial progress'],
    },
    Skeleton: {
      purpose: 'Placeholder shapes while content loads',
      keywords: ['skeleton', 'shimmer', 'placeholder', 'ghost loading'],
    },
  },

  Navigation: {
    Hyperlink: {
      purpose: 'Link (prop `to`), can look like a button',
      keywords: ['link', 'anchor', 'href', 'link button'],
    },
    Breadcrumb: {
      purpose: 'Location within a page hierarchy',
      keywords: ['breadcrumbs', 'trail', 'path'],
    },
    Tabs: {
      purpose: 'Switch between panels of related content',
      keywords: ['tabs', 'tab panel', 'segmented content', 'scroll spy'],
      useInstead: { 'links to other pages': 'NavTabs' },
    },
    NavTabs: {
      purpose: 'Tab-styled navigation between pages',
      keywords: ['nav tabs', 'page tabs', 'tab navigation'],
    },
    Pagination: {
      purpose: 'Page number navigation',
      keywords: ['pagination', 'pager', 'page numbers'],
    },
    Stepper: {
      purpose: 'Progress through multi-step flows',
      keywords: ['stepper', 'wizard', 'steps', 'progress steps'],
    },
    TreeView: {
      purpose: 'Expandable hierarchical list with selection',
      keywords: [
        'tree',
        'folder tree',
        'nested list',
        'hierarchy',
        'file explorer',
      ],
    },
    AppBar: {
      purpose: 'Top header bar for the current screen',
      keywords: ['header', 'top bar', 'navbar', 'app header'],
    },
    SkipLink: {
      purpose: 'Skip-to-main-content link and its target',
      keywords: ['skip link', 'skip navigation'],
      includes: ['SkipLinkContent'],
    },
  },

  Layout: {
    Container: {
      purpose: 'Centers content horizontally with max width',
      keywords: ['container', 'page wrapper', 'wrapper'],
    },
    Flex: {
      purpose: 'Responsive 12-column flexbox rows and columns',
      keywords: ['flex', 'row', 'column', 'stack', 'responsive columns'],
    },
    Grid: {
      purpose: 'CSS grid container with grid props',
      keywords: ['grid', 'css grid', 'grid layout'],
    },
    Spacer: {
      purpose: 'Horizontal or vertical gap from the space scale',
      keywords: ['spacer', 'gap', 'margin', 'whitespace'],
    },
    Card: {
      purpose: 'Surface for grouped content',
      keywords: ['card', 'tile', 'panel', 'box'],
    },
    Accordion: {
      purpose: 'Stacked collapsible sections',
      keywords: ['accordion', 'collapse', 'expandable section', 'faq'],
    },
    BreakpointsContainer: {
      purpose: 'Render different content per screen size',
      keywords: ['responsive', 'breakpoint', 'mobile/desktop content'],
    },
    HideAtBreakpoint: {
      purpose: 'Hide content above or below a breakpoint',
      keywords: ['hide on mobile', 'hide on desktop', 'responsive visibility'],
    },
  },

  'Content and data': {
    Typography: {
      purpose: 'Low-level typography primitive for custom text styles',
      keywords: ['typography', 'text style', 'styled text'],
      useInstead: { 'semantic heading': 'Heading', paragraph: 'Paragraph' },
    },
    Heading: {
      purpose: 'Headings h1–h6 (`level`), style set separately',
      keywords: ['heading', 'title', 'h1', 'h2'],
    },
    Paragraph: {
      purpose: 'Body text with typography styles',
      keywords: ['paragraph', 'body text', 'text', 'copy'],
    },
    List: {
      purpose: 'Ordered or unordered list, optional icons',
      keywords: ['list', 'bullet list', 'numbered list'],
    },
    DefinitionList: {
      purpose: 'Term/description pairs',
      keywords: ['definition list', 'key value', 'details list', 'dl'],
    },
    BlockQuote: {
      purpose: 'Styled quotation with attribution',
      keywords: ['quote', 'blockquote', 'citation'],
    },
    Table: {
      purpose: 'Composable table (rows, cells, sorting, pagination)',
      keywords: ['table', 'rows', 'columns', 'sortable table'],
      useInstead: { 'table from data props': 'Datagrid' },
    },
    Datagrid: {
      purpose:
        'Table rendered from columns/rows props, selection and pagination',
      keywords: ['data grid', 'data table', 'selectable rows'],
    },
    Badge: {
      purpose: 'Small label or count',
      keywords: ['badge', 'counter', 'status label', 'pill'],
    },
    Tag: {
      purpose: 'Category chip, clickable or removable',
      keywords: ['tag', 'chip', 'filter chip', 'token'],
    },
  },

  Utilities: {
    VisuallyHidden: {
      purpose: 'Content for screen readers only',
      keywords: ['sr-only', 'screen reader text', 'visually hidden'],
    },
    Announce: {
      purpose: 'aria-live region announcing dynamic changes',
      keywords: ['live region', 'aria-live', 'announce'],
    },
    Transition: {
      purpose: 'framer-motion enter/exit animations',
      keywords: ['animation', 'fade', 'slide', 'collapse animation'],
    },
  },
};
