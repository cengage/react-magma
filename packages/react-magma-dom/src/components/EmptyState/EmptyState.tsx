import * as React from 'react';

import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Spinner } from '../Spinner';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
} from '../Typography';
import {
  getIllustrationIconColor,
  StyledActions,
  StyledEmptyState,
  StyledHeader,
  StyledIconContainer,
} from './styles';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions rendered below the content area (compose your own Buttons / ButtonGroup) */
  actions?: React.ReactNode;
  /** Custom content rendered between text and actions */
  additionalContent?: React.ReactNode;
  /** Description text displayed below the title (omit to hide) */
  description?: string;
  /** Custom graphic that replaces the entire circular icon area — renders as-is with no wrapper */
  customGraphic?: React.ReactNode;
  /** Icon element displayed inside the circular illustration area */
  icon?: React.ReactElement;
  /** Use danger/error color scheme (red) */
  isDanger?: boolean;
  /** Use inverse (dark) color scheme */
  isInverse?: boolean;
  /** Show loading spinner instead of content */
  isLoading?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /** Title text (omit to hide title) */
  title?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const {
      actions,
      additionalContent,
      customGraphic,
      description,
      icon,
      isDanger = false,
      isLoading = false,
      testId,
      title,
      ...rest
    } = props;

    const isInverse = useIsInverse(props.isInverse);
    const theme = React.useContext(ThemeContext);
    const descriptionColor = isInverse
      ? TypographyColor.default
      : TypographyColor.subdued;

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledEmptyState
          {...rest}
          data-testid={testId}
          ref={ref}
          theme={theme}
        >
          {isLoading ? (
            <Spinner
              color={getIllustrationIconColor({ isInverse, isDanger, theme })}
              isInverse={isInverse}
              size={48}
            />
          ) : (
            <>
              {(customGraphic || icon || title || description) && (
                <StyledHeader theme={theme}>
                  {customGraphic ? (
                    <div aria-hidden="true">{customGraphic}</div>
                  ) : (
                    icon && (
                      <StyledIconContainer
                        isDanger={isDanger}
                        isInverse={isInverse}
                        theme={theme}
                      >
                        {icon}
                      </StyledIconContainer>
                    )
                  )}
                  {title && (
                    <Heading
                      level={3}
                      visualStyle={TypographyVisualStyle.heading2XSmall}
                      contextVariant={TypographyContextVariant.expressive}
                      noMargins
                      isInverse={isInverse}
                      style={{
                        color: isInverse
                          ? theme.colors.neutral100
                          : theme.colors.neutral700,
                      }}
                    >
                      {title}
                    </Heading>
                  )}
                  {description && (
                    <Paragraph
                      isInverse={isInverse}
                      noMargins
                      color={descriptionColor}
                    >
                      {description}
                    </Paragraph>
                  )}
                </StyledHeader>
              )}
              {additionalContent}
              {actions && <StyledActions>{actions}</StyledActions>}
            </>
          )}
        </StyledEmptyState>
      </InverseContext.Provider>
    );
  }
);

EmptyState.displayName = 'EmptyState';
