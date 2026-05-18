import React from 'react';

import { render } from '@testing-library/react';
import { transparentize } from 'polished';
import { HelpIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';

import { NativeSelect } from '.';
import userEvent from '@testing-library/user-event';

describe('NativeSelect', () => {
  const testId = 'test-id';

  it('should find element by testId', () => {
    const { getByTestId } = render(<NativeSelect testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <NativeSelect labelText="Test">
        <option />
      </NativeSelect>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('should render a disabled select', () => {
    const { getByTestId } = render(<NativeSelect disabled testId={testId} />);
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.4, magma.colors.neutral500)
    );
  });

  it('should render a disabled inverse select', () => {
    const { getByTestId } = render(
      <NativeSelect disabled isInverse testId={testId} />
    );
    const nativeselect = getByTestId(testId);
    expect(nativeselect).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render a default border', () => {
    const { getByTestId } = render(<NativeSelect testId={testId} />);

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.neutral500}`
    );
  });

  it('should update the selected option', async () => {
    const { getByTestId } = render(
      <NativeSelect testId={testId}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </NativeSelect>
    );
    const activeOption = getByTestId(testId);

    await userEvent.selectOptions(getByTestId(testId), '2');

    expect(activeOption).toHaveDisplayValue('2');
  });

  it('should render a default inverse border', () => {
    const { getByTestId } = render(<NativeSelect isInverse testId={testId} />);

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${transparentize(0.5, magma.colors.neutral100)}`
    );
  });

  it('should render an error state', () => {
    const errorMessage = 'This is an error';
    const { getByTestId, getAllByText } = render(
      <NativeSelect errorMessage={errorMessage} testId={testId} />
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger}`
    );

    expect(getAllByText(errorMessage)[0]).toBeInTheDocument();
  });

  it('should set aria-invalid on the select when in error state', () => {
    const { getByTestId } = render(
      <NativeSelect errorMessage="Error" testId={testId}>
        <option>Red</option>
      </NativeSelect>
    );

    expect(getByTestId(testId)).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not set aria-invalid when there is no error', () => {
    const { getByTestId } = render(
      <NativeSelect testId={testId}>
        <option>Red</option>
      </NativeSelect>
    );

    expect(getByTestId(testId)).not.toHaveAttribute('aria-invalid');
  });

  it('should set aria-describedby referencing the error message element', () => {
    const { getByTestId } = render(
      <NativeSelect errorMessage="Error" testId={testId} id="my-select">
        <option>Red</option>
      </NativeSelect>
    );

    const select = getByTestId(testId);
    expect(select).toHaveAttribute('aria-describedby', 'my-select__desc');
    expect(document.getElementById('my-select__desc')).toBeInTheDocument();
  });

  it('should set aria-describedby referencing the helper message element', () => {
    const { getByTestId } = render(
      <NativeSelect helperMessage="Help text" testId={testId} id="my-select">
        <option>Red</option>
      </NativeSelect>
    );

    const select = getByTestId(testId);
    expect(select).toHaveAttribute('aria-describedby', 'my-select__desc');
  });

  it('should render an inverse error state', () => {
    const errorMessage = 'This is an error';
    const { getByTestId, getAllByText } = render(
      <NativeSelect errorMessage={errorMessage} isInverse testId={testId} />
    );

    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      `1px solid ${magma.colors.danger300}`
    );

    expect(getAllByText(errorMessage)[0]).toBeInTheDocument();
  });

  it('should have cycling navigation through options with arrow keys', async () => {
    const testId = 'select';
    const { getByTestId } = render(
      <NativeSelect testId={testId} defaultValue="1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </NativeSelect>
    );

    const selectElement = getByTestId(testId);
    selectElement.focus();

    expect(selectElement).toHaveDisplayValue('1');

    await userEvent.keyboard('{ArrowDown}');
    expect(selectElement).toHaveDisplayValue('2');

    await userEvent.keyboard('{ArrowDown}');
    expect(selectElement).toHaveDisplayValue('3');

    // Cycle back to first option
    await userEvent.keyboard('{ArrowDown}');
    expect(selectElement).toHaveDisplayValue('1');

    // Cycle to last option
    await userEvent.keyboard('{ArrowUp}');
    expect(selectElement).toHaveDisplayValue('3');
  });

  describe('additional content', () => {
    const helpLinkLabel = 'Learn more';

    const onHelpLinkClick = () => {
      alert('Help link clicked!');
    };

    it('should accept additional content to the right of the native select label', () => {
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

    it(`should display additional content inline with the native select label when labelPosition is set to 'left'`, () => {
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

    it(`should display an additional wrapper with additionalContent'`, () => {
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

    it(`shouldn't display an additional wrapper without additionalContent'`, () => {
      const { queryByTestId } = render(
        <NativeSelect labelPosition="left" testId={testId} />
      );
      expect(
        queryByTestId(`${testId}-additional-content-wrapper`)
      ).not.toBeInTheDocument();
    });

    it('should set aria-labelledby when additionalContent and labelText are present', () => {
      const { getByTestId } = render(
        <NativeSelect
          testId={testId}
          id="my-select"
          labelText="Select color"
          additionalContent={
            <Tooltip content="Learn more">
              <IconButton
                aria-label="Learn more"
                icon={<HelpIcon />}
                onClick={() => {}}
                type={ButtonType.button}
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </Tooltip>
          }
        >
          <option>Red</option>
        </NativeSelect>
      );

      const select = getByTestId(testId);
      expect(select).toHaveAttribute('aria-labelledby', 'my-select__label');
      expect(document.getElementById('my-select__label')).toHaveTextContent(
        'Select color'
      );
    });

    it('should not set aria-labelledby when there is no additionalContent', () => {
      const { getByTestId } = render(
        <NativeSelect testId={testId} labelText="Select color">
          <option>Red</option>
        </NativeSelect>
      );

      expect(getByTestId(testId)).not.toHaveAttribute('aria-labelledby');
    });
  });
});
