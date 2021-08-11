import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { Tag, TagColor, TagSize } from '.';
import { render, fireEvent } from '@testing-library/react';
import { I18nContext, deleteAriaLabel } from '../../i18n';
import { AccountCircleIcon, CancelIcon } from 'react-magma-icons';

const TEXT = 'Text Label';

describe('Tag', () => {
  it('should render the tag', () => {
    const { getByText } = render(
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


  describe('Default background tests', () => {

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

  });

  
  describe('Disabled background tests', () => {

    it('Should render a Tag with a disabled background', () => {
      const { getByText } = render(<Tag disabled>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
    });

    it('Should render a Tag with a disabled primary background', () => {
      const { getByText } = render(<Tag disabled color={TagColor.primary}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
    });

    it('Should render a Tag with a disabled high contrast background', () => {
      const { getByText } = render(<Tag disabled color={TagColor.highContrast}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;

      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
      expect(tag).toHaveStyleRule('color', `${magma.colors.neutral03}99`);
    });

    it('Should render a Tag with a low contrast disabled background', () => {
      const { getByText } = render(<Tag disabled color={TagColor.lowContrast}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;
      
      expect(tag).toHaveStyleRule('background', magma.colors.neutral08);
      expect(tag).toHaveStyleRule('box-shadow', `0 0 0 1px ${magma.colors.neutral06}`);
    });
    
  });

  
  describe('Disabled Inverse background tests', () => {

    it('Should render a inverse Tag with a disabled background', () => {
      const { getByText } = render(<Tag disabled isInverse>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;
      
      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
    });

    it('Should render a inverse Tag with a disabled primary background', () => {
      const { getByText } = render(<Tag disabled isInverse color={TagColor.primary}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;
      
      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
    });
    
    it('Should render a inverse Tag with a disabled high contrast background', () => {
      const { getByText } = render(<Tag disabled isInverse color={TagColor.highContrast}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;
      
      expect(tag).toHaveStyleRule('background', magma.colors.neutral06);
    });
  
    it('Should render a inverse Tag with a low contrast disabled background', () => {
      const { getByText } = render(<Tag disabled isInverse color={TagColor.lowContrast}>{TEXT}</Tag>);
      const tag = getByText('Text Label').parentElement;
      
      expect(tag).toHaveStyleRule('background', 'none');
      expect(tag).toHaveStyleRule('box-shadow', `0 0 0 1px ${magma.colors.neutral08}40`);
    });
  
  });

    
  describe('Inverse background tests', () => {

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

  });


  describe('Size tests', () => {

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

  });


  describe('Events tests', () => {

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
  
  });


  describe('Accessibility tests', () => {
  
    it('Does not violate accessibility standards', () => {
      const { container } = render(<Tag>{TEXT}</Tag>);

      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });

    it('Should have an aria-label on the tag', () => {
      const { getByText } = render(
        <Tag aria-label={TEXT}></Tag>
      );

      expect(getByText(TEXT)).toBeInTheDocument();
    });
  
  });
  
});