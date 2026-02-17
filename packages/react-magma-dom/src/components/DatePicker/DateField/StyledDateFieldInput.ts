import styled from '@emotion/styled';

import { ThemeInterface } from '../../../theme/magma';
import { inputWrapperStyles } from '../../InputBase';

export const InputsContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
}>`
  ${inputWrapperStyles};
  padding: 10px ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing03};
  height: ${props => props.theme.spaceScale.spacing09};
  width: 100%;
  font-family: ${props => props.theme.bodyFont};
  position: relative;
`;

export const IconWrapper = styled.div<{ theme: ThemeInterface }>`
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing03};
  top: 50%;
  transform: translateY(-50%);
`;

export const IsClearableContainer = styled.span<{ theme: ThemeInterface }>`
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing09};
  top: 50%;
  transform: translateY(-50%);
`;

export const DateFieldInputContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  min-width: 230px;
`;
