import React from 'react';
import { axe } from 'jest-axe';
import { Form } from '.';
import { Input } from '../Input';
import { render } from '@testing-library/react';

describe('Form', () => {
  const props = {
    header: 'default heading',
    actions: null,
    testId: 'test-id',
  };

  it('should find element by testId', () => {
    const { getByTestId } = render(<Form {...props}>Test Form</Form>);

    expect(getByTestId(props.testId)).toBeInTheDocument();
  });

  it('should render a header', () => {
    const headerText = 'FROM HEADER PROP';
    const { getByText } = render(
      <Form {...props} header={headerText}>
        Test Form
      </Form>
    );

    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should render the actions', () => {
    const actions = <button>action</button>;
    const { getByRole } = render(
      <Form {...props} actions={actions}>
        Test Form
      </Form>
    );

    expect(getByRole('button')).toHaveTextContent('action');
  });

  it('should render description', () => {
    const description = 'FORM DESCRIPTION FROM PROP';
    const { getByText } = render(
      <Form {...props} description={description}>
        Test Form
      </Form>
    );

    expect(getByText(description)).toBeInTheDocument();
  });

  it('should render errors', () => {
    const errorText = 'FORM ERROR FROM PROP';
    const { getByText } = render(
      <Form {...props} errorText={errorText}>
        Test Form
      </Form>
    );

    expect(getByText(errorText)).toBeInTheDocument();
  });

  it('should render content', () => {
    const { getByLabelText } = render(
      <Form {...props}>
        <Input labelText="Label" id="name" />
      </Form>
    );

    expect(getByLabelText('Label')).toHaveAttribute('id', 'name');
  });

  it('passes additional props to form', () => {
    const { getByTestId } = render(
      <Form {...props} method="post" action="/login">
        Test Form
      </Form>
    );

    expect(getByTestId(props.testId)).toHaveAttribute('method', 'post');
    expect(getByTestId(props.testId)).toHaveAttribute('action', '/login');
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Form {...props}>Test Form</Form>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
