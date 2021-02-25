import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';

export enum FlexAlignContent {
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  stretch = 'stretch', // default
}

export enum FlexAlignItems {
  baseline = 'baseline',
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  stretch = 'stretch', // default
}

export enum FlexDirection {
  column = 'column',
  columnReverse = 'column-reverse',
  row = 'row', // default
  rowReverse = 'row-reverse',
}

export enum FlexJustify {
  center = 'center',
  flexStart = 'flex-start', //default
  flexEnd = 'flex-end',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

export enum FlexWrap {
  nowrap = 'nowrap',
  wrap = 'wrap', //default
  wrapReverse = 'wrap-reverse',
}

/**
 * @children required
 */
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  alignContent?: FlexAlignContent;
  alignItems?: FlexAlignItems;
  direction?: any;
  isContainer?: boolean;
  isItem?: boolean;
  justify?: FlexJustify;
  spacing?: number;
  testId?: string;
  wrap?: FlexWrap;
  xs?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: false | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

function getWidth(size) {
  return `${Math.round((size / 12) * 10e7) / 10e5}%`;
}

const StyledFlex = styled.div<FlexProps>`
  ${props =>
    props.isContainer &&
    css`
      align-content: ${props.alignContent};
      align-items: ${props.alignItems};
      flex-direction: ${props.direction};
      justify-content: ${props.justify};
      flex-wrap: ${props.wrap};
      display: flex;
      margin: ${0 - props.spacing * 4}px;
      width: calc(100% + ${props.spacing * props.theme.spacingMultiplier}px);

      > div {
        padding: ${props.spacing * 4}px;
      }
    `};

  ${props =>
    props.isItem &&
    css`
      flex-grow: ${props.xs === true ? '1' : '0'};
      flex-basis: ${props.xs === true ? '0' : getWidth(props.xs)};
      max-width: ${props.xs === true ? '100%' : getWidth(props.xs)};

      ${props.sm &&
      css`
        @media (min-width: ${props.theme.breakpoints.small}px) {
          flex-grow: ${props.sm === true ? '1' : '0'};
          flex-basis: ${props.sm === true ? '0' : getWidth(props.sm)};
          max-width: ${props.sm === true ? '100%' : getWidth(props.sm)};
        }
      `};

      ${props.md &&
      css`
        @media (min-width: ${props.theme.breakpoints.medium}px) {
          flex-grow: ${props.md === true ? '1' : '0'};
          flex-basis: ${props.md === true ? '0' : getWidth(props.md)};
          max-width: ${props.md === true ? '100%' : getWidth(props.md)};
        }
      `};

      ${props.lg &&
      css`
        @media (min-width: ${props.theme.breakpoints.large}px) {
          flex-grow: ${props.lg === true ? '1' : '0'};
          flex-basis: ${props.lg === true ? '0' : getWidth(props.lg)};
          max-width: ${props.lg === true ? '100%' : getWidth(props.lg)};
        }
      `};

      ${props.xl &&
      css`
        @media (min-width: ${props.theme.breakpoints.xl}px) {
          flex-grow: ${props.xl === true ? '1' : '0'};
          flex-basis: ${props.xl === true ? '0' : getWidth(props.xl)};
          max-width: ${props.xl === true ? '100%' : getWidth(props.xl)};
        }
      `};
    `};
`;

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (props, ref) => {
    const {
      children,
      alignContent = FlexAlignContent.stretch,
      alignItems = FlexAlignItems.stretch,
      direction = FlexDirection.row,
      isContainer = false,
      isItem = false,
      justify = FlexJustify.flexStart,
      spacing = 0,
      testId,
      wrap = FlexWrap.wrap,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);

    return (
      <StyledFlex
        {...other}
        alignContent={alignContent}
        alignItems={alignItems}
        data-testid={testId}
        direction={direction}
        isContainer={isContainer}
        isItem={isItem}
        justify={justify}
        ref={ref}
        spacing={spacing}
        theme={theme}
        wrap={wrap}
      >
        {children}
      </StyledFlex>
    );
  }
);
