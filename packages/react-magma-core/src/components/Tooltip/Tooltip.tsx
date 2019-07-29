import * as React from 'react';
import { generateId } from '../utils';

export interface TooltipCoreProps {
  children: (props) => React.ReactNode;
  id?: string;
  onKeyDown?: (event: React.SyntheticEvent) => void;
  // onBlur?: () => void;
  // onFocus?: () => void;
  // hideTooltip: () => void;
  // showTooltip: () => void;
  isVisible?: boolean;
}

export interface TooltipCoreState {
  id?: string;
  isVisible?: boolean;
}

export class TooltipCore extends React.Component<
  TooltipCoreProps,
  TooltipCoreState
> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      isVisible: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ id: generateId(this.props.id) });
    }

    if (prevProps.isVisible !== this.props.isVisible) {
      this.setState({ isVisible: this.props.isVisible });
    }
  }

  onKeyDown(event) {
    if (event.key === 'Escape') {
      this.hideTooltip();
    }
  }

  hideTooltip() {
    this.setState({ isVisible: false });
  }

  showTooltip() {
    this.setState({ isVisible: true });
  }

  render() {
    return this.props.children({
      ...this.props,
      id: this.state.id,
      onKeyDown: this.onKeyDown,
      hideTooltip: this.hideTooltip,
      showTooltip: this.showTooltip,
      isVisible: this.state.isVisible
    });
  }
}
