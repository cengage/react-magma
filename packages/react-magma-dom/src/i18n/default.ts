import { Locale } from 'date-fns';

export interface I18nInterface {
  locale: Locale;
  dateFormat: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy/MM/dd' | 'yyyy/dd/MM';
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
  alert: {
    dismissAriaLabel: string;
  };
  breadcrumb: {
    navAriaLabel: string;
  };
  modal: {
    closeAriaLabel: string;
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
  spinner: {
    ariaLabel: string;
  };
  timePicker: {
    hoursAriaLabel: string;
    minutesAriaLabel: string;
    am: string;
    pm: string;
  };
  datePicker: {
    startOfWeek: string;
    calendarIconAriaLabel: string;
    calendarOpenAnnounce: string;
    calendarCloseAriaLabel: string;
    previousMonthAriaLabel: string;
    nextMonthAriaLabel: string;
    disabledDayAriaLabel: string;
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
        explanation: string;
      };
      homeAndEndKeys: {
        ariaLabel: string;
        explanation: string;
      };
      escape: {
        ariaLabel: string;
        explanation: string;
      };
      questionMark: {
        ariaLabel: string;
        explanation: string;
      };
    };
  };
  loadingIndicator: {
    messages: {
      first: string;
      second: string;
      third: string;
    };
  };
  skipLink: {
    buttonText: string;
  };
}

export const defaultI18n: I18nInterface = {
  locale: null,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12',
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
      december: 'December'
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
      december: 'Dec'
    }
  },
  days: {
    long: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    },
    short: {
      monday: 'Mon',
      tuesday: 'Tues',
      wednesday: 'Wed',
      thursday: 'Thur',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun'
    },
    min: {
      monday: 'M',
      tuesday: 'T',
      wednesday: 'W',
      thursday: 'T',
      friday: 'F',
      saturday: 'S',
      sunday: 'S'
    }
  },
  alert: {
    dismissAriaLabel: 'Close this message'
  },
  breadcrumb: {
    navAriaLabel: 'Breadcrumb'
  },
  modal: {
    closeAriaLabel: 'Close dialog'
  },
  password: {
    shown: {
      ariaLabel:
        'Show password. Note: this will visually expose your password on the screen',
      buttonText: 'Show',
      announce: 'Password is now visible'
    },
    hidden: {
      ariaLabel: 'Hide password',
      buttonText: 'Hide',
      announce: 'Password is now hidden'
    }
  },
  search: {
    input: {
      ariaLabel: 'Search',
      placeholder: 'Search'
    },
    iconAriaLabel: 'Search'
  },
  spinner: {
    ariaLabel: 'Loading'
  },
  timePicker: {
    hoursAriaLabel: 'Hours Aria Label',
    minutesAriaLabel: 'Minutes Aria Label',
    am: 'AM',
    pm: 'PM'
  },
  datePicker: {
    startOfWeek: 'sunday',
    calendarIconAriaLabel: 'Calendar',
    calendarOpenAnnounce:
      'Calendar widget is now open. Press the question mark key to get the keyboard shortcuts for changing dates.',
    calendarCloseAriaLabel: 'Close Calendar',
    previousMonthAriaLabel: 'Previous Month',
    nextMonthAriaLabel: 'Next Month',
    disabledDayAriaLabel: 'Not Available. ',
    helpModal: {
      header: 'Keyboard Shortcuts',
      helpButtonAriaLabel: 'Calendar Help',
      enter: {
        ariaLabel: 'Enter key',
        explanation: 'Select the date in focus.'
      },
      rightAndLeftArrowKeys: {
        ariaLabel: 'Right and left arrow keys',
        explanation: 'Move backward (left) and forward (right) by one day.'
      },
      upAndDownArrowKeys: {
        ariaLabel: 'up and down arrow keys',
        explanation: 'Move backward (up) and forward (down) by one week.'
      },
      pageUpAndPageDownKeys: {
        ariaLabel: 'page up and page down keys',
        explanation: 'Switch months.'
      },
      homeAndEndKeys: {
        ariaLabel: 'Home and end keys',
        explanation: 'Go to the first or last day of a week.'
      },
      escape: {
        ariaLabel: 'Escape key',
        explanation: 'Return to the date input field.'
      },
      questionMark: {
        ariaLabel: 'Question Mark',
        explanation: 'Open this panel.'
      }
    }
  },
  loadingIndicator: {
    messages: {
      first: 'Message One',
      second: 'Message Two',
      third: 'Message Three'
    }
  },
  skipLink: {
    buttonText: 'Skip Link Button Text'
  }
};
