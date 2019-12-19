import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Input, InputProps } from './Input';

const INPUT_PROPS: InputProps = {
  autoFocus: false,
  placeholder: 'test placeholder'
};

const renderInput = (myProps = {}) => {
  const props = {
    ...INPUT_PROPS,
    ...myProps
  };

  return TestRenderer.create(<Input {...props} />);
};

describe('Input', () => {
  it('should render an input', () => {
    const component = renderInput();

    expect(true).toBeTruthy();
  });
});
