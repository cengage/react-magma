import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/themeContext';
import { generateId } from '../utils';

export enum ITooltipPosition {
  bottom = 'bottom', //default
  left = 'left',
  right = 'right',
  top = 'top'
}

export interface ITooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: React.ReactNode;
  position?: ITooltipPosition;
  trigger: React.ReactElement;
}

export interface ITooltipState {
  id?: string;
  isVisible?: boolean;
}

const ToolTipContainer = styled.div`
  display: inline;
  position: relative;
`;

const StyledTooltip = styled.span<{
  position: ITooltipPosition;
  visible?: boolean;
}>`
  background: ${props => props.theme.colors.neutral02};
  border-radius: 3px;
  color: ${props => props.theme.colors.neutral08};
  display: ${props => (props.visible ? 'block' : 'none')};
  font-size: 12px;
  font-weight: 600;
  max-width: 200px;
  min-width: 100px;
  padding: 3px 5px;
  position: absolute;
  text-align: center;
  z-index: 999;

  &:before,
  &:after {
    border-left-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.theme.colors.neutral02
        : 'transparent'};
    border-right-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? props.theme.colors.neutral02
        : 'transparent'};
    border-top-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.theme.colors.neutral02};
    border-bottom-color: ${props =>
      props.position === 'left' || props.position === 'right'
        ? 'transparent'
        : props.theme.colors.neutral02};
    border-style: solid;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
  }

  ${props =>
    props.position === 'bottom' &&
    css`
      top: 100%;
      margin-top: 10px;
      left: 50%;
      transform: translateX(-50%);

      &:after {
        border-width: 0 5px 5px 5px;
        bottom: auto;
        top: -5px;
      }

      &:before {
        bottom: auto;
        border-width: 0 7px 7px 7px;
        top: -7px;
      }
    `}

  ${props =>
    props.position === 'left' &&
    css`
      right: 100%;
      margin-right: 10px;
      top: 50%;
      transform: translateY(-50%);

      &:before,
      &:after {
        left: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        right: -5px;
        border-width: 5px 0 5px 5px;
      }

      &:before {
        right: -7px;
        border-width: 7px 0 7px 7px;
      }
    `}

  ${props =>
    props.position === 'right' &&
    css`
      left: 100%;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);

      &:before,
      &:after {
        right: auto;
        top: 50%;
        transform: translateY(-50%);
      }

      &:after {
        left: -5px;
        border-width: 5px 5px 5px 0;
      }

      &:before {
        left: -7px;
        border-width: 7px 7px 7px 0;
      }
    `}

  ${props =>
    props.position === 'top' &&
    css`
      bottom: 100%;
      margin-bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      &:after {
        bottom: -5px;
        top: auto;
        border-width: 5px 5px 0 5px;
      }

      &:before {
        bottom: -7px;
        top: auto;
        border-width: 7px 7px 0 7px;
      }
    `}
`;

export class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  constructor(props) {
    super(props);

    this.state = {
      id: generateId(this.props.id),
      isVisible: false
    };
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.setState({ isVisible: false });
    }
  };

  hideTooltip = () => {
    this.setState({ isVisible: false });
  };

  showTooltip = () => {
    this.setState({ isVisible: true });
  };

  render() {
    const { trigger, position, content } = this.props;

    return (
      <ToolTipContainer>
        {React.cloneElement(trigger, {
          'aria-describedby': this.state.id,
          onKeyDown: e => {
            this.handleKeyDown(e);
          },
          onBlur: this.hideTooltip,
          onFocus: this.showTooltip,
          onMouseLeave: this.hideTooltip,
          onMouseEnter: this.showTooltip
        })}
        <ThemeContext.Consumer>
          {theme => (
            <StyledTooltip
              id={this.state.id}
              position={position ? position : ITooltipPosition.top}
              role="tooltip"
              visible={this.state.isVisible}
              theme={theme}
            >
              {content}
            </StyledTooltip>
          )}
        </ThemeContext.Consumer>
      </ToolTipContainer>
    );
  }
}
