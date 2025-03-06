import React from 'react';

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { magma } from 'react-magma-dom';

import { Header } from '.';

describe('Header', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Header testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a menu button', () => {
    const { getByLabelText } = render(
      <Header breakpoint={600} onMenuButtonClick={() => {}} />
    );

    expect(getByLabelText('Open navigation menu')).toBeInTheDocument();
  });

  it('should render a header with compact styles', () => {
    const { getByTestId } = render(<Header isCompact logo={<img alt="" />} />);

    expect(getByTestId('logoWrapper')).toHaveStyleRule(
      'height',
      magma.spaceScale.spacing06,
      {
        target: 'img',
      }
    );
  });

  it('should render a call to action', () => {
    const text = 'Click me';
    const ctaProps = {
      children: text,
      to: '#',
    };
    const { getByText } = render(<Header callToActionProps={ctaProps} />);

    expect(getByText(text)).toHaveAttribute('href', '#');
  });

  it('should render a search box', () => {
    const { container } = render(
      <Header searchProps={{ onSearch: () => {} }} />
    );

    expect(container.querySelector('input')).toHaveAttribute('type', 'search');
  });

  it('should render children', () => {
    const { getByText } = render(
      <Header>
        <div>children</div>
      </Header>
    );

    expect(getByText('children')).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Header>Test Text</Header>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
