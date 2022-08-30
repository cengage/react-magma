import * as React from 'react';
import { axe } from '../../../axe-helper';
import { RadioGroup } from '.';
import { Radio } from '../Radio';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Radio Group', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should assign a data-testid attribute with a testId prop', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<RadioGroup testId={testId}></RadioGroup>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the radiogroup', () => {
    const labelText = 'Colors';
    const { getByText } = render(<RadioGroup labelText={labelText} />);
    const label = getByText(labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render children under radiogroup', () => {
    const { container } = render(
      <RadioGroup>
        <Radio id="colorRadio" labelText="Default Color" value="default" />
      </RadioGroup>
    );

    expect(container.querySelector('input[type="radio"]')).not.toBeNull();
  });

  it('should render a radio group with hidden label text with the correct styles', () => {
    const labelText = 'Color';
    const { getByText } = render(
      <RadioGroup isTextVisuallyHidden labelText={labelText}>
        <Radio id="colorRadio" labelText="Default Color" value="default" />
      </RadioGroup>
    );
    const label = getByText(labelText);

    expect(label).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
  });

  it('should render a radio group with the aria-labelledby attribute', () => {
    const { container } = render(
      <RadioGroup name="colors" labelledById="myID">
        <h3 id="myID">Heading</h3>
        <Radio labelText="Default Color" value="default" />
        <Radio
          color={magma.colors.success}
          labelText="Success Color"
          value="success"
        />
      </RadioGroup>
    );

    const group = container.querySelector('div');

    expect(group).toHaveAttribute('aria-labelledby', 'myID');
  });

  it('should not render anything except the container and the message container when invalid children are present', () => {
    const { container } = render(
      <RadioGroup>
        <Radio id="colorRadio" labelText="Default Color" value="default" />
        {null}
      </RadioGroup>
    );

    expect(container.firstChild.children.length).toBe(2);
  });

  it('Should select an option based on value passed to group', () => {
    const { getByLabelText } = render(
      <RadioGroup value="default">
        <Radio id="colorRadio" labelText="Default Color" value="default" />
        <Radio
          color={magma.colors.success}
          id="successColorRadio"
          labelText="Success Color"
          value="success"
        />
      </RadioGroup>
    );

    expect(getByLabelText('Default Color')).toHaveAttribute('checked');
    expect(getByLabelText('Success Color')).not.toHaveAttribute('checked');
  });

  it('Should render an error message', () => {
    const errorMessage = 'test error';
    const { getByText } = render(
      <RadioGroup value="default" errorMessage={errorMessage} id="testId">
        <Radio labelText="Default Color" value="default" />
        <Radio labelText="Success Color" value="success" />
      </RadioGroup>
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
    expect(getByText(errorMessage).parentElement).toHaveAttribute(
      'id',
      'testId__desc'
    );
  });

  it('Should render a helper message', () => {
    const helperMessage = 'test helper message';
    const { getByText } = render(
      <RadioGroup value="default" helperMessage={helperMessage} id="testId">
        <Radio labelText="Default Color" value="default" />
        <Radio labelText="Success Color" value="success" />
      </RadioGroup>
    );

    expect(getByText(helperMessage)).toBeInTheDocument();
    expect(getByText(helperMessage).parentElement).toHaveAttribute(
      'id',
      'testId__desc'
    );
  });

  it('Changes the selected radio when clicked', () => {
    const onChangeSpy = jest.fn();
    const { getByLabelText } = render(
      <RadioGroup
        value="default"
        labelText="Colors"
        id="colorsGroup"
        name="colors"
        onChange={onChangeSpy}
      >
        <Radio id="colorRadio" labelText="Default Color" value="default" />
        <Radio
          color={magma.colors.success}
          id="successColorRadio"
          labelText="Success Color"
          value="success"
        />
      </RadioGroup>
    );

    fireEvent.click(getByLabelText('Success Color'));

    expect(onChangeSpy).toHaveBeenCalledTimes(1);

    waitFor(() => {
      expect(getByLabelText('Default Color')).not.toHaveAttribute('checked');
      expect(getByLabelText('Success Color')).toHaveAttribute('checked');
    }, 1000);
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <RadioGroup labelText="Choose a Color" value="default">
        <Radio id="colorRadio" labelText="Default Color" value="default" />
        <Radio
          color={magma.colors.success}
          id="successColorRadio"
          labelText="Success Color"
          value="success"
        />
      </RadioGroup>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
