import React from 'react';

import { render } from '@testing-library/react';
import { EmailIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

import { IconSizes, List, ListItem } from '.';

const TEXT = 'List Item Text';

describe('List', () => {
  it('should render the visually hidden component', () => {
    const { getByText } = render(<List>{TEXT}</List>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<List testId={testId}>{TEXT}</List>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <List>
        <ListItem>{TEXT}</ListItem>
      </List>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render a list item with an icon', () => {
    const testId = 'test-id';

    const icon = <EmailIcon />;
    const { container } = render(
      <List>
        <ListItem testId={testId} icon={icon}>
          {TEXT}
        </ListItem>
      </List>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyleRule(
      'padding',
      '10px',
      'borderRadius',
      '50%'
    );
    expect(container.querySelector('span')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('should render a list item with a small icon', () => {
    const testId = 'test-id';

    const icon = <EmailIcon />;
    const { container } = render(
      <List iconSize={IconSizes.small}>
        <ListItem testId={testId} icon={icon}>
          {TEXT}
        </ListItem>
      </List>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render a list item with a large icon', () => {
    const testId = 'test-id';

    const icon = <EmailIcon />;
    const { container } = render(
      <List iconSize={IconSizes.large}>
        <ListItem testId={testId} icon={icon}>
          {TEXT}
        </ListItem>
      </List>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render a list item a nested description', () => {
    const testId = 'test-id';

    const { container } = render(
      <List>
        <ListItem testId={testId} description>
          {TEXT}
        </ListItem>
      </List>
    );
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.querySelector('p')).toHaveStyleRule(
      'color',
      magma.colors.neutral
    );
  });

  it('should render the text only list item with these styles', () => {
    const testId = 'test-id';

    const { container } = render(
      <List>
        <ListItem testId={testId}>Tab</ListItem>
      </List>
    );
    expect(container.querySelector('li')).toBeInTheDocument();
    expect(container.querySelector('li')).toHaveStyleRule(
      'margin-left',
      `1.1em`,
      'list-style-type',
      'inherit',
      'color',
      'inherit'
    );
  });

  it('should render icons with the correct span color according to the overwritten theme', () => {
    const testId = 'test-id';
    const icon = <EmailIcon />;

    const { container } = render(
      <ThemeContext.Provider
        value={{ ...magma, colors: { ...magma.colors, primary: 'black' } }}
      >
        <List>
          <ListItem icon={icon} testId={testId}>
            Email
          </ListItem>
        </List>
      </ThemeContext.Provider>
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyleRule(
      'background',
      'black'
    );
  });
});
