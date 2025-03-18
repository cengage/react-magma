import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { ListProps } from '../List';
import { TypographyComponent, TypographyVisualStyle } from '../Typography';

/**
 * @children required
 */
export interface DefinitionListProps
  extends Pick<ListProps, 'isInverse' | 'testId' | 'theme' | 'visualStyle'>,
    React.HTMLAttributes<HTMLDListElement> {}

const DefinitionListStyles = (props: DefinitionListProps) => css`
  margin: 0;
  padding: 0;
  color: ${props.isInverse
    ? props.theme.colors.neutral100
    : props.theme.colors.neutral700};
  line-height: ${props.theme.typeScale.size03.lineHeight};
  font-size: ${props.theme.typeScale.size03.fontSize};

  dt {
    align-items: 'center';
    font-weight: 600;
  }

  dd {
    align-items: flex-start;
    font-weight: 400;
    padding-left: ${props.theme.spaceScale.spacing08};
    margin-bottom: ${props.theme.spaceScale.spacing05};
  }
`;

const StyledDefinitionList = styled(TypographyComponent)<any>`
  ${DefinitionListStyles};
`;

export const DefinitionList = React.forwardRef<
  HTMLDListElement,
  DefinitionListProps
>((props, ref) => {
  const {
    children,
    testId,
    isInverse: isInverseProp,
    visualStyle,
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledDefinitionList
        as={'dl'}
        data-testid={testId}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
        visualStyle={visualStyle || TypographyVisualStyle.bodyMedium}
        style={{ margin: '10px' }}
        {...rest}
      >
        {children}
      </StyledDefinitionList>
    </InverseContext.Provider>
  );
});
