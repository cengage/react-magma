import * as React from 'react';
import { axe } from 'jest-axe';
import { FormGroup } from '.';
import { Checkbox } from '../Checkbox';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Form Group', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should assign a data-testid attribute with a testId prop', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<FormGroup testId={testId}></FormGroup>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the FormGroup', () => {
    const labelText = 'Colors';
    const { getByText } = render(<FormGroup labelText={labelText} />);
    const label = getByText(labelText);

    expect(label).toBeInTheDocument();
  });

  it('should auto assign an id if none is passed in', () => {
    const labelText = 'Colors';
    const { getByText } = render(<FormGroup labelText={labelText} />);

    expect(getByText('Colors').id).not.toBeNull();
  });

  it('should persist id between renders', () => {
    const labelText = 'Colors';
    const { rerender, getByText } = render(<FormGroup labelText={labelText} />);

    const label = getByText('Colors');
    const initialId = label.id;

    rerender(<FormGroup labelText={labelText} />);

    expect(label.id).toEqual(initialId);
  });

  it('should update the id on rerender with change to prop id', () => {
    const labelText = 'Colors';
    const { rerender, getByText } = render(<FormGroup labelText={labelText} />);

    const label = getByText('Colors');
    const initialId = label.id;

    rerender(<FormGroup labelText={labelText} id="differentId" />);

    expect(label.id).not.toEqual(initialId);
  });

  it('should render children under FormGroup', () => {
    const { container } = render(
      <FormGroup>
        <Checkbox labelText="Default Color" value="default" />
      </FormGroup>
    );

    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
  });

  it('should render a form group with hidden label text with the correct styles', () => {
    const labelText = 'Color';
    const { getByText } = render(
      <FormGroup isTextVisuallyHidden labelText={labelText}>
        <Checkbox labelText="Default Color" value="default" />
      </FormGroup>
    );
    const label = getByText(labelText);

    expect(label).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
  });

  it('should render a form group with the aria-labelledby attribute', () => {
    const { container } = render(
      <FormGroup labelledById="myID">
        <h3 id="myID">Heading</h3>
        <Checkbox labelText="Default Color" value="default" />
        <Checkbox
          color={magma.colors.success01}
          labelText="Success Color"
          value="success"
        />
      </FormGroup>
    );

    const group = container.querySelector('div');

    expect(group).toHaveAttribute('aria-labelledby', 'myID');
  });

  it('should not render anything when invalid children are present', () => {
    const { container } = render(
      <FormGroup>
        <Checkbox labelText="Default Color" value="default" />
        {null}
      </FormGroup>
    );

    expect(container.firstChild.children.length).toBe(1);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <FormGroup labelText="Choose a Color" value="default">
        <Checkbox labelText="Default Color" value="default" />
        <Checkbox
          color={magma.colors.success01}
          labelText="Success Color"
          value="success"
        />
      </FormGroup>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
