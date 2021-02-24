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
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  testId?: string;
  wrap?: FlexWrap;
  xs?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xl?: false | 'auto' | true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
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
      flex-grow: 0;
      flex-basis: ${getWidth(props.xs)};
      max-width: ${getWidth(props.xs)};

      ${props.sm &&
      css`
        @media (min-width: ${props.theme.breakpoints.small}px) {
          flex-basis: ${getWidth(props.sm)};
          max-width: ${getWidth(props.sm)};
        }
      `};

      ${props.md &&
      css`
        @media (min-width: ${props.theme.breakpoints.medium}px) {
          flex-basis: ${getWidth(props.md)};
          max-width: ${getWidth(props.md)};
        }
      `};

      ${props.lg &&
      css`
        @media (min-width: ${props.theme.breakpoints.large}px) {
          flex-basis: ${getWidth(props.lg)};
          max-width: ${getWidth(props.lg)};
        }
      `};

      ${props.xl &&
      css`
        @media (min-width: ${props.theme.breakpoints.xl}px) {
          flex-basis: ${getWidth(props.xl)};
          max-width: ${getWidth(props.xl)};
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
