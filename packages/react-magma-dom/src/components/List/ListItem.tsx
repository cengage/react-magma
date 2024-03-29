import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { getListDisplay, ListProps } from './';
import { magma } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface ListItemProps
  extends ListProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Option for changing icon background with all Magma colors.
   */
  iconBackground?: keyof typeof magma.colors;
  /**
   * Option for changing icon color with all Magma colors.
   */
  iconColor?: keyof typeof magma.colors;
}

const ListItemStyles = props => css`
  display: ${getListDisplay(props)};
  margin: 0;
  padding: 0;
  margin-left: ${props.icon ? 'inherit' : '1.1em'};
  color: ${props.description && !props.isInverse
    ? props.theme.colors.neutral
    : 'inherit'};
  list-style-type: ${props.icon || props.description ? 'none' : 'inherit'};
`;

const IconStyles = props => css`
  background: ${props.iconBackground};
  color: ${props.iconColor};
  border-radius: 50%;
  display: inline-flex;
  padding: 10px;
`;

const StyledListItem = styled('li')`
  ${ListItemStyles};
`;

const StyledIcon = styled('span')`
  ${IconStyles};
`;

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (props, ref) => {
    const {
      children,
      description,
      icon,
      iconAlign,
      iconBackground,
      iconColor,
      testId,
      isInverse: isInverseProp,
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledListItem
          as={description ? 'p' : 'li'}
          description={description}
          icon={icon}
          iconAlign={iconAlign}
          isInverse={isInverse}
          theme={theme}
          testId={testId}
        >
          {icon && (
            <StyledIcon
              iconBackground={
                magma.colors[iconBackground] || magma.colors.primary
              }
              iconColor={magma.colors[iconColor] || magma.colors.neutral100}
              theme={theme}
            >
              {icon}
            </StyledIcon>
          )}
          {children}
        </StyledListItem>
      </InverseContext.Provider>
    );
  }
);
