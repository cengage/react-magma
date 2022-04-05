import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { magma, ThemeInterface } from '../../theme/magma';
import { TypographyVisualStyle, TypographyComponent } from '../Typography';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: boolean;
  /**
   * Allows an ordered list to start at a determined value of a letter or number.
   */
  hasStart?: string;
  /**
   * For use with inline icons within list items.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  /**
   * Aligns the icon at the top, or center of each list item.
   */
  iconAlign?: IconAlignment;
  /**
   * Sizes the icon between small, medium, and large.
   * @default 'medium'
   *
   */
  iconSize?: IconSizes;
  isInverse?: boolean;
  /**
   * @default false
   */
  isOrdered?: boolean;
  /**
   * If list is ordered, then this allows the list to reverse the content.
   * @default false
   */
  isReversed?: boolean;
  /**
   * Options for list type bullet formatting.
   */
  listType?: ulListType | olListType;
  /**
   * Adds a bottom margin to each list item with the Magma space scale.
   */
  spacingStyle?: keyof typeof magma.spaceScale;
  testId?: string;
  /**
   * @internal
   */
  theme?: ThemeInterface;
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   * @default TypographyVisualStyle.bodyMedium
   */

  visualStyle?: TypographyVisualStyle;
}

export enum IconSizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum IconAlignment {
  center = 'center',
  top = 'top',
}

export enum ulListType {
  circle = 'circle',
  disc = 'disc',
  square = 'square',
}

export enum olListType {
  lowercase = 'a',
  uppercase = 'A',
  lowercaseRoman = 'i',
  uppercaseRoman = 'I',
  numbers = '1',
}

export function getIconSizes(props) {
  switch (props.iconSize) {
    case IconSizes.small:
      return props.theme.iconSizes.small;
    case IconSizes.large:
      return props.theme.iconSizes.large;
    default:
      return props.theme.iconSizes.medium;
  }
}

export function getListAlignment(props) {
  switch (props.iconAlign) {
    case IconAlignment.center:
      return `center`;
    case IconAlignment.top:
      return `flex-start`;
    default:
      return `center`;
  }
}

export function getListDisplay(props) {
  if (props.icon) {
    return 'grid';
  }
  return 'list-item';
}

const ListStyles = props => css`
  margin: 0;
  padding: 0;
  list-style-type: ${props.listType};
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral};
  li {
    align-items: ${getListAlignment(props)};
    margin-bottom: ${props.spacingStyle};
    grid-template-areas: 'a b';
    grid-template-columns: auto 1fr;
  }
  span {
    margin: ${props.iconSize === 'small'
      ? '0 16px 0 0'
      : props.iconSize === 'large'
      ? '0 26px 0 0'
      : '0 18px 0 0'};
  }
  p {
    font-size: 0.8em;
    font-weight: 400;
    margin-bottom: 8px;
    margin-left: 0;
    grid-template: 'b';
    grid-column-start: 2;
  }
  svg {
    height: ${getIconSizes(props)}px;
    width: ${getIconSizes(props)}px;
  }
`;

const StyledList = styled(TypographyComponent)`
  ${ListStyles};
`;

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  (props, ref) => {
    const {
      children,
      color,
      description,
      testId,
      hasStart,
      icon,
      iconAlign,
      iconSize,
      isInverse: isInverseProp,
      isOrdered,
      isReversed,
      listType,
      spacingStyle,
      visualStyle,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledList
          as={isOrdered ? 'ol' : 'ul'}
          data-testid={props.testId}
          description={description}
          icon={icon}
          iconAlign={iconAlign}
          iconSize={iconSize}
          isInverse={isInverse}
          type={listType ? listType : 'inherit'}
          reversed={isReversed}
          ref={ref}
          spacingStyle={magma.spaceScale[spacingStyle] || spacingStyle}
          start={hasStart}
          theme={theme}
          visualStyle={
            visualStyle ? visualStyle : TypographyVisualStyle.bodyMedium
          }
          {...rest}
        >
          {children}
        </StyledList>
      </InverseContext.Provider>
    );
  }
);
