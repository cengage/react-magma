import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { InverseContext, useIsInverse } from '../../inverse';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  isInverse?: boolean;
  /**
   * The text the screen reader will announce that describes your breadcrumb.
   */
  'aria-label'?: string;
  /**
   * @internal
   */
  testId?: string;
}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledList = typedStyled('ol', {
  shouldForwardProp: isPropValid,
})<BreadcrumbProps>`
  display: flex;
  flex-wrap: wrap;
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  font-family: ${props => props.theme.bodyFont};
  letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Breadcrumb = React.forwardRef<HTMLOListElement, BreadcrumbProps>(
  (props, ref) => {
    const {
      'aria-label': ariaLabel,
      children,
      isInverse: isInverseProp,
      testId,
      ...other
    } = props;

    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <nav
          {...other}
          aria-label={ariaLabel ? ariaLabel : i18n.breadcrumb.navAriaLabel}
          data-testid={testId}
        >
          <StyledList isInverse={isInverse} ref={ref} theme={theme}>
            {children}
          </StyledList>
        </nav>
      </InverseContext.Provider>
    );
  }
);
