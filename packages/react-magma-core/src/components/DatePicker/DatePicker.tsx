import * as React from 'react';
import {
  getCalendarMonthWeeks,
  getPrevMonthFromDate,
  getNextMonthFromDate,
  handleKeyPress
} from './utils';
import { generateId } from '../utils';

export interface DatePickerCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  calendarOpened?: boolean;
  defaultDate?: Date;
  onDayClick?: (day: any, event: React.SyntheticEvent) => void;
}

interface DatePickerState {
  id?: string;
  calendarOpened: boolean;
  focusedDate: Date;
  chosenDate?: Date;
  dateFocused?: boolean;
  showHelperInformation?: boolean;
}

export class DatePickerCore extends React.Component<
  DatePickerCoreProps,
  DatePickerState
> {
  initialState: DatePickerState = {
    id: generateId(this.props.id),
    calendarOpened: this.props.calendarOpened,
    focusedDate: this.props.defaultDate || new Date(),
    chosenDate: this.props.defaultDate
  };
  state: DatePickerState = this.initialState;

  constructor(props) {
    super(props);

    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.openHelperInformation = this.openHelperInformation.bind(this);
    this.closeHelperInformation = this.closeHelperInformation.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onDateFocus = this.onDateFocus.bind(this);
    this.onCalendarBlur = this.onCalendarBlur.bind(this);
    this.onHelperFocus = this.onHelperFocus.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onQuestionMarkKey = this.onQuestionMarkKey.bind(this);
    this.onEscKey = this.onEscKey.bind(this);
    this.onDayChangedByKeyboardNavigation = this.onDayChangedByKeyboardNavigation.bind(
      this
    );
    this.onDayClick = this.onDayClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  buildCalendarMonth(date: Date, enableOutsideDates: boolean) {
    return getCalendarMonthWeeks(date, enableOutsideDates);
  }

  onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === '?') {
      event.preventDefault();
      this.openHelperInformation();
    }
  }

  openHelperInformation() {
    this.onQuestionMarkKey();
  }

  closeHelperInformation() {
    this.setState({
      showHelperInformation: false
    });
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
      const isInCalendar = currentTarget.contains(document.activeElement);

      if (!isInCalendar) {
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
    if (this.state.dateFocused && document.activeElement.closest('table')) {
      const newChosenDate = handleKeyPress(
        event,
        this.state.focusedDate,
        this.onEscKey,
        this.onQuestionMarkKey,
        this.onDayClick
      );
      if (newChosenDate) {
        this.onDayChangedByKeyboardNavigation(newChosenDate);
      }
    } else {
      if (event.key === 'Escape') {
        this.onEscKey();
      }

      if (event.key === '?') {
        this.onQuestionMarkKey();
      }
    }
  }

  onEscKey() {
    this.setState({ calendarOpened: false });
  }

  onQuestionMarkKey() {
    this.setState({
      showHelperInformation: true
    });
  }

  onDayChangedByKeyboardNavigation(day) {
    this.setState({ focusedDate: day });
  }

  onDayClick(day, event) {
    this.props.onDayClick && this.props.onDayClick(day, event);

    this.setState({ chosenDate: day, calendarOpened: false });
  }

  render() {
    const {
      calendarOpened,
      chosenDate,
      focusedDate,
      dateFocused,
      showHelperInformation
    } = this.state;

    return this.props.children({
      ...this.props,
      id: this.state.id,
      calendarOpened,
      chosenDate,
      focusedDate,
      dateFocused,
      showHelperInformation,
      buildCalendarMonth: this.buildCalendarMonth,
      onCalendarBlur: this.onCalendarBlur,
      onInputKeyDown: this.onInputKeyDown,
      openHelperInformation: this.openHelperInformation,
      closeHelperInformation: this.closeHelperInformation,
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
