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
      <FormGroup textVisuallyHidden labelText={labelText}>
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

    expect(container.firstChild.children.length).toBe(2);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <FormGroup value="default">
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
