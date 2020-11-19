import * as React from 'react';
import {
  getCalendarMonthWeeks,
  getPrevMonthFromDate,
  getNextMonthFromDate,
} from './utils';
import { generateId } from '../utils';

export interface DatePickerCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  calendarOpened?: boolean;
  defaultDate?: Date;
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
    chosenDate: this.props.defaultDate,
  };
  state: DatePickerState = this.initialState;

  constructor(props) {
    super(props);

    this.openHelperInformation = this.openHelperInformation.bind(this);
    this.closeHelperInformation = this.closeHelperInformation.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    this.toggleDateFocus = this.toggleDateFocus.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.onHelperFocus = this.onHelperFocus.bind(this);
    this.onPrevMonthClick = this.onPrevMonthClick.bind(this);
    this.onNextMonthClick = this.onNextMonthClick.bind(this);
    this.updateFocusedDate = this.updateFocusedDate.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }
  }

  buildCalendarMonth(date: Date, enableOutsideDates: boolean) {
    return getCalendarMonthWeeks(date, enableOutsideDates);
  }

  openHelperInformation() {
    this.setState({
      showHelperInformation: true,
    });
  }

  closeHelperInformation() {
    this.setState({
      showHelperInformation: false,
    });
  }

  onIconClick() {
    this.setState({ calendarOpened: !this.state.calendarOpened });
  }

  toggleDateFocus(dateFocused: boolean) {
    this.setState({ dateFocused });
  }

  onHelperFocus() {
    this.setState({ dateFocused: false });
  }

  toggleCalendar(calendarOpened: boolean) {
    this.setState({ calendarOpened });
  }

  onPrevMonthClick() {
    this.setState({
      focusedDate: getPrevMonthFromDate(this.state.focusedDate),
    });
  }

  onNextMonthClick() {
    this.setState({
      focusedDate: getNextMonthFromDate(this.state.focusedDate),
    });
  }

  updateFocusedDate(day: Date) {
    this.setState({ focusedDate: day });
  }

  onDateChange(day: Date) {
    this.setState({ chosenDate: day, calendarOpened: false });
  }

  reset() {
    this.setState({
      focusedDate: new Date(),
      chosenDate: null,
      dateFocused: false,
    });
  }

  render() {
    const {
      calendarOpened,
      chosenDate,
      focusedDate,
      dateFocused,
      id,
      showHelperInformation,
    } = this.state;

    return this.props.children({
      ...this.props,
      id,
      calendarOpened,
      chosenDate,
      focusedDate,
      dateFocused,
      showHelperInformation,
      buildCalendarMonth: this.buildCalendarMonth,
      toggleCalendar: this.toggleCalendar,
      openHelperInformation: this.openHelperInformation,
      closeHelperInformation: this.closeHelperInformation,
      onIconClick: this.onIconClick,
      toggleDateFocus: this.toggleDateFocus,
      onHelperFocus: this.onHelperFocus,
      onPrevMonthClick: this.onPrevMonthClick,
      onNextMonthClick: this.onNextMonthClick,
      updateFocusedDate: this.updateFocusedDate,
      onDateChange: this.onDateChange,
      reset: this.reset,
    });
  }
}
