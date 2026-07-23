import React from 'react';

import { render } from '@testing-library/react';
import { transparentize } from 'polished';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Skeleton, SkeletonAnimation, SkeletonVariant } from '.';

describe('Skeleton', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the skeleton component', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyleRule(
      'background-color',
      magma.colors.neutral300
    );
  });

  it('should be hidden from assistive technology by default', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(testId)).toHaveAttribute('aria-hidden', 'true');
    expect(getByTestId(testId)).not.toHaveAttribute('role');
    expect(getByTestId(testId)).not.toHaveAttribute('aria-label');
  });

  it('should expose a status live region when aria-label is provided', () => {
    const testId = 'test-id';
    const label = 'Loading profile';
    const { getByTestId, getByRole } = render(
      <Skeleton testId={testId} aria-label={label} />
    );
    const skeleton = getByTestId(testId);

    expect(skeleton).not.toHaveAttribute('aria-hidden');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-label', label);
    expect(getByRole('status')).toBe(skeleton);
  });

  it('should default to the text variant', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-radius',
      magma.borderRadiusSmall
    );
  });

  it('should render the rectangle variant with no border radius', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.rectangle} />
    );

    expect(getByTestId(testId)).toHaveStyleRule('border-radius', '0');
  });

  it('should render the rounded variant with the theme border radius', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.rounded} />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'border-radius',
      magma.borderRadius
    );
  });

  it('should render the circle variant as a circle', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.circle} />
    );

    expect(getByTestId(testId)).toHaveStyleRule('border-radius', '50%');
  });

  it('should default to a width of 100%', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.rectangle} />
    );

    expect(getByTestId(testId)).toHaveStyleRule('width', '100%');
  });

  it('should apply a numeric width and height in px', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton
        testId={testId}
        variant={SkeletonVariant.rectangle}
        width={200}
        height={40}
      />
    );

    expect(getByTestId(testId)).toHaveStyleRule('width', '200px');
    expect(getByTestId(testId)).toHaveStyleRule('height', '40px');
  });

  it('should apply a string width and height as provided', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton
        testId={testId}
        variant={SkeletonVariant.rectangle}
        width="50%"
        height="2rem"
      />
    );

    expect(getByTestId(testId)).toHaveStyleRule('width', '50%');
    expect(getByTestId(testId)).toHaveStyleRule('height', '2rem');
  });

  it('should ignore the height for the text variant', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.text} height={40} />
    );

    expect(getByTestId(testId)).toHaveStyleRule('height', '1.2em');
  });

  it('should render children and infer its width from them', () => {
    const testId = 'test-id';
    const { getByTestId, getByText } = render(
      <Skeleton testId={testId} variant={SkeletonVariant.circle}>
        <span>Avatar</span>
      </Skeleton>
    );

    expect(getByText('Avatar')).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveStyleRule('width', 'auto');
    expect(getByTestId(testId)).toHaveStyleRule('display', 'inline-flex');
  });

  it('should render the shimmer animation according to the prefers-reduced-motion query', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} />);

    expect(getByTestId(testId)).toHaveStyleRule(
      'animation',
      expect.stringContaining('1.6s'),
      {
        target: '::after',
        media: 'prefers-reduced-motion: no-preference',
      }
    );

    expect(getByTestId(testId)).not.toHaveStyleRule('animation', {
      target: '::after',
    });
  });

  it('should not render the animation when hasAnimation is false', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} hasAnimation={false} />
    );

    expect(getByTestId(testId)).not.toHaveStyleRule('animation', {
      target: '::after',
      media: 'prefers-reduced-motion: no-preference',
    });
  });

  it('should render the pulse animation on the element when animation is pulse', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Skeleton testId={testId} animation={SkeletonAnimation.pulse} />
    );

    expect(getByTestId(testId)).toHaveStyleRule(
      'animation',
      expect.stringContaining('1.5s'),
      {
        media: 'prefers-reduced-motion: no-preference',
      }
    );

    expect(getByTestId(testId)).not.toHaveStyleRule('animation');
  });

  it('should render inverse colors when isInverse is true', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Skeleton testId={testId} isInverse />);

    expect(getByTestId(testId)).toHaveStyleRule(
      'background-color',
      transparentize(0.8, magma.colors.neutral100)
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Skeleton />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Does not violate accessibility standards when labelled', () => {
    const { container } = render(<Skeleton aria-label="Loading profile" />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
