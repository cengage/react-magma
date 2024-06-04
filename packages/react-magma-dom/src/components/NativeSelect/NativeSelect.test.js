import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { NativeSelect } from '.';
import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';
import { HelpIcon } from 'react-magma-icons';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';

describe('NativeSelect', () => {
  const testId = 'test-id';

  it('should find element by testId', () => {
    const { getByTestId } = render(
      <NativeSelect testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <NativeSelect labelText="Test">
        <option></option>
      </NativeSelect>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render a disabled select', () => {
    const { getByTestId } = render(
      <NativeSelect disabled testId={testId}></NativeSelect>
    );
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('should render a disabled inverse select', () => {
    const { getByTestId } = render(
      <NativeSelect disabled isInverse testId={testId}></NativeSelect>
    );
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render a default border', () => {
    const { getByTestId } = render(
      <NativeSelect testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral500}`
    );
  });

  it('should update the selected option', () => {
    const { getByTestId } = render(
      <NativeSelect testId={testId}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </NativeSelect>
    );
    const activeOption = getByTestId(testId);

    fireEvent.change(getByTestId(testId), { target: { value: 2 } });

    expect(activeOption).toHaveDisplayValue('2');
  });

  it('should render a default inverse border', () => {
    const { getByTestId } = render(
      <NativeSelect isInverse testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${transparentize(0.5, magma.colors.neutral100)}`
    );
  });

  it('should render an error state', () => {
    const errorMessage = 'This is an error';
    const { getByTestId, getByText } = render(
      <NativeSelect errorMessage={errorMessage} testId={testId}></NativeSelect>
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger}`
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render an inverse error state', () => {
    const errorMessage = 'This is an error';
    const { getByTestId, getByText } = render(
      <NativeSelect errorMessage={errorMessage} isInverse testId={testId} />
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger200}`
    );

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  describe('additional content', () => {
    const helpLinkLabel = 'Learn more';

    const onHelpLinkClick = () => {
      alert('Help link clicked!');
    };

    it('Should accept additional content to the right of the native select label', () => {
      const { getByTestId } = render(
        <NativeSelect
          testId={testId}
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                testId="Icon Button"
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
        />
      );
      expect(getByTestId(testId)).toBeInTheDocument();
      expect(getByTestId('Icon Button')).toBeInTheDocument();
    });

    it(`Should display additional content inline with the native select label when labelPosition is set to 'left'`, () => {
      const { getByTestId } = render(
        <NativeSelect
          labelPosition="left"
          testId={testId}
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                testId="Icon Button"
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
        />
      );
      expect(getByTestId(`${testId}-form-field-container`)).toHaveStyleRule(
        'display',
        'flex'
      );
    });

    it(`Should display an additional wrapper with additionalContent'`, () => {
      const { queryByTestId } = render(
        <NativeSelect
          labelPosition="left"
          testId={testId}
          additionalContent={
            <Tooltip content={helpLinkLabel}>
              <IconButton
                aria-label={helpLinkLabel}
                icon={<HelpIcon />}
                onClick={onHelpLinkClick}
                testId="Icon Button"
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
        />
      );
      expect(
        queryByTestId(`${testId}-additional-content-wrapper`)
      ).toBeInTheDocument();
    });

    it(`Shouldn't display an additional wrapper without additionalContent'`, () => {
      const { queryByTestId } = render(
        <NativeSelect labelPosition="left" testId={testId} />
      );
      expect(
        queryByTestId(`${testId}-additional-content-wrapper`)
      ).not.toBeInTheDocument();
    });
  });
});
