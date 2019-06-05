import * as React from 'react';
import {
  getCalendarMonthWeeks,
  getPrevMonthFromDate,
  getNextMonthFromDate,
  handleKeyPress
} from './utils';

export interface DatePickerCoreProps {
  children: (props) => React.ReactNode;
  calendarOpened?: boolean;
  defaultDate?: Date;
  onDayClick?: (day: any, event: React.SyntheticEvent) => void;
}

interface DatePickerState {
  calendarOpened: boolean;
  focusedDate: Date;
  chosenDate?: Date;
  dateFocused?: boolean;
}

export class DatePickerCore extends React.Component<
  DatePickerCoreProps,
  DatePickerState
> {
  initialState: DatePickerState = {
    calendarOpened: this.props.calendarOpened,
    focusedDate: this.props.defaultDate || new Date(),
    chosenDate: this.props.defaultDate
  };
  state: DatePickerState = this.initialState;

  constructor(props) {
    super(props);

    this.onInputFocus = this.onInputFocus.bind(this);
    this.onDateFocus = this.onDateFocus.bind(this);
    this.onCalendarBlur = this.onCalendarBlur.bind(this);
    this.onHelperFocus = this.onHelperFocus.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
    this.onDayChangedByKeyboardNavigation = this.onDayChangedByKeyboardNavigation.bind(
      this
    );
    this.onDayClick = this.onDayClick.bind(this);
  }

  buildCalendarMonth(date: Date, enableOutsideDates: boolean) {
    return getCalendarMonthWeeks(date, enableOutsideDates);
  }

  onInputFocus() {
    this.setState({ calendarOpened: true });
  }

  onDateFocus() {
    this.setState({ dateFocused: true });
  }

  onHelperFocus() {
    this.setState({ dateFocused: false });
  }

  onCalendarBlur(event) {
    const { currentTarget } = event;

    // timeout needed for active element to update. Browser behavior.
    // https://bugzilla.mozilla.org/show_bug.cgi?id=452307
    setTimeout(() => {
      const isInStuff = currentTarget.contains(document.activeElement);

      if (!isInStuff) {
        this.setState({ calendarOpened: false });
      }
    }, 0);
  }

  onPrevMonthClick() {
    this.onDayChangedByKeyboardNavigation(
      getPrevMonthFromDate(this.state.focusedDate)
    );
  }

  onNextMonthClick() {
    this.onDayChangedByKeyboardNavigation(
      getNextMonthFromDate(this.state.focusedDate)
    );
  }

  onKeyDown(event: React.KeyboardEvent) {
    if (this.state.dateFocused) {
      const newChosenDate = handleKeyPress(
        event,
        this.state.focusedDate,
        this.onEscKey,
        this.onDayClick
      );
      if (newChosenDate) {
        this.onDayChangedByKeyboardNavigation(newChosenDate);
      }
    }
  }

  onEscKey() {
    this.setState({ calendarOpened: false });
  }

  onDayChangedByKeyboardNavigation(day) {
    this.setState({ focusedDate: day });
  }

  onDayClick(day, event) {
    this.props.onDayClick && this.props.onDayClick(day, event);

    this.setState({ chosenDate: day, calendarOpened: false });
  }

  render() {
    const { calendarOpened, chosenDate, focusedDate, dateFocused } = this.state;

    return this.props.children({
      ...this.props,
      calendarOpened,
      chosenDate,
      focusedDate,
      dateFocused,
      buildCalendarMonth: this.buildCalendarMonth,
      onCalendarBlur: this.onCalendarBlur,
      onInputFocus: this.onInputFocus,
      onDateFocus: this.onDateFocus,
      onHelperFocus: this.onHelperFocus,
      onPrevMonthClick: this.onPrevMonthClick,
      onNextMonthClick: this.onNextMonthClick,
      onKeyDown: this.onKeyDown,
      onDayClick: this.onDayClick
    });
  }
}
