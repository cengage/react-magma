import * as React from 'react';

import styled from '@emotion/styled';
import * as CSS from 'csstype';

export enum GridDisplay {
  grid = 'grid', // default
  inlineGrid = 'inline-grid',
}

export enum GridJustifyItems {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridJustifyContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export enum GridAlignItems {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridAlignContent {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
  spaceAround = 'space-around',
  spaceBetween = 'space-between',
  spaceEvenly = 'space-evenly',
}

export enum GridItemJustifySelf {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridItemAlignSelf {
  start = 'start',
  end = 'end',
  center = 'center',
  stretch = 'stretch',
}

export enum GridAutoFlow {
  row = 'row',
  column = 'column',
  rowDense = 'row-dense',
  columnDense = 'column-dense',
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * Defines the display style property. Sets grid or inline-grid.
   * @default GridDisplay.grid
   */
  gridDisplay?: GridDisplay;
  /**
   * Set the columns in the grid.
   */
  gridTemplateColumns?: CSS.Property.GridTemplateColumns;
  /**
   * Set the rows in the grid.
   */
  gridTemplateRows?: CSS.Property.GridTemplateRows;
  /**
   * Set the areas in the grid.
   */
  gridTemplateAreas?: CSS.Property.GridTemplateAreas;
  /**
   * Set the space between columns and / or rows in the grid.
   */
  gridGap?: CSS.Property.GridGap;
  /**
   * Align grid items along the inline (row) axis. Applies to all items in the grid.
   */
  gridJustifyItems?: GridJustifyItems;
  /**
   * Sets the alignment of the grid within the grid container along the inline row axis.
   */
  gridJustifyContent?: GridJustifyContent;
  /**
   * Align grid items along the block (column) axis. Applies to all items in the grid.
   */
  gridAlignItems?: GridAlignItems;
  /**
   * Sets the alignment of the grid within the grid container along the block (column) axis.
   */
  gridAlignContent?: GridAlignContent;
  /**
   * If you have grid items that you don’t explicitly place on the grid, the auto-placement algorithm kicks in to automatically place the items.
   */
  gridAutoFlow?: GridAutoFlow;
  /**
   * Semantic HTML tag to be used for the Grid
   * Examples: `nav`, `footer`, `main`, `figure`, `aside`, etc.
   * @default `div`
   */
  as?: string;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @children required
   */
  children: React.ReactNode;
  /**
   * Defines the span of a column on a grid item.
   */
  gridColumn?: CSS.Property.GridColumn;
  /**
   * Defines the span of a row on a grid item.
   */
  gridRow?: CSS.Property.GridRow;
  /**
   * Define which grid area a grid item belongs to.
   */
  gridArea?: CSS.Property.GridArea;
  /**
   * Aligns the grid item within the cell along the inline (row) axis. Applies to a grid item inside a single cell.
   */
  gridItemJustifySelf?: GridItemJustifySelf;
  /**
   * Aligns the grid item within the cell along the block (column) axis. Applies to a grid item inside a single cell.
   */
  gridItemAlignSelf?: GridItemAlignSelf;
  /**
   * Semantic HTML tag to be used for the GridItem
   * Examples: `nav`, `footer`, `main`, `figure`, `aside`, etc.
   * @default `div`
   */
  as?: string;
}

export const Grid = styled.div<GridProps>`
  display: ${props => props.gridDisplay || GridDisplay.grid};
  grid-template-rows: ${props => props.gridTemplateRows};
  grid-template-columns: ${props => props.gridTemplateColumns};
  grid-area: ${props => props.gridTemplateAreas};
  grid-gap: ${props => props.gridGap};
  justify-items: ${props => props.gridJustifyItems};
  justify-content: ${props => props.gridJustifyContent};
  align-items: ${props => props.gridAlignItems};
  align-content: ${props => props.gridAlignContent};
  grid-auto-flow: ${props => props.gridAutoFlow};
`;

export const GridItem = styled.div<GridItemProps>`
  grid-column: ${props => props.gridColumn};
  grid-row: ${props => props.gridRow};
  grid-area: ${props => props.gridArea};
  justify-self: ${props => props.gridItemJustifySelf};
  align-self: ${props => props.gridItemAlignSelf};
`;
