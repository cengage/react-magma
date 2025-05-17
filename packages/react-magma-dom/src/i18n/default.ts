import { I18nInterface } from './interface';

export const defaultI18n: I18nInterface = {
  locale: null,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12',
  example:
    'i18n defaults must be set in packages/react-magma-dom/src/i18n/default.ts',
  months: {
    long: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
    },
    short: {
      january: 'Jan',
      february: 'Feb',
      march: 'Mar',
      april: 'Apr',
      may: 'May',
      june: 'Jun',
      july: 'Jul',
      august: 'Aug',
      september: 'Sep',
      october: 'Oct',
      november: 'Nov',
      december: 'Dec',
    },
  },
  days: {
    long: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    short: {
      monday: 'Mon',
      tuesday: 'Tues',
      wednesday: 'Wed',
      thursday: 'Thur',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    },
    min: {
      monday: 'M',
      tuesday: 'T',
      wednesday: 'W',
      thursday: 'T',
      friday: 'F',
      saturday: 'S',
      sunday: 'S',
    },
  },
  emptyItemsListText: 'No Options',
  alert: {
    dismissAriaLabel: 'Close this message',
  },
  breadcrumb: {
    navAriaLabel: 'Breadcrumb',
  },
  characterCounter: {
    characterAllowed: 'character allowed',
    charactersAllowed: 'characters allowed',
    characterLeft: 'character left',
    charactersLeft: 'characters left',
    characterOver: 'character over limit',
    charactersOver: 'characters over limit',
  },
  charts: {
    line: {
      chartTabLabel: 'Chart',
      dataLegendsLabel:
        'Select one or more of the categories below to filter out the ones you don’t want to see.',
      dataTabLabel: 'Data',
      keyboardInstructions:
        'In the chart below, use your up and down arrows to move between each line. Use your left and right arrows to move between points on a line.',
      keyboardInstructionsHeader: 'Keyboard Instructions',
      keyboardInstructionsTooltip: 'Keyboard Instructions',
      legendButtonAriaLabel: 'Toggle data for {name}',
    },
  },
  combobox: {
    clearIndicatorAriaLabel:
      'reset selection for {labelText}. {selectedItem} is selected',
    createLabel: 'Create "{inputValue}"',
    multi: {
      clearIndicatorAriaLabel:
        'reset selection for {labelText}. {selectedItem} are selected',
    },
    loading: 'Loading...',
  },
  datePicker: {
    startOfWeek: 'sunday',
    calendarIconAriaLabel: 'Toggle Calendar Widget',
    calendarOpenAnnounce: 'Calendar Widget is now open.',
    calendarCloseAriaLabel: 'Close Calendar Widget',
    calendarNavigateHelperInstruction:
      'Use Command + Arrow keys to navigate dates in Safari on macOS',
    previousMonthAriaLabel: 'Previous Month',
    nextMonthAriaLabel: 'Next Month',
    disabledDayAriaLabel: 'Not Available. ',
    selectedDayAriaLabel: '(Selected)',
    todayAriaLabel: '(Today)',
    helpModal: {
      header: 'Keyboard Shortcuts',
      helpButtonAriaLabel: 'Calendar Widget Help',
      enter: {
        ariaLabel: 'Enter key',
        explanation: 'Select the date in focus.',
      },
      rightAndLeftArrowKeys: {
        ariaLabel: 'Right and left arrow keys',
        explanation: 'Move backward (left) and forward (right) by one day.',
      },
      upAndDownArrowKeys: {
        ariaLabel: 'up and down arrow keys',
        explanation: 'Move backward (up) and forward (down) by one week.',
      },
      pageUpAndPageDownKeys: {
        ariaLabel: 'page up and page down keys',
        displayValue: 'PGUP/PGDN',
        explanation: 'Switch months.',
      },
      homeAndEndKeys: {
        ariaLabel: 'Home and end keys',
        displayValue: 'HOME/END',
        explanation: 'Go to the first or last day of a week.',
      },
      escape: {
        ariaLabel: 'Escape key',
        displayValue: 'ESC',
        explanation: 'Return to the date input field.',
      },
    },
  },
  dropdown: {
    menuItemSelectedAriaLabel: '(selected)',
    toggleMenuAriaLabel: 'Toggle menu',
  },
  dropzone: {
    browseFiles: 'Browse Files',
    dragMessage: 'Drag and drop or browse files to upload.',
    errors: {
      'too-many-errors': {
        message: 'Files must not have any errors.',
      },
      'too-many-files': {
        message: 'You must upload a maximum of',
      },
      'too-few-files': {
        message: 'You must upload a minimum of',
      },
      'file-invalid-type': {
        header: 'Invalid File Type',
        message: 'Upload only the allowed file types',
      },
      'file-too-large': {
        header: 'File exceeds size limit',
        message: 'Upload only files with a maximum size of',
      },
      'file-too-small': {
        header: 'File size is below the limit',
        message: 'Upload only files with a minimum size of',
      },
      required: {
        message: 'You must upload at least one file.',
      },
    },
    files: 'files',
    bytes: 'Bytes',
    deleteFile: 'Delete file',
    removeFile: 'Remove file',
  },
  header: {
    navigationButtonLabel: 'Open navigation menu',
    search: {
      input: {
        ariaLabel: 'Search',
        placeholder: 'Search',
      },
      iconAriaLabel: 'Search',
    },
  },
  indeterminateCheckbox: {
    isCheckedAnnounce: 'All subitems are checked for {labelText} checkbox',
    isIndeterminateAnnounce:
      'Some, but not all, subitems are checked for {labelText} checkbox',
    isUncheckedAnnounce: 'No subitems are checked for {labelText} checkbox',
  },
  input: {
    isClearableAriaLabel: 'Clear Input',
  },
  loadingIndicator: {
    progressBar: {
      messages: {
        first: 'Please be patient as this could take up to a minute to load.',
        second: 'Thank you for your patience. Still loading...',
        third: 'Thank you for waiting.  We’re almost there!',
      },
    },
    spinner: {
      messages: {
        first: 'Loading...',
        second: 'Thank you for your patience. Still loading...',
        third: 'Sorry for the delay. This is taking longer than expected.',
      },
    },
  },
  modal: {
    closeAriaLabel: 'Close dialog',
  },
  multiSelect: {
    placeholder: 'Select...',
    selectedItemButtonAriaLabel: 'reset item {selectedItem}',
  },
  multiCombobox: {
    selectedItemButtonAriaLabel: 'reset item {selectedItem}',
  },
  pagination: {
    nextButtonLabel: 'Next Page',
    previousButtonLabel: 'Previous Page',
    pageButtonLabel: 'Go to Page',
  },
  password: {
    shown: {
      ariaLabel:
        'Show password. Note: this will visually expose your password on the screen',
      buttonText: 'Show',
      announce: 'Password is now visible',
    },
    hidden: {
      ariaLabel: 'Hide password',
      buttonText: 'Hide',
      announce: 'Password is now hidden',
    },
  },
  search: {
    input: {
      ariaLabel: 'Search',
      placeholder: 'Search',
    },
    iconAriaLabel: 'Search',
  },
  select: {
    placeholder: 'Select...',
    clearIndicatorAriaLabel:
      'reset selection for {labelText}. {selectedItem} is selected',
    multi: {
      clearIndicatorAriaLabel:
        'reset selection for {labelText}. {selectedItem} are selected',
    },
  },
  simplePagination: {
    ofLabel: 'of',
    pageLabel: 'page',
    pagesLabel: 'pages',
    pageNumberLabel: 'Page number',
    selectedLabel: 'selected',
  },
  skipLink: {
    buttonText: 'Skip Navigation',
  },
  spinner: {
    ariaLabel: 'Loading',
  },
  stepper: {
    completionLabel: 'All steps completed',
    stepLabel: 'Step',
    stepOfLabel: 'of',
  },
  table: {
    pagination: {
      ofLabel: 'of',
      nextAriaLabel: 'Next page',
      previousAriaLabel: 'Previous page',
      rowsPerPageLabel: 'Rows per page',
    },
    selectable: {
      sortButtonAriaLabel: 'Sort rows',
      selectAllRowsAriaLabel: 'Select all rows',
      selectRowAriaLabel: 'Select row',
      deselectAllRowsAriaLabel: 'Deselect all rows',
      deselectRowAriaLabel: 'Deselect row',
    },
  },
  tabs: {
    horizontalTabsInstructions:
      'use the right and left arrow keys to activate other tabs',
    verticalTabsInstructions:
      'use the down and up arrow keys to activate other tabs',
    nextButtonLabel: 'Scroll tabs forward',
    previousButtonLabel: 'Scroll tabs back',
  },
  tag: {
    deleteAriaLabel: 'Delete {labelText} tag',
  },
  timePicker: {
    hoursAriaLabel: 'Hour',
    minutesAriaLabel: 'Minute',
    amButtonAriaLabel:
      'AM selected.  To change to PM press the p or enter button.',
    pmButtonAriaLabel:
      'PM selected.  To change to AM press the a or enter button.',
    amSelectedAnnounce: 'AM is now selected',
    pmSelectedAnnounce: 'PM is now selected',
  },
  wizard: {
    actions: {
      next: 'next',
      previous: 'previous',
      cancel: 'cancel',
      submit: 'submit',
    },
    optional: 'optional',
    navigationLabel: 'Navigation for the wizard',
  },
};
