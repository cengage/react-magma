import React from 'react';

import { render, fireEvent, getByTestId } from '@testing-library/react';
import { transparentize } from 'polished';
import { AccountCircleIcon } from 'react-magma-icons';

import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';

import { Tag, TagColor, TagSize } from '.';

const TEXT = 'Text Label';

const DATA_VIZ_TAG_COLORS = [
  {
    color: TagColor.blue,
    label: 'blue',
    light: {
      background: magma.colors.blue100,
      text: magma.colors.blue600,
    },
    inverse: {
      background: magma.colors.blue900,
      backgroundTransparency: 0,
      text: magma.colors.blue400,
    },
  },
  {
    color: TagColor.teal,
    label: 'teal',
    light: {
      background: magma.colors.teal100,
      text: magma.colors.teal600,
    },
    inverse: {
      background: magma.colors.teal900,
      backgroundTransparency: 0,
      text: magma.colors.teal400,
    },
  },
  {
    color: TagColor.pink,
    label: 'pink',
    light: {
      background: magma.colors.red100,
      text: magma.colors.red600,
    },
    inverse: {
      background: magma.colors.red900,
      backgroundTransparency: 0,
      text: magma.colors.red400,
    },
  },
  {
    color: TagColor.purple,
    label: 'purple',
    light: {
      background: magma.colors.purple100,
      text: magma.colors.purple600,
    },
    inverse: {
      background: magma.colors.purple900,
      backgroundTransparency: 0,
      text: magma.colors.purple400,
    },
  },
  {
    color: TagColor.tangerine,
    label: 'tangerine',
    light: {
      background: magma.colors.tangerine100,
      text: magma.colors.tangerine700,
    },
    inverse: {
      background: magma.colors.tangerine900,
      backgroundTransparency: 0,
      text: magma.colors.tangerine400,
    },
  },
  {
    color: TagColor.indigo,
    label: 'indigo',
    light: {
      background: magma.colors.indigo100,
      text: magma.colors.indigo600,
    },
    inverse: {
      background: magma.colors.indigo900,
      backgroundTransparency: 0,
      text: magma.colors.indigo400,
    },
  },
  {
    color: TagColor.violet,
    label: 'violet',
    light: {
      background: magma.colors.violet100,
      text: magma.colors.violet600,
    },
    inverse: {
      background: magma.colors.violet900,
      backgroundTransparency: 0,
      text: magma.colors.violet400,
    },
  },
];

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
    const { getByTestId } = render(<Tag testId={testId}>{TEXT}</Tag>);
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

      expect(tag).toHaveStyleRule('background', magma.colors.neutral200);
      expect(tag).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(tag).toHaveStyleRule('border', 'none');
      expect(tag).toHaveStyleRule('box-sizing', 'border-box');
    });

    it('Should render a Tag with a primary background', () => {
      const { getByText } = render(<Tag color={TagColor.primary}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        magma.colors.brand.sunriseOrange
      );
      expect(tag).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(tag).toHaveStyleRule('border', '1px solid transparent');
    });

    it('Should render a Tag with a high contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.highContrast}>{TEXT}</Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.brand.navy);
    });

    it('Should render a Tag with a low contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.lowContrast}>{TEXT}</Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral0);
      expect(tag).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(tag).toHaveStyleRule(
        'border',
        `1px solid ${magma.colors.neutral300}`
      );
    });

    DATA_VIZ_TAG_COLORS.forEach(({ color, label, light }) => {
      it(`Should render a ${label} Tag`, () => {
        const { getByText } = render(<Tag color={color}>{TEXT}</Tag>);
        const tag = getByText('Text Label').parentElement;

        expect(tag).toHaveStyleRule('background', light.background);
        expect(tag).toHaveStyleRule('color', light.text);
        expect(tag).toHaveStyleRule('border', 'none');
      });
    });
  });

  describe('Disabled background', () => {
    it('Should render a Tag with a disabled background', () => {
      const { getByText } = render(<Tag disabled>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral200);
      expect(tag).toHaveStyleRule('color', magma.colors.neutral500);
      expect(tag).toHaveStyleRule('border', 'none');
    });

    it('Should render a Tag with a disabled primary background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.primary}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral200);
      expect(tag).toHaveStyleRule('color', magma.colors.neutral500);
      expect(tag).toHaveStyleRule('border', 'none');
    });

    it('Should render a Tag with a disabled high contrast background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.highContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral200);
      expect(tag).toHaveStyleRule('color', magma.colors.neutral500);
      expect(tag).toHaveStyleRule('border', 'none');
    });

    it('Should render a Tag with a low contrast disabled background', () => {
      const { getByText } = render(
        <Tag disabled color={TagColor.lowContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral0);
      expect(tag).toHaveStyleRule('color', magma.colors.neutral500);
      expect(tag).toHaveStyleRule(
        'border',
        `1px solid ${magma.colors.neutral300}`
      );
    });

    DATA_VIZ_TAG_COLORS.forEach(({ color, label }) => {
      it(`Should render a disabled ${label} Tag like a disabled solid Button`, () => {
        const { getByText } = render(
          <Tag disabled color={color}>
            {TEXT}
          </Tag>
        );
        const tag = getByText('Text Label').parentElement;

        expect(tag).toHaveStyleRule('background', magma.colors.neutral200);
        expect(tag).toHaveStyleRule('color', magma.colors.neutral500);
        expect(tag).toHaveStyleRule('border', 'none');
      });
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
        transparentize(0.5, magma.colors.neutral900)
      );
      expect(tag).toHaveStyleRule('color', magma.colors.neutral600);
      expect(tag).toHaveStyleRule('border', 'none');
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
        transparentize(0.5, magma.colors.neutral900)
      );
      expect(tag).toHaveStyleRule('color', magma.colors.neutral600);
      expect(tag).toHaveStyleRule('border', 'none');
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
        transparentize(0.5, magma.colors.neutral900)
      );
      expect(tag).toHaveStyleRule('color', magma.colors.neutral600);
      expect(tag).toHaveStyleRule('border', 'none');
    });

    it('Should render a inverse Tag with a low contrast disabled background', () => {
      const { getByText } = render(
        <Tag disabled isInverse color={TagColor.lowContrast}>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', 'none');
      expect(tag).toHaveStyleRule('color', magma.colors.neutral600);
      expect(tag).toHaveStyleRule(
        'border',
        `1px solid ${magma.colors.neutral800}`
      );
    });

    DATA_VIZ_TAG_COLORS.forEach(({ color, label }) => {
      it(`Should render a disabled inverse ${label} Tag like a disabled inverse solid Button`, () => {
        const { getByText } = render(
          <Tag disabled isInverse color={color}>
            {TEXT}
          </Tag>
        );
        const tag = getByText('Text Label').parentElement;

        expect(tag).toHaveStyleRule(
          'background',
          transparentize(0.5, magma.colors.neutral900)
        );
        expect(tag).toHaveStyleRule('color', magma.colors.neutral600);
        expect(tag).toHaveStyleRule('border', 'none');
      });
    });
  });

  describe('Inverse background', () => {
    it('Should render a default inverse Tag with a gray background', () => {
      const { getByText } = render(<Tag isInverse>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral800);
      expect(tag).toHaveStyleRule('border', 'none');
    });

    it('Should render a inverse Tag with a primary background', () => {
      const { getByText } = render(
        <Tag color={TagColor.primary} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule(
        'background',
        magma.colors.brand.sunriseOrange
      );
      expect(tag).toHaveStyleRule('color', magma.colors.brand.navy);
      expect(tag).toHaveStyleRule('border', '1px solid transparent');
    });

    it('Should render a inverse Tag with a high contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.highContrast} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.brand.skyBlue);
      expect(tag).toHaveStyleRule('color', magma.colors.brand.navy);
    });

    it('Should render a inverse Tag with a low contrast background', () => {
      const { getByText } = render(
        <Tag color={TagColor.lowContrast} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', 'none');
      expect(tag).toHaveStyleRule('color', magma.colors.neutral0);
      expect(tag).toHaveStyleRule(
        'border',
        `1px solid ${magma.colors.neutral800}`
      );
    });

    DATA_VIZ_TAG_COLORS.forEach(({ color, label, inverse }) => {
      it(`Should render an inverse ${label} Tag`, () => {
        const { getByText } = render(
          <Tag color={color} isInverse>
            {TEXT}
          </Tag>
        );
        const tag = getByText('Text Label').parentElement;

        expect(tag).toHaveStyleRule(
          'background',
          inverse.backgroundTransparency === 0
            ? inverse.background
            : transparentize(
                inverse.backgroundTransparency,
                inverse.background
              )
        );
        expect(tag).toHaveStyleRule('color', inverse.text);
        expect(tag).toHaveStyleRule('border', 'none');
      });
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
      expect(tag).toHaveStyleRule('height', magma.spaceScale.spacing06);
    });

    it('Should render a small Tag size with an icon', () => {
      const { getByText } = render(
        <Tag icon={<AccountCircleIcon />} size={TagSize.small} isInverse>
          {TEXT}
        </Tag>
      );
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('padding', `0 ${magma.spaceScale.spacing02}`);
      expect(tag).toHaveStyleRule('height', magma.spaceScale.spacing06);
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
      expect(tag).toHaveStyleRule('height', magma.spaceScale.spacing08);
      expect(tag).toHaveStyleRule('font-weight', '500');
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

    it('Should render the close icon with the tag text color', () => {
      const onTagDelete = jest.fn();
      const { getByTestId } = render(
        <Tag onDelete={onTagDelete} testId={testId}>
          {TEXT}
        </Tag>
      );
      const tag = getByTestId(testId);

      expect(tag).toHaveStyleRule('color', 'currentColor', {
        target: 'svg:last-child',
      });
      expect(tag).toHaveStyleRule('opacity', 'inherit', {
        target: 'svg:last-child',
      });
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
      const { getByText } = render(<Tag aria-label={TEXT} />);

      expect(getByText(TEXT)).toBeInTheDocument();
    });
  });
});
