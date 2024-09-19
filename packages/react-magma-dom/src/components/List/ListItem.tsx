import * as React from 'react';
import { css } from '@emotion/core';
import { getListDisplay, ListProps } from './';
import { magma } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface ListItemProps
  extends ListProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean which changes a list item into a styled paragraph.
   */
  description?: boolean;
  /**
   * For use with inline icons within list items.
   */
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
  /**
   * Option for changing icon background with all Magma colors.
   */
  iconBackground?: keyof typeof magma.colors;
  /**
   * Option for changing icon color with all Magma colors.
   */
  iconColor?: keyof typeof magma.colors;
}

function getListDisplay(props) {
  if (props.icon) {
    return 'grid';
  }
  return 'list-item';
}

const IconStyles = props => css`
  background: ${props.iconBackground};
  color: ${props.iconColor};
  border-radius: 50%;
  display: inline-flex;
  padding: 10px;
`;

const StyledListItem = styled.li<any>`
  display: ${props => getListDisplay(props)};
  margin: 0;
  padding: 0;
  margin-left: ${props => (props.icon ? 'inherit' : '1.1em')};
  color: ${props =>
    props.description && !props.isInverse
      ? props.theme.colors.neutral
      : 'inherit'};
  list-style-type: ${props =>
    props.icon || props.description ? 'none' : 'inherit'};
`;

const StyledIcon = styled.span<any>`
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
          description={description as any}
          icon={icon}
          iconAlign={iconAlign}
          isInverse={isInverse}
          ref={ref}
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
