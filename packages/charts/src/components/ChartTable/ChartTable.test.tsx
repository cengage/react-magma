import React from 'react';

import '@testing-library/jest-dom';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { DropdownMenuItem } from 'react-magma-dom';
import {
  FullscreenExitIcon,
  FullscreenIcon,
  MoreVertIcon,
  TableChartIcon,
} from 'react-magma-icons';

import { ChartDataTable } from './ChartDataTable';
import { ChartFullscreenButton } from './ChartFullscreenButton';
import { ChartMoreOptionsButton } from './ChartMoreOptionsButton';
import { ChartTableButton } from './ChartTableButton';
import { ChartTableModal } from './ChartTableModal';
import { ChartToolbar } from './ChartToolbar';

const dataSet = [
  { group: 'High performance', value: 50 },
  { group: 'Average performance', value: 30 },
  { group: 'Poor performance', value: 15 },
  { group: 'Not attempted', value: 5 },
];

// ---------------------------------------------------------------------------
// ChartDataTable
// ---------------------------------------------------------------------------
describe('ChartDataTable', () => {
  it('derives column headers from dataset keys when no columns prop is given', () => {
    render(<ChartDataTable dataSet={dataSet} />);

    expect(
      screen.getByRole('columnheader', { name: 'Group' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Value' })
    ).toBeInTheDocument();
  });

  it('renders all data rows', () => {
    render(<ChartDataTable dataSet={dataSet} />);

    expect(
      screen.getByRole('cell', { name: 'High performance' })
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '50' })).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: 'Not attempted' })
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '5' })).toBeInTheDocument();
  });

  it('accepts custom column definitions', () => {
    const columns = [
      { header: 'Category', key: 'group' },
      { header: 'Count', key: 'value' },
    ];

    render(<ChartDataTable columns={columns} dataSet={dataSet} />);

    expect(
      screen.getByRole('columnheader', { name: 'Category' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Count' })
    ).toBeInTheDocument();
  });

  it('renders with isInverse without error', () => {
    render(<ChartDataTable dataSet={dataSet} isInverse />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ChartTableModal
// ---------------------------------------------------------------------------
describe('ChartTableModal', () => {
  it('renders a dialog with semantic heading when open', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        isOpen
        onClose={jest.fn()}
        title="Overall Performance"
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Tabular representation Overall Performance',
      })
    ).toBeInTheDocument();
  });

  it('respects custom headerLevel', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        headerLevel={1}
        isOpen
        onClose={jest.fn()}
        title="Test"
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('respects custom headerLabel', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        headerLabel="Data table"
        isOpen
        onClose={jest.fn()}
        title="My Chart"
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Data table My Chart' })
    ).toBeInTheDocument();
  });

  it('does not render dialog when closed', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        isOpen={false}
        onClose={jest.fn()}
        title="Test"
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the data table inside the modal', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        isOpen
        onClose={jest.fn()}
        title="Test"
      />
    );

    expect(
      screen.getByRole('columnheader', { name: 'Group' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: 'High performance' })
    ).toBeInTheDocument();
  });

  it('calls onClose when close button is activated', async () => {
    jest.useFakeTimers();
    const onClose = jest.fn();

    render(
      <ChartTableModal
        dataSet={dataSet}
        isOpen
        onClose={onClose}
        title="Test"
      />
    );

    fireEvent.click(screen.getByTestId('modal-closebtn'));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('renders with isInverse without error', () => {
    render(
      <ChartTableModal
        dataSet={dataSet}
        isInverse
        isOpen
        onClose={jest.fn()}
        title="Inverse Modal"
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// ChartTableButton
// ---------------------------------------------------------------------------
describe('ChartTableButton', () => {
  const icon = <TableChartIcon />;

  it('renders with aria-haspopup="dialog"', () => {
    render(
      <ChartTableButton
        ariaLabel="Overall Performance"
        icon={icon}
        isTableOpen={false}
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole('button', { name: 'Overall Performance' });

    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('sets aria-expanded to false when modal is closed', () => {
    render(
      <ChartTableButton
        ariaLabel="Overall Performance"
        icon={icon}
        isTableOpen={false}
        onClick={jest.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Overall Performance' })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when modal is open', () => {
    render(
      <ChartTableButton
        ariaLabel="Overall Performance"
        icon={icon}
        isTableOpen
        onClick={jest.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Overall Performance' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onClick when activated', () => {
    const onClick = jest.fn();

    render(
      <ChartTableButton
        ariaLabel="Overall Performance"
        icon={icon}
        isTableOpen={false}
        onClick={onClick}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'Overall Performance' })
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with custom tooltip content on hover', async () => {
    render(
      <ChartTableButton
        ariaLabel="Overall Performance"
        icon={icon}
        isTableOpen={false}
        onClick={jest.fn()}
        tooltipContent="View data as table"
      />
    );

    const button = screen.getByRole('button', { name: 'Overall Performance' });

    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText('View data as table')).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// ChartFullscreenButton
// ---------------------------------------------------------------------------
describe('ChartFullscreenButton', () => {
  it('does NOT have aria-haspopup', () => {
    render(
      <ChartFullscreenButton
        ariaLabel="View chart in full screen"
        icon={<FullscreenIcon />}
        isFullscreen={false}
        onClick={jest.fn()}
      />
    );

    const button = screen.getByRole('button', {
      name: 'View chart in full screen',
    });

    expect(button).not.toHaveAttribute('aria-haspopup');
  });

  it('calls onClick when activated', () => {
    const onClick = jest.fn();

    render(
      <ChartFullscreenButton
        ariaLabel="View chart in full screen"
        icon={<FullscreenIcon />}
        isFullscreen={false}
        onClick={onClick}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: 'View chart in full screen' })
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows "Make full screen" tooltip by default', async () => {
    render(
      <ChartFullscreenButton
        ariaLabel="Fullscreen"
        icon={<FullscreenIcon />}
        isFullscreen={false}
        onClick={jest.fn()}
      />
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Fullscreen' }));
    await waitFor(() => {
      expect(screen.getByText('Make full screen')).toBeInTheDocument();
    });
  });

  it('shows "Exit full screen" tooltip when in fullscreen', async () => {
    render(
      <ChartFullscreenButton
        ariaLabel="Fullscreen"
        icon={<FullscreenIcon />}
        exitIcon={<FullscreenExitIcon />}
        isFullscreen
        onClick={jest.fn()}
      />
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Fullscreen' }));
    await waitFor(() => {
      expect(screen.getByText('Exit full screen')).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// ChartMoreOptionsButton
// ---------------------------------------------------------------------------
describe('ChartMoreOptionsButton', () => {
  it('renders with default "More options" label', () => {
    render(
      <ChartMoreOptionsButton icon={<MoreVertIcon />}>
        <DropdownMenuItem>Download</DropdownMenuItem>
      </ChartMoreOptionsButton>
    );

    expect(
      screen.getByRole('button', { name: 'More options' })
    ).toBeInTheDocument();
  });

  it('renders with custom aria-label', () => {
    render(
      <ChartMoreOptionsButton ariaLabel="Chart actions" icon={<MoreVertIcon />}>
        <DropdownMenuItem>Download</DropdownMenuItem>
      </ChartMoreOptionsButton>
    );

    expect(
      screen.getByRole('button', { name: 'Chart actions' })
    ).toBeInTheDocument();
  });

  it('opens dropdown menu on click', () => {
    render(
      <ChartMoreOptionsButton icon={<MoreVertIcon />}>
        <DropdownMenuItem>Download as CSV</DropdownMenuItem>
      </ChartMoreOptionsButton>
    );

    fireEvent.click(screen.getByRole('button', { name: 'More options' }));
    expect(screen.getByText('Download as CSV')).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// ChartToolbar
// ---------------------------------------------------------------------------
describe('ChartToolbar', () => {
  it('renders the title as a heading', () => {
    render(
      <ChartToolbar title="Overall Performance">
        <button>Action</button>
      </ChartToolbar>
    );

    expect(
      screen.getByRole('heading', { level: 3, name: 'Overall Performance' })
    ).toBeInTheDocument();
  });

  it('renders children action buttons', () => {
    render(
      <ChartToolbar title="Test">
        <button>Show as table</button>
        <button>Full screen</button>
      </ChartToolbar>
    );

    expect(
      screen.getByRole('button', { name: 'Show as table' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Full screen' })
    ).toBeInTheDocument();
  });

  it('respects custom heading level', () => {
    render(
      <ChartToolbar title="Test" headingLevel={2}>
        <button>Action</button>
      </ChartToolbar>
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Test' })
    ).toBeInTheDocument();
  });
});
