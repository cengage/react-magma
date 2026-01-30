import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { EmptyState, EmptyStateIllustrationSize } from '.';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" data-testid="test-icon">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

describe('EmptyState', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<EmptyState testId={testId} title="Test" />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render with title', () => {
    const title = 'No results found';
    const { getByText } = render(<EmptyState title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it('should render with body text', () => {
    const body = 'Try adjusting your search criteria';
    const { getByText } = render(<EmptyState body={body} />);

    expect(getByText(body)).toBeInTheDocument();
  });

  it('should render with illustration', () => {
    const { getByTestId } = render(
      <EmptyState illustration={<SearchIcon />} title="Test" />
    );

    expect(getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render primary action button and handle click', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <EmptyState title="Test" primaryAction={{ label: 'Add Item', onClick }} />
    );

    const button = getByText('Add Item');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render secondary action button and handle click', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <EmptyState
        title="Test"
        secondaryAction={{ label: 'Learn More', onClick }}
      />
    );

    const button = getByText('Learn More');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render both action buttons', () => {
    const primaryClick = jest.fn();
    const secondaryClick = jest.fn();
    const { getByText } = render(
      <EmptyState
        title="Test"
        primaryAction={{ label: 'Primary', onClick: primaryClick }}
        secondaryAction={{ label: 'Secondary', onClick: secondaryClick }}
      />
    );

    expect(getByText('Primary')).toBeInTheDocument();
    expect(getByText('Secondary')).toBeInTheDocument();
  });

  describe('Layout', () => {
    it('should render vertical layout by default', () => {
      const { container } = render(<EmptyState testId="empty" title="Test" />);

      expect(container).toMatchSnapshot();
    });

    it('should render horizontal layout when vertical is false', () => {
      const { container } = render(
        <EmptyState testId="empty" title="Test" vertical={false} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Illustration sizes', () => {
    it('should render sm illustration size', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          illustrationSize={EmptyStateIllustrationSize.sm}
          title="Test"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render md illustration size', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          illustrationSize={EmptyStateIllustrationSize.md}
          title="Test"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render lg illustration size', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          illustrationSize={EmptyStateIllustrationSize.lg}
          title="Test"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render xl illustration size', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          illustrationSize={EmptyStateIllustrationSize.xl}
          title="Test"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render 2xl illustration size', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          illustrationSize={EmptyStateIllustrationSize['2xl']}
          title="Test"
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Danger mode', () => {
    it('should render danger mode styling', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          isDanger
          title="Error occurred"
          body="Something went wrong"
          primaryAction={{ label: 'Retry', onClick: jest.fn() }}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Inverse mode', () => {
    it('should render inverse mode styling', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          isInverse
          title="No results"
          body="Try another search"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render inverse danger mode styling', () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          isDanger
          isInverse
          title="Error"
          body="Something went wrong"
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Loading state', () => {
    it('should render loading spinner when isLoading is true', () => {
      const { container, queryByText } = render(
        <EmptyState
          isLoading
          title="This should not show"
          body="This should not show either"
        />
      );

      expect(queryByText('This should not show')).not.toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('should render loading spinner with danger color', () => {
      const { container } = render(<EmptyState isLoading isDanger />);

      expect(container).toMatchSnapshot();
    });

    it('should render loading spinner with inverse color', () => {
      const { container } = render(<EmptyState isLoading isInverse />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('Accessibility', () => {
    it('should not violate accessibility standards', async () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          title="No results found"
          body="Try adjusting your search criteria"
          primaryAction={{ label: 'Clear Filters', onClick: jest.fn() }}
        />
      );

      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });

    it('should not violate accessibility standards in danger mode', async () => {
      const { container } = render(
        <EmptyState
          illustration={<SearchIcon />}
          isDanger
          title="Error occurred"
          body="Please try again"
          primaryAction={{ label: 'Retry', onClick: jest.fn() }}
        />
      );

      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Custom children', () => {
    it('should render custom children', () => {
      const { getByText } = render(
        <EmptyState title="Test">
          <div>Custom content</div>
        </EmptyState>
      );

      expect(getByText('Custom content')).toBeInTheDocument();
    });
  });
});
