import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Tag, TagColor, TagSize } from '.';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { transparentize } from 'polished';
import { AccountCircleIcon, CancelIcon } from 'react-magma-icons';

const TEXT = 'Text Label';

describe('Tag', () => {
  it('should render the tag', () => {
    const { getByText } = render(<Tag>{TEXT}</Tag>);

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Tag testId={testId}>{TEXT}</Tag>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should not have a focus state', () => {
    const testId = 'tag-id';
    const { getByTestId } = render(
      <Tag testId={testId}>
        {TEXT}
      </Tag>
    );
    const tag = getByTestId(testId);

    expect(tag).not.toHaveStyleRule('outline-offset', '2px', {
      target: ':focus',
    });
    expect(tag).not.toHaveStyleRule(
      'outline',
      `2px solid ${magma.colors.focus}`,
      {
        target: ':focus',
      }
    );
  });

  describe('Default background', () => {
    it('Should render a default Tag with a gray background', () => {
      const { getByText } = render(<Tag>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral300);
    });

    it('Should render a Tag with a primary background', () => {
      const { getByText } = render(<Tag color={TagColor.primary}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.primary);
    });

    it('Should render a Tag with a high contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.highContrast}>{TEXT}</Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral700);
    });

    it('Should render a Tag with a low contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.lowContrast}>{TEXT}</Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral100);
    });
  });

  describe('Disabled background', () => {
    it('Should render a Tag with a disabled background', () => {
      const { getByText } = render(<Tag disabled>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.4, magma.colors.neutral300)
      );
    });

    it('Should render a Tag with a disabled primary background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.primary}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.4, magma.colors.neutral300)
      );
    });

    it('Should render a Tag with a disabled high contrast background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.highContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.4, magma.colors.neutral300)
      );
      expect(tag).toHaveStyleRule(
        'color',
        transparentize(0.4, magma.colors.neutral500)
      );
    });

    it('Should render a Tag with a low contrast disabled background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.lowContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral100);
      expect(tag).toHaveStyleRule(
        'box-shadow',
        `0 0 0 1px ${magma.colors.neutral300}`
      );
    });
  });

  describe('Disabled Inverse background', () => {
    it('Should render a inverse Tag with a disabled background', () => {
      const { getByText } = render(
        <Tag disabled isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.7, magma.colors.neutral100)
      );
    });

    it('Should render a inverse Tag with a disabled primary background', () => {
      const { getByText } = render(
        <Tag disabled isInverse color={TagColor.primary}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.7, magma.colors.neutral100)
      );
    });

    it('Should render a inverse Tag with a disabled high contrast background', () => {
      const { getByText } = render(
        <Tag disabled isInverse color={TagColor.highContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        transparentize(0.7, magma.colors.neutral100)
      );
    });

    it('Should render a inverse Tag with a low contrast disabled background', () => {
      const { getByText } = render(
        <Tag disabled isInverse color={TagColor.lowContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', 'none');
      expect(tag).toHaveStyleRule(
        'box-shadow',
        `0 0 0 1px ${transparentize(0.8, magma.colors.neutral100)}`
      );
    });
  });

  describe('Inverse background', () => {
    it('Should render a default inverse Tag with a gray background', () => {
      const { getByText } = render(<Tag isInverse>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral);
    });

    it('Should render a inverse Tag with a primary background', () => {
      const { getByText } = render(
        <Tag color={TagColor.primary} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.tertiary500);
    });

    it('Should render a inverse Tag with a high contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.highContrast} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral100);
    });

    it('Should render a inverse Tag with a low contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.lowContrast} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', 'none');
    });
  });

  describe('Size', () => {
    it('Should render a small Tag size', () => {
      const { getByText } = render(
        <Tag size={TagSize.small} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('padding', `0 ${magma.spaceScale.spacing02}`);
    });

    it('Should render a small Tag size with an icon', () => {
      const { getByText } = render(
        <Tag icon={<AccountCircleIcon />} size={TagSize.small} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('padding', `0 ${magma.spaceScale.spacing02}`);
    });

    it('Should render a medium Tag size with an icon', () => {
      const { getByText } = render(
        <Tag icon={<AccountCircleIcon />} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'padding',
        `${magma.spaceScale.spacing02} 6px`
      );
    });
  });

  describe('Clickable Tag', () => {
    const testId = 'clickableTag';

    it('Should render a clickable tag', () => {
      const isClickable = jest.fn();
      const { getByText } = render(<Tag onClick={isClickable}>{TEXT}</Tag>);
      const tag = getByText(TEXT);

      fireEvent.click(tag);
      expect(isClickable).toHaveBeenCalled();
    });

    it('Should have a focus state', () => {
      const isClickable = jest.fn();
      const { getByTestId } = render(
        <Tag onClick={isClickable} testId={testId}>
          {TEXT}
        </Tag>
      );
      const tag = getByTestId(testId);

      expect(tag).toHaveStyleRule('outline-offset', '2px', {
        target: ':focus',
      });
      expect(tag).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    it('Should have a focus state when isInverse', () => {
      const isClickable = jest.fn();
      const { getByTestId } = render(
        <Tag onClick={isClickable} testId={testId} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByTestId(testId);

      expect(tag).toHaveStyleRule('outline-offset', '2px', {
        target: ':focus',
      });
      expect(tag).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focusInverse}`,
        {
          target: ':focus',
        }
      );
    });
  });

  describe('Deletable Tag', () => {
    const testId = 'deleteTag';

    it('Should render a deletable tag', () => {
      const onTagDelete = jest.fn();
      const { getByText } = render(<Tag onDelete={onTagDelete}>{TEXT}</Tag>);
      const tag = getByText(TEXT);

      fireEvent.click(tag);
      expect(onTagDelete).toHaveBeenCalled();
    });

    it('Should have a focus state', () => {
      const onTagDelete = jest.fn();
      const { getByTestId } = render(
        <Tag onDelete={onTagDelete} testId={testId}>
          {TEXT}
        </Tag>
      );
      const tag = getByTestId(testId);

      expect(tag).toHaveStyleRule('outline-offset', '2px', {
        target: ':focus',
      });
      expect(tag).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focus}`,
        {
          target: ':focus',
        }
      );
    });

    it('Should have a focus state when isInverse', () => {
      const onTagDelete = jest.fn();
      const { getByTestId } = render(
        <Tag onDelete={onTagDelete} testId={testId} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByTestId(testId);

      expect(tag).toHaveStyleRule('outline-offset', '2px', {
        target: ':focus',
      });
      expect(tag).toHaveStyleRule(
        'outline',
        `2px solid ${magma.colors.focusInverse}`,
        {
          target: ':focus',
        }
      );
    });
  });

  describe('Accessibility tests', () => {
    it('Does not violate accessibility standards', () => {
      const { container } = render(<Tag>{TEXT}</Tag>);

      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });

    it('Should have an aria-label on the tag', () => {
      const { getByText } = render(<Tag aria-label={TEXT}></Tag>);

      expect(getByText(TEXT)).toBeInTheDocument();
    });
  });
});
