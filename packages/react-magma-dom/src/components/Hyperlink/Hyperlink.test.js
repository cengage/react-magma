import React from 'react';
import { axe } from '../../../axe-helper';
import { getByTestId, render } from '@testing-library/react';
import { Hyperlink, HyperlinkIconPosition } from '.';
import { magma } from '../../theme/magma';
import { KeyboardArrowRightIcon } from 'react-magma-icons';
import { ButtonSize } from '../Button';

describe('Hyperlink', () => {
  it('does not violate detectible accessibility standards', () => {
    const testId = 'a11y-test-id';
    const { container } = render(
      <Hyperlink to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a basic anchor element', () => {
    const testId = 'test-id-basic';
    const { getByTestId } = render(
      <Hyperlink to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(testId)).toHaveAttribute(
      'href',
      'https://www.google.com'
    );
  });

  it('should render a basic anchor element with link styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    const element = getByTestId(testId);

    expect(element).toHaveStyleRule('color', magma.colors.primary);
    expect(element).toHaveStyleRule('color', magma.colors.primary700, {
      target: ':hover',
    });
  });

  it('should render an inverse anchor element', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink isInverse to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    const element = getByTestId(testId);

    expect(element).toHaveStyleRule('color', magma.colors.tertiary);
    expect(element).toHaveStyleRule('color', magma.colors.neutral100, {
      target: ':hover',
    });
  });

  it('should render an anchor element with default button styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink styledAs="Button" to="https://www.google.com" testId={testId}>
        Google
      </Hyperlink>
    );

    const element = getByTestId(testId);

    expect(element).toHaveStyleRule(
      'font-size',
      magma.typeScale.size03.fontSize
    );
    expect(element).toHaveStyleRule('border-radius', magma.borderRadius);
    expect(element).toHaveStyleRule('height', magma.spaceScale.spacing09);
  });

  it('should render an anchor element with passed in button styles', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Hyperlink
        styledAs="Button"
        size="large"
        shape="round"
        to="https://www.google.com"
        testId={testId}
      >
        Google
      </Hyperlink>
    );

    const element = getByTestId(testId);

    expect(element).toHaveStyleRule(
      'font-size',
      magma.typeScale.size04.fontSize
    );
    expect(element).toHaveStyleRule('border-radius', '100%');
    expect(element).toHaveStyleRule('height', magma.spaceScale.spacing11);
  });

  it('should send back values when passed children as a function', () => {
    render(
      <Hyperlink to="https://www.google.com">
        {({ to }) => expect(to).toEqual('https://www.google.com')}
      </Hyperlink>
    );
  });

  it('should compose css when styled as button for function children', () => {
    render(
      <Hyperlink styledAs="Button" to="https://www.google.com">
        {({ className, to }) => {
          expect(to).toEqual('https://www.google.com');
          expect(className).not.toBeNull();
        }}
      </Hyperlink>
    );
  });

  describe('hasUnderline', () => {
    it('has underline text decoration by default', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Hyperlink to="https://www.google.com" testId={testId}>
          Google
        </Hyperlink>
      );
      expect(getByTestId(testId)).toHaveStyleRule(
        'text-decoration',
        'underline'
      );
    });
    it('can toggle off underline text decoration', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Hyperlink
          to="https://www.google.com"
          hasUnderline={false}
          testId={testId}
        >
          Google
        </Hyperlink>
      );
      expect(getByTestId(testId)).toHaveStyleRule('text-decoration', 'none');
    });
    it('does not have underline when styled as a button', () => {
      const testId = 'test-id';
      const { getByTestId } = render(
        <Hyperlink
          styledAs="Button"
          to="https://www.google.com"
          hasUnderline={true}
          testId={testId}
        >
          Google
        </Hyperlink>
      );
      expect(getByTestId(testId)).toHaveStyleRule('text-decoration', 'none');
    });
  });

  describe('with icons', () => {
    it('displays icon on the left', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={<KeyboardArrowRightIcon />}
          iconPosition={HyperlinkIconPosition.left}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing03
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('displays icon on the right', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={<KeyboardArrowRightIcon />}
          iconPosition={HyperlinkIconPosition.right}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-right',
        magma.spaceScale.spacing03
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('displays two icons when an array is passed and position is both', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={[
            <KeyboardArrowRightIcon key={0} />,
            <KeyboardArrowRightIcon key={1} />,
          ]}
          iconPosition={HyperlinkIconPosition.both}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-right',
        magma.spaceScale.spacing03
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing03
      );
      expect(container.querySelectorAll('svg').length).toBe(2);
      expect(container.querySelectorAll('svg')[0]).toBeInTheDocument();
      expect(container.querySelectorAll('svg')[1]).toBeInTheDocument();
    });

    it('displays one icon when an array is passed and position is left', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={[
            <KeyboardArrowRightIcon key={0} />,
            <KeyboardArrowRightIcon key={1} />,
          ]}
          iconPosition={HyperlinkIconPosition.left}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing03
      );
      expect(container.querySelectorAll('svg').length).toBe(1);
      expect(container.querySelectorAll('svg')[0]).toBeInTheDocument();
    });

    it('has larger padding when size is large', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={<KeyboardArrowRightIcon />}
          iconPosition={HyperlinkIconPosition.left}
          size={ButtonSize.large}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing05
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('has smaller padding when size is large', () => {
      const { container, getByText } = render(
        <Hyperlink
          to="https://www.google.com"
          icon={<KeyboardArrowRightIcon />}
          iconPosition={HyperlinkIconPosition.left}
          size={ButtonSize.small}
        >
          Back
        </Hyperlink>
      );
      expect(getByText('Back')).toHaveStyleRule(
        'padding-left',
        magma.spaceScale.spacing02
      );
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});
