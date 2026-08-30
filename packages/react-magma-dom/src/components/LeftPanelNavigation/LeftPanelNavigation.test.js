import React from 'react';

import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { InsertDriveFileIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { BadgeColor } from '../Badge';

import { LeftPanelNavigation } from '.';

const items = [
  {
    id: 'home',
    label: 'Home',
    to: '/home',
    icon: <InsertDriveFileIcon />,
  },
  {
    id: 'components',
    label: 'Components',
    items: [
      {
        id: 'button',
        label: 'Button',
        to: '/button',
      },
      {
        id: 'badge',
        label: 'Badge',
        to: '/badge',
      },
    ],
  },
  {
    id: 'grouped',
    label: 'Grouped',
    groups: [
      {
        id: 'inputs',
        label: 'Inputs',
        items: [
          {
            id: 'checkbox',
            label: 'Checkbox',
            to: '/checkbox',
          },
        ],
      },
    ],
  },
];

function renderLeftPanelNavigation(ui) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  return render(ui, { baseElement: container, container });
}

describe('LeftPanelNavigation', () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  it('renders the navigation landmark', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation aria-label="Primary" items={items} />
    );

    expect(getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('is compliant with accessibility standards', () => {
    const { container } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        activeItemId="button"
        defaultExpandedIds={['components']}
        items={items}
      />
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('expands a section when the top-level button is clicked', () => {
    const { getByRole, queryByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation items={items} />
    );

    expect(queryByText('Button')).not.toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'Components' }));

    expect(getByRole('link', { name: 'Button' })).toBeInTheDocument();
  });

  it('supports controlled expanded ids', () => {
    const handleExpandedChange = jest.fn();
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        expandedIds={['components']}
        items={items}
        onExpandedChange={handleExpandedChange}
      />
    );

    fireEvent.click(getByRole('button', { name: 'Components' }));

    expect(handleExpandedChange).toHaveBeenCalledWith([]);
  });

  it('sets aria-current on the active item', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        activeItemId="badge"
        defaultExpandedIds={['components']}
        items={items}
      />
    );

    expect(getByRole('link', { name: 'Badge' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('uses current item styling', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        activeItemId="badge"
        defaultExpandedIds={['components']}
        items={items}
      />
    );

    expect(getByRole('link', { name: 'Badge' })).toHaveStyleRule(
      'background',
      magma.colors.primary100,
      {
        target: "[aria-current='page']",
      }
    );
  });

  it('uses inverse current item styling', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        activeItemId="home"
        iconColor="neutral400"
        isInverse
        items={items}
      />
    );
    const currentItem = getByRole('link', { name: 'Home' });
    const icon = currentItem.querySelector('[aria-hidden="true"]');

    expect(currentItem).toHaveStyleRule('background', magma.colors.primary500, {
      target: "[aria-current='page']",
    });
    expect(currentItem).toHaveStyleRule('color', magma.colors.neutral100);
    expect(icon).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('supports an optional right border', () => {
    const { getByTestId, rerender } = renderLeftPanelNavigation(
      <LeftPanelNavigation items={items} testId="left-panel-navigation" />
    );

    expect(getByTestId('left-panel-navigation')).toHaveStyleRule(
      'border-right',
      '0'
    );

    rerender(
      <LeftPanelNavigation
        hasRightBorder
        items={items}
        testId="left-panel-navigation"
      />
    );

    expect(getByTestId('left-panel-navigation')).toHaveStyleRule(
      'border-right',
      `1px solid ${magma.colors.border}`
    );
  });

  it('supports a fixed height with vertical scrolling', () => {
    const { getByTestId } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        height="100vh"
        items={items}
        testId="left-panel-navigation"
      />
    );

    expect(getByTestId('left-panel-navigation')).toHaveStyleRule(
      'height',
      '100vh'
    );
    expect(getByTestId('left-panel-navigation-items')).toHaveStyleRule(
      'overflow-y',
      'auto'
    );
  });

  it('renders an optional sticky footer', () => {
    const { getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        footer={<button type="button">Account menu</button>}
        items={items}
      />
    );

    expect(getByText('Account menu')).toBeInTheDocument();
    expect(getByText('Account menu').parentElement).toHaveStyleRule(
      'position',
      'absolute'
    );
    expect(getByText('Account menu').parentElement).toHaveStyleRule(
      'left',
      '0'
    );
    expect(getByText('Account menu').parentElement).toHaveStyleRule(
      'right',
      '0'
    );
    expect(getByText('Account menu').parentElement).toHaveStyleRule(
      'border-top',
      `1px solid ${magma.colors.border}`
    );
  });

  it('passes collapsed and inverse state to footer render props', () => {
    const renderFooter = jest.fn(({ isCollapsed, isInverse }) => (
      <span>
        {isCollapsed ? 'Collapsed' : 'Expanded'} {isInverse ? 'inverse' : ''}
      </span>
    ));

    const { getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        defaultIsCollapsed
        footer={renderFooter}
        isCollapsible
        isInverse
        items={items}
      />
    );

    expect(renderFooter).toHaveBeenCalledWith({
      isCollapsed: true,
      isInverse: true,
    });
    expect(getByText('Collapsed inverse')).toBeInTheDocument();
  });

  it('renders optional top content inside the scrollable item area', () => {
    const { getByTestId, getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        items={items}
        testId="left-panel-navigation"
        topContent={<div>Course information</div>}
      />
    );

    expect(getByText('Course information')).toBeInTheDocument();
    expect(getByTestId('left-panel-navigation-items')).toContainElement(
      getByText('Course information')
    );
  });

  it('passes collapsed and inverse state to top content render props', () => {
    const renderTopContent = jest.fn(({ isCollapsed, isInverse }) => (
      <span>
        {isCollapsed ? 'Collapsed' : 'Expanded'} {isInverse ? 'inverse' : ''}
      </span>
    ));

    const { getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        defaultIsCollapsed
        isCollapsible
        isInverse
        items={items}
        topContent={renderTopContent}
      />
    );

    expect(renderTopContent).toHaveBeenCalledWith({
      isCollapsed: true,
      isInverse: true,
    });
    expect(getByText('Collapsed inverse')).toBeInTheDocument();
  });

  it('collapses to an icon-only view', () => {
    const { getByRole, getByTestId, queryByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        defaultExpandedIds={['components']}
        isCollapsible
        items={items}
        testId="left-panel-navigation"
      />
    );

    expect(getByRole('link', { name: 'Button' })).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: 'close sidebar' }));

    expect(getByTestId('left-panel-navigation')).toHaveStyleRule(
      'width',
      'calc(40px + 8px + 8px)'
    );
    expect(getByRole('button', { name: 'open sidebar' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(getByRole('link', { name: 'Home' })).toHaveStyleRule(
      'height',
      '40px'
    );
    expect(getByRole('link', { name: 'Home' })).toHaveStyleRule(
      'width',
      `calc(100% - ${magma.spaceScale.spacing05})`
    );
    expect(queryByRole('link', { name: 'Button' })).not.toBeInTheDocument();
  });

  it('calls onCollapsedChange when collapsed state changes', () => {
    const handleCollapsedChange = jest.fn();
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        isCollapsible
        items={items}
        onCollapsedChange={handleCollapsedChange}
      />
    );

    fireEvent.click(getByRole('button', { name: 'close sidebar' }));

    expect(handleCollapsedChange).toHaveBeenCalledWith(true);
  });

  it('shows children in a dropdown when an expandable item is clicked while collapsed', async () => {
    const { getByRole, queryByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        defaultIsCollapsed
        isCollapsible
        items={[
          items[0],
          {
            ...items[1],
            icon: <InsertDriveFileIcon />,
          },
        ]}
      />
    );

    expect(queryByRole('menuitem', { name: 'Button' })).not.toBeInTheDocument();

    await waitFor(() => {
      expect(getByRole('button', { name: 'Components' })).toHaveAttribute(
        'aria-haspopup',
        'true'
      );
    });

    fireEvent.click(getByRole('button', { name: 'Components' }));

    await waitFor(() => {
      expect(getByRole('menuitem', { name: 'Button' })).toBeInTheDocument();
    });
    expect(getByRole('menuitem', { name: 'Badge' })).toBeInTheDocument();
  });

  it('hides top-level items without icons while collapsed', () => {
    const { getByRole, queryByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        defaultIsCollapsed
        isCollapsible
        items={[
          {
            id: 'home',
            label: 'Home',
            to: '/home',
          },
          {
            id: 'components',
            label: 'Components',
            items: [
              {
                id: 'button',
                label: 'Button',
                to: '/button',
              },
            ],
          },
        ]}
      />
    );

    expect(getByRole('button', { name: 'open sidebar' })).toBeInTheDocument();
    expect(queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();
    expect(
      queryByRole('button', { name: 'Components' })
    ).not.toBeInTheDocument();
  });

  it('renders an optional logo', () => {
    const { getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        items={items}
        logo={<span>Cengage</span>}
        logoWidth={120}
      />
    );

    expect(getByText('Cengage')).toBeInTheDocument();
    expect(getByText('Cengage').parentElement).toHaveStyleRule(
      'width',
      '120px'
    );
  });

  it('renders an item badge with the selected color', () => {
    const { getByTestId } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        items={[
          {
            ...items[1],
            badge: {
              color: BadgeColor.info,
              label: 'New!',
              testId: 'new-badge',
            },
          },
        ]}
      />
    );

    expect(getByTestId('new-badge')).toHaveTextContent('New!');
    expect(getByTestId('new-badge')).toHaveStyleRule(
      'background',
      magma.colors.info500
    );
  });

  it('renders nested group labels', () => {
    const { getByRole, getByText } = renderLeftPanelNavigation(
      <LeftPanelNavigation defaultExpandedIds={['grouped']} items={items} />
    );

    expect(getByText('Inputs')).toBeInTheDocument();
    expect(getByRole('link', { name: 'Checkbox' })).toBeInTheDocument();
  });

  it('calls onItemClick for link items', () => {
    const handleItemClick = jest.fn(event => event.preventDefault());
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation items={items} onItemClick={handleItemClick} />
    );

    fireEvent.click(getByRole('link', { name: 'Home' }));

    expect(handleItemClick).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({ id: 'home' })
    );
  });

  it('applies iconColor to item icons', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation iconColor="neutral400" items={items} />
    );
    const icon = getByRole('link', { name: 'Home' }).querySelector(
      '[aria-hidden="true"]'
    );

    expect(icon).toHaveStyleRule('color', magma.colors.neutral400);
  });

  it('allows item iconColor to override the navigation iconColor', () => {
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation
        iconColor="neutral400"
        items={[
          {
            ...items[0],
            iconColor: 'primary500',
          },
        ]}
      />
    );
    const icon = getByRole('link', { name: 'Home' }).querySelector(
      '[aria-hidden="true"]'
    );

    expect(icon).toHaveStyleRule('color', magma.colors.primary500);
  });

  it('uses a custom link component', () => {
    const CustomLink = React.forwardRef(({ to, ...rest }, ref) => (
      <a {...rest} href={to} ref={ref} />
    ));
    const { getByRole } = renderLeftPanelNavigation(
      <LeftPanelNavigation items={items} linkComponent={CustomLink} />
    );

    expect(getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/home'
    );
  });
});
