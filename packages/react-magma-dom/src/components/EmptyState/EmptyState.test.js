import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { EmptyState } from '.';

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

  it('should render with description text', () => {
    const description = 'Try adjusting your search criteria';
    const { getByText } = render(<EmptyState description={description} />);

    expect(getByText(description)).toBeInTheDocument();
  });

  it('should render with icon', () => {
    const { container } = render(
      <EmptyState icon={<SearchIcon />} title="Test" />
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render icon in circular container', () => {
    const { container } = render(
      <EmptyState icon={<SearchIcon />} title="Test" />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render actions', async () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <EmptyState
        title="Test"
        actions={<Button onClick={onClick}>Add Item</Button>}
      />
    );

    const button = getByText('Add Item');
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render multiple actions via ButtonGroup', () => {
    const { getByText } = render(
      <EmptyState
        title="Test"
        actions={
          <ButtonGroup>
            <Button color={ButtonColor.primary}>Search Again</Button>
            <Button color={ButtonColor.secondary}>Clear Filters</Button>
            <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
              Browse All Courses
            </Button>
          </ButtonGroup>
        }
      />
    );

    expect(getByText('Search Again')).toBeInTheDocument();
    expect(getByText('Clear Filters')).toBeInTheDocument();
    expect(getByText('Browse All Courses')).toBeInTheDocument();
  });

  it('should render additionalContent between text and actions', () => {
    const { container } = render(
      <EmptyState
        title="No results"
        description="Try a different search"
        actions={<Button>Search Again</Button>}
        additionalContent={
          <div data-testid="custom-content">Custom content</div>
        }
      />
    );

    const contentSlot = container.querySelector(
      '[data-testid="custom-content"]'
    );
    expect(contentSlot).toBeInTheDocument();
    expect(contentSlot.textContent).toBe('Custom content');

    expect(container).toMatchSnapshot();
  });

  describe('Danger mode', () => {
    it('should render danger mode styling', () => {
      const { container } = render(
        <EmptyState
          icon={<SearchIcon />}
          isDanger
          title="Error occurred"
          description="Something went wrong"
          actions={<Button>Retry</Button>}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('Inverse mode', () => {
    it('should render inverse mode styling', () => {
      const { container } = render(
        <EmptyState
          icon={<SearchIcon />}
          isInverse
          title="No results"
          description="Try another search"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should render inverse description at full opacity', () => {
      const { getByText } = render(
        <EmptyState
          icon={<SearchIcon />}
          isInverse
          title="No results"
          description="Try another search"
        />
      );

      const description = getByText('Try another search');
      expect(description).toHaveStyleRule('color', magma.colors.neutral100);
      expect(description).not.toHaveStyleRule('opacity', '0.7');
    });

    it('should render inverse danger mode styling', () => {
      const { container } = render(
        <EmptyState
          icon={<SearchIcon />}
          isDanger
          isInverse
          title="Error"
          description="Something went wrong"
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
          description="This should not show either"
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
          icon={<SearchIcon />}
          title="No results found"
          description="Try adjusting your search criteria"
          actions={<Button>Clear Filters</Button>}
        />
      );

      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });

    it('should not violate accessibility standards in danger mode', async () => {
      const { container } = render(
        <EmptyState
          icon={<SearchIcon />}
          isDanger
          title="Error occurred"
          description="Please try again"
          actions={<Button>Retry</Button>}
        />
      );

      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });

    it('should not violate accessibility standards with multiple actions', async () => {
      const { container } = render(
        <EmptyState
          icon={<SearchIcon />}
          title="No results found"
          description="Try adjusting your search criteria"
          actions={
            <ButtonGroup>
              <Button color={ButtonColor.primary}>Search Again</Button>
              <Button color={ButtonColor.secondary}>Clear Filters</Button>
              <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
                Browse All Courses
              </Button>
            </ButtonGroup>
          }
        />
      );

      const results = await axe(container.innerHTML);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Additional content', () => {
    it('should render additional content', () => {
      const { getByText } = render(
        <EmptyState
          title="Test"
          additionalContent={<div>Custom content</div>}
        />
      );

      expect(getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('Custom graphic', () => {
    it('should render customGraphic without circular container', () => {
      const { getByAltText, container } = render(
        <EmptyState
          customGraphic={
            <img src="illustration.svg" alt="custom illustration" />
          }
          title="Test"
        />
      );

      expect(getByAltText('custom illustration')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('should prioritize customGraphic over icon', () => {
      const { getByAltText, container } = render(
        <EmptyState
          customGraphic={
            <img src="illustration.svg" alt="custom illustration" />
          }
          icon={<SearchIcon />}
          title="Test"
        />
      );

      expect(getByAltText('custom illustration')).toBeInTheDocument();
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });
});
