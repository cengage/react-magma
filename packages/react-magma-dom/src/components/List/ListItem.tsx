import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ListProps } from './';
import { ThemeContext } from '../../theme/ThemeContext';

import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface ListItemProps
  extends ListProps,
    React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactElement<any> | React.ReactElement<any>[];
}

function getListDisplay(props) {
  if (props.description) {
    return 'block';
  }
  if (props.icon) {
    return 'flex';
  }
  return 'list-item';
}

const ListItemStyles = props => css`
  display: ${getListDisplay(props)};

  margin: 0;
  padding: 0;
  color: ${props.description ? props.theme.colors.neutral03 : 'inherit'};
  list-style-type: ${props.icon || props.description ? 'none' : 'inherit'};
`;

const StyledListItem = styled.li`
  ${ListItemStyles};
`;

const StyledIcon = styled.span`
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.neutral08};
  display: inline-flex;
  padding: 10px;
  margin: 0 20px 0 0;
`;

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (props, ref) => {
    const {
      children,
      description,
      icon,
      iconAlign,
      iconSize,
      testId,
      isInverse: isInverseProp,
      ...rest
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
          theme={theme}
        >
          {icon && <StyledIcon theme={theme}>{icon}</StyledIcon>}
          {children}
        </StyledListItem>
      </InverseContext.Provider>
    );
  }
);
