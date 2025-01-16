import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeContext, VisuallyHidden } from 'react-magma-dom';

const Item = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`;

const StyledLink = styled.button`
  background: ${props => props.theme.colors.primary700};
  border: none;
  border-bottom: 2px solid;
  border-color: ${props =>
    props.active ? props.theme.colors.secondary : 'transparent'};
  color: ${props =>
    props.active
      ? props.theme.colors.secondary
      : props.theme.colors.neutral100};
  display: block;
  font-size: 13px;
  line-height: 1.3em;
  padding: 9px 15px 7px;
  text-align: left;
  text-decoration: none;
  text-transform: inherit;
  transition: background 0.3s;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.14);
    color: ${props => props.theme.colors.neutral300};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.focusInverse};
    outline-offset: 0;
  }
`;

const Num = styled.span`
  display: block;
  font-family: 'Abel', sans-serif;
`;

function handleNavClick(id, onClick) {
  onClick(id);
}

export const NavItem = ({ activeSection, section, number, onClick, text }) => (
  <ThemeContext.Consumer>
    {theme => (
      <Item>
        <StyledLink
          active={activeSection === section}
          onClick={() => {
            handleNavClick(section, onClick);
          }}
          theme={theme}
        >
          <Num>{number}</Num>
          {text}
          {activeSection === number && (
            <VisuallyHidden>(selected)</VisuallyHidden>
          )}
        </StyledLink>
      </Item>
    )}
  </ThemeContext.Consumer>
);

NavItem.propTypes = {
  activeSection: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
