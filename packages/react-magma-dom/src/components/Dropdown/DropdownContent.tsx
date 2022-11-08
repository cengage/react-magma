import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import {
  DropdownContext,
  DropdownAlignment,
  DropdownDropDirection,
} from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { usePopper } from "react-popper";

/**
 * @children required
 */
export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isInverse?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: ${props => props.theme.spaceScale.spacing02};
  max-height: ${props =>
    props.maxHeight ? props.maxHeight : props.theme.dropdown.content.maxHeight};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
  position: absolute;
  transition: opacity 0.3s;
  white-space: nowrap;
  z-index: 2;

  ${props =>
    props.width &&
    css`
      white-space: normal;
      width: ${props.width};
    `}
`;
  
  // ${props => props.dropDirection === DropdownDropDirection.up &&
  //   css`
  //     top: auto;
  //     bottom: 100%;
  //   `}

  // ${props => props.dropDirection === DropdownDropDirection.left &&
  //   css`
  //     left: auto;
  //     right: 100%;
  //     top: ${props.theme.spaceScale.spacing02};
  //   `}

  // ${props => props.dropDirection === DropdownDropDirection.right &&
  //   css`
  //     left: 100%;
  //     top: ${props.theme.spaceScale.spacing02};
  //   `}

//   ${props => props.alignment === DropdownAlignment.end &&
//     props.dropDirection !== DropdownDropDirection.left &&
//     props.dropDirection !== DropdownDropDirection.right &&
//     css`
//       left: auto;
//       right: ${props.theme.spaceScale.spacing02};
//     `}

//  ${props =>
//     props.alignment === DropdownAlignment.end &&
//     (props.dropDirection === DropdownDropDirection.left || props.dropDirection === DropdownDropDirection.right) &&
//     css`
//       bottom: ${props.theme.spaceScale.spacing02};
//       top: auto;
//     `}
// `;

const StyledDiv = styled.div`
  padding: ${props => props.theme.spaceScale.spacing02} 0;
`;

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>((props, forwardedRef) => {
  const { children, testId, ...other } = props;
  const context = React.useContext(DropdownContext);
  const theme = React.useContext(ThemeContext);
  const ref = useForkedRef(forwardedRef, context.menuRef);

  const { styles, attributes } = usePopper(context.toggleRef.current, context.menuRef.current, {
    placement: context.dropDirection,
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 0],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'left', 'right'],
        },
      },
    ],
  });
  
  return (
    <StyledCard
      {...other}
      alignment={context.alignment}
      dropDirection={context.dropDirection}
      hasDropShadow
      isInverse={context.isInverse}
      isOpen={context.isOpen}
      maxHeight={context.maxHeight}
      tabIndex={-1}
      testId={testId || 'dropdownContent'}
      theme={theme}
      width={context.width}
      style={styles.popper}
      ref={ref}
      {...attributes.popper}
      >
      <StyledDiv
        aria-labelledby={context.dropdownButtonId.current}
        role="menu"
        theme={theme}
        style={styles.flip}
      >
        {children}
      </StyledDiv>
    </StyledCard>
  );
});
