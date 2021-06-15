import React from 'react';
import { axe } from 'jest-axe';
import { magma } from '../../theme/magma';
import { Tag, TagColor, TagSize } from '.';
import { render, fireEvent } from '@testing-library/react';
import { I18nContext, deleteAriaLabel } from '../../i18n';
import { AccountCircleIcon } from 'react-magma-icons';

const TEXT = 'Text Label';

describe('Tag', () => {
  it('should render the visually hidden component', () => {
    const { container, getByText } = render(
      <Tag>{TEXT}</Tag>
    );

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Tag testId={testId}>{TEXT}</Tag>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('Should render a default Tag with a gray background', () => {
    const { getByText } = render(<Tag>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
  });

  it('Should render a Tag with a primary background', () => {
    const { getByText } = render(<Tag color={TagColor.primary}>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.primary);
  });

  it('Should render a Tag with a high contrast background', () => {
    const { getByText } = render(<Tag color={TagColor.highContrast}>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.neutral);
  });
  
  it('Should render a Tag with a low contrast background', () => {
    const { getByText } = render(<Tag color={TagColor.lowContrast}>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.neutral08);
  });
    
  it('Should render a default inverse Tag with a gray background', () => {
    const { getByText } = render(<Tag isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.neutral03);
  });
  
  it('Should render a inverse Tag with a primary background', () => {
    const { getByText } = render(<Tag color={TagColor.primary} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.primaryInverse);
  });
  
  it('Should render a inverse Tag with a high contrast background', () => {
    const { getByText } = render(<Tag color={TagColor.highContrast} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', magma.colors.neutral08);
  });
 
  it('Should render a inverse Tag with a low contrast background', () => {
    const { getByText } = render(<Tag color={TagColor.lowContrast} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('background', 'none');
  });

  it('Should render a small Tag size', () => {
    const { getByText } = render(<Tag size={TagSize.small} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('padding', '0');
  });

  it('Should render a small Tag size with an icon', () => {
    const { getByText } = render(<Tag icon={<AccountCircleIcon />} size={TagSize.small} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('padding', `0 ${magma.spaceScale.spacing01}`);
  });

  it('Should render a medium Tag size with an icon', () => {
    const { getByText } = render(<Tag icon={<AccountCircleIcon />} isInverse>{TEXT}</Tag>);
    const tag = getByText('Text Label').parentElement;

    expect(tag).toHaveStyleRule('padding', `${magma.spaceScale.spacing02}`);
  });

  it('Should render a clickable tag', () => {
    const isClickable = jest.fn();
    const { getByText } = render(
      <Tag onClick={isClickable}>{TEXT}</Tag>
    );
    const button = getByText(TEXT);

    fireEvent.click(button);
    expect(isClickable).toHaveBeenCalled();
  });

  it('Should render a deletable tag', () => {
    const isClickable = jest.fn();
    const { getByText } = render(
      <Tag onDelete={isClickable}>{TEXT}</Tag>
    );
    const button = getByText(TEXT);

    fireEvent.click(button);
    expect(isClickable).toHaveBeenCalled();
  });


  it('Does not violate accessibility standards', () => {
    const { container } = render(<Tag>{TEXT}</Tag>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Supports i18n', () => {
    const example = 'Delete Tag';
    const { getByText } = render(<I18nContext.Provider value={{ ...deleteAriaLabel, example}}>
      <Tag>Delete Tag</Tag>
    </I18nContext.Provider>);

    expect(getByText(example)).toBeInTheDocument();
  })
});
