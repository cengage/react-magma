import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { TypographyVisualStyle, TypographyComponent } from '../Typography';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: boolean;
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  iconAlign?: IconAlignment;
  iconSize?: IconSizes;
  isInverse?: boolean;
  /**
   * @default false
   */
  isOrdered?: boolean;
  /**
   * @internal
   */
  spacingStyle?: spacingVisualStyle;
  testId?: string;
  theme?: ThemeInterface;
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   * @default TypographyVisualStyle.bodyMedium
   */

  visualStyle?: TypographyVisualStyle;
}

export enum spacingVisualStyle {
  spacing01 = 'spacing01',
  spacing02 = 'spacing02',
  spacing03 = 'spacing03',
  spacing04 = 'spacing04',
  spacing05 = 'spacing05',
  spacing06 = 'spacing06',
  spacing07 = 'spacing07',
  spacing08 = 'spacing08',
  spacing09 = 'spacing09',
  spacing10 = 'spacing10',
  spacing11 = 'spacing11',
  spacing12 = 'spacing12',
  spacing13 = 'spacing13',
  spacing14 = 'spacing14',
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

function getSpacingStyles(props) {
  switch (props.spacingStyle) {
    case spacingVisualStyle.spacing01:
      return props.theme.spaceScale.spacing01;
    case spacingVisualStyle.spacing02:
      return props.theme.spaceScale.spacing02;
    case spacingVisualStyle.spacing03:
      return props.theme.spaceScale.spacing03;
    case spacingVisualStyle.spacing04:
      return props.theme.spaceScale.spacing04;
    case spacingVisualStyle.spacing05:
      return props.theme.spaceScale.spacing05;
    case spacingVisualStyle.spacing06:
      return props.theme.spaceScale.spacing06;
    case spacingVisualStyle.spacing07:
      return props.theme.spaceScale.spacing07;
    case spacingVisualStyle.spacing08:
      return props.theme.spaceScale.spacing08;
    case spacingVisualStyle.spacing09:
      return props.theme.spaceScale.spacing09;
    case spacingVisualStyle.spacing10:
      return props.theme.spaceScale.spacing10;
    case spacingVisualStyle.spacing11:
      return props.theme.spaceScale.spacing11;
    case spacingVisualStyle.spacing12:
      return props.theme.spaceScale.spacing12;
    case spacingVisualStyle.spacing13:
      return props.theme.spaceScale.spacing13;
    case spacingVisualStyle.spacing14:
      return props.theme.spaceScale.spacing14;
    default:
      return props.theme.spaceScale.spacing01;
  }
}

const ListStyles = props => css`
  margin: 0;
  padding: 0;
  color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral};
  li {
    margin-bottom: ${getSpacingStyles(props)};
    align-items: ${getListAlignment(props)};
    grid-template-areas: 'a a a';
  }
  p {
    font-size: 0.8em;
    font-weight: 400;
    margin-top: calc(${getSpacingStyles(props)} / 2);
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
      icon,
      iconAlign,
      iconSize,
      isInverse: isInverseProp,
      isOrdered,
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
          ref={ref}
          spacingStyle={spacingStyle}
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
