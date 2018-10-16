import * as React from 'react';
import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { Header, HeaderProps } from './Header';
import { render, cleanup } from 'react-testing-library';

const headerText = 'Test Header Text';

const BASE_HEADER_PROPS: HeaderProps = {
  size: 1,
  children: React.createElement('div')
};

const renderHeader = (myProps = {}) => {
  const props = {
    ...BASE_HEADER_PROPS,
    ...myProps
  };

  return render(<Header {...props}>{headerText}</Header>);
};

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render an h1', () => {
    const { container } = renderHeader();
    const header = container.querySelector('h1');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it('should render an h2', () => {
    const { container } = renderHeader({
      size: 2
    });
    const header = container.querySelector('h2');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it('should render an h3', () => {
    const { container } = renderHeader({
      size: 3
    });
    const header = container.querySelector('h3');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it('should render an h4', () => {
    const { container } = renderHeader({
      size: 4
    });
    const header = container.querySelector('h4');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it('should render an h5', () => {
    const { container } = renderHeader({
      size: 5
    });
    const header = container.querySelector('h5');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it('should render an h6', () => {
    const { container } = renderHeader({
      size: 6
    });
    const header = container.querySelector('h6');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });
});
