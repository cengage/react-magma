import { Locale } from 'date-fns';

export interface I18nInterface {
  example: string;
  locale: Locale;
  dateFormat:
    | 'MM/dd/yyyy'
    | 'dd/MM/yyyy'
    | 'yyyy/MM/dd'
    | 'yyyy/dd/MM'
    | 'MMMM d, yyyy';
  timeFormat: '12' | '24';
  months: {
    long: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
    short: {
      january: string;
      february: string;
      march: string;
      april: string;
      may: string;
      june: string;
      july: string;
      august: string;
      september: string;
      october: string;
      november: string;
      december: string;
    };
  };
  days: {
    long: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    short: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    min: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  };
  emptyItemsListText: string;
  alert: {
    dismissAriaLabel: string;
  };
  breadcrumb: {
    navAriaLabel: string;
  };
  characterCounter: {
    characterAllowed: string;
    charactersAllowed: string;
    characterLeft: string;
    charactersLeft: string;
    characterOver: string;
    charactersOver: string;
  };
  charts: {
    line: {
      chartTabLabel: string;
      dataLegendsLabel: string;
      dataTabLabel: string;
      keyboardInstructions: string;
      keyboardInstructionsHeader: string;
      keyboardInstructionsTooltip: string;
      legendButtonAriaLabel: string;
    };
  };
  combobox: {
    clearIndicatorAriaLabel: string;
    createLabel: string;
    multi: {
      clearIndicatorAriaLabel: string;
    };
    loading: string;
  };
  datePicker: {
    startOfWeek:
      | 'sunday'
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday';
    calendarIconAriaLabel: string;
    calendarOpenAnnounce: string;
    calendarCloseAriaLabel: string;
    previousMonthAriaLabel: string;
    nextMonthAriaLabel: string;
    disabledDayAriaLabel: string;
    selectedDayAriaLabel: string;
    todayAriaLabel: string;

    helpModal: {
      header: string;
      helpButtonAriaLabel: string;
      enter: {
        ariaLabel: string;
        explanation: string;
      };
      rightAndLeftArrowKeys: {
        ariaLabel: string;
        explanation: string;
      };
      upAndDownArrowKeys: {
        ariaLabel: string;
        explanation: string;
      };
      pageUpAndPageDownKeys: {
        ariaLabel: string;
        displayValue: string;
        explanation: string;
      };
      homeAndEndKeys: {
        ariaLabel: string;
        displayValue: string;
        explanation: string;
      };
      escape: {
        ariaLabel: string;
        displayValue: string;
        explanation: string;
      };
      questionMark: {
        ariaLabel: string;
        explanation: string;
      };
    };
  };
  dropdown: {
    menuItemSelectedAriaLabel: string;
    toggleMenuAriaLabel: string;
  };
  dropzone: {
    browseFiles: string;
    dragMessage: string;
    errors: {
      [key: string]: {
        header?: string;
        message: string;
      };
    };
    files: string;
    bytes: string;
    deleteFile: string;
    removeFile: string;
  };
  header: {
    navigationButtonLabel: string;
    search: {
      input: {
        ariaLabel: string;
        placeholder: string;
      };
      iconAriaLabel: string;
    };
  };
  indeterminateCheckbox: {
    isCheckedAnnounce: string;
    isIndeterminateAnnounce: string;
    isUncheckedAnnounce: string;
  };
  input: {
    isClearableAriaLabel: string;
  };
  loadingIndicator: {
    progressBar: {
      messages: {
        first: string;
        second: string;
        third: string;
      };
    };
    spinner: {
      messages: {
        first: string;
        second: string;
        third: string;
      };
    };
  };
  modal: {
    closeAriaLabel: string;
  };
  multiCombobox: {
    selectedItemButtonAriaLabel: string;
  };
  multiSelect: {
    placeholder: string;
    selectedItemButtonAriaLabel: string;
  };
  pagination: {
    nextButtonLabel: string;
    previousButtonLabel: string;
    pageButtonLabel: string;
  };
  password: {
    shown: {
      ariaLabel: string;
      buttonText: string;
      announce: string;
    };
    hidden: {
      ariaLabel: string;
      buttonText: string;
      announce: string;
    };
  };
  search: {
    input: {
      ariaLabel: string;
      placeholder: string;
    };
    iconAriaLabel: string;
  };
  select: {
    placeholder: string;
    clearIndicatorAriaLabel: string;
  };
  skipLink: {
    buttonText: string;
  };
  spinner: {
    ariaLabel: string;
  };
  table: {
    pagination: {
      ofLabel: string;
      nextAriaLabel: string;
      previousAriaLabel: string;
      rowsPerPageLabel: string;
    };
  };
  tabs: {
    horizontalTabsInstructions: string;
    verticalTabsInstructions: string;
    previousButtonLabel: string;
    nextButtonLabel: string;
  };
  tag: {
    deleteAriaLabel: string;
  };
  timePicker: {
    hoursAriaLabel: string;
    minutesAriaLabel: string;
    amButtonAriaLabel: string;
    pmButtonAriaLabel: string;
    amSelectedAnnounce: string;
    pmSelectedAnnounce: string;
  };
  wizard: {
    navigationLabel: string;
    optional: string;
    actions: {
      previous: string;
      next: string;
      submit: string;
      cancel: string;
    };
  };
}
