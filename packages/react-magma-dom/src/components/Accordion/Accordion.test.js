import React from 'react';
import { axe } from 'jest-axe';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '.';
import { magma } from '../../theme/magma';
import { render, fireEvent } from '@testing-library/react';

describe('Accordion', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Accordion testId={testId}>
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the component with the correct styles', () => {
    const testId = 'test-id';

    const { getByText, getByTestId } = render(
      <Accordion testId={testId}>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByText('Button 1').parentElement;
    const panel = getByText('Panel 1');
    const accordion = getByTestId(testId);

    expect(btn).toHaveStyleRule('background', magma.colors.neutral08);
    expect(panel).toHaveStyleRule('background', magma.colors.neutral08);
    expect(accordion).toHaveStyleRule('background', magma.colors.neutral08);
  });

  it('should render the component with the correct inverse styles', () => {
    const testId = 'test-id';

    const { getByText, getByTestId } = render(
      <Accordion testId={testId} isInverse>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByText('Button 1').parentElement;
    const panel = getByText('Panel 1');
    const accordion = getByTestId(testId);

    expect(btn).toHaveStyleRule('background', magma.colors.foundation);
    expect(panel).toHaveStyleRule('background', magma.colors.foundation);
    expect(accordion).toHaveStyleRule('background', magma.colors.foundation);
  });

  it('should render the component a left-aligned icon', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Accordion iconPosition="left">
        <AccordionItem>
          <AccordionButton testId={testId}>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByTestId(testId);

    expect(btn.firstChild.nodeName).toBe('svg');
  });

  it('should not close the first panel when clicking its button', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Button 2</AccordionButton>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const panel1 = getByText('Panel 1');
    const panel2 = getByText('Panel 2');
    const btn1 = getByText('Button 1').parentElement;

    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');

    fireEvent.click(btn1);

    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');
  });

  it('should open the second panel when clicking its button', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Button 2</AccordionButton>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const panel1 = getByText('Panel 1');
    const panel2 = getByText('Panel 2');
    const btn2 = getByText('Button 2').parentElement;

    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');

    fireEvent.click(btn2);

    expect(panel1).toHaveAttribute('hidden');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  describe('collapsible', () => {
    it('should have no panels open by default when isCollapsible is true', () => {
      const { getByText } = render(
        <Accordion isCollapsible>
          <AccordionItem>
            <AccordionButton>Button 1</AccordionButton>
            <AccordionPanel>Panel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Button 2</AccordionButton>
            <AccordionPanel>Panel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      expect(getByText('Panel 1')).not.toHaveAttribute('hidden', true);
      expect(getByText('Panel 2')).not.toHaveAttribute('hidden', true);
    });

    it('should open and close the first panel when clicking its button', () => {
      const { getByText } = render(
        <Accordion isCollapsible>
          <AccordionItem>
            <AccordionButton>Button 1</AccordionButton>
            <AccordionPanel>Panel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Button 2</AccordionButton>
            <AccordionPanel>Panel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const panel1 = getByText('Panel 1');
      const btn1 = getByText('Button 1').parentElement;

      expect(panel1).toHaveAttribute('hidden');

      fireEvent.click(btn1);

      expect(panel1).not.toHaveAttribute('hidden');

      fireEvent.click(btn1);

      expect(panel1).toHaveAttribute('hidden');
    });
  });

  describe('multiple', () => {
    it('should have no panels open by default when isMultiple is true', () => {
      const { getByText } = render(
        <Accordion isMultiple>
          <AccordionItem>
            <AccordionButton>Button 1</AccordionButton>
            <AccordionPanel>Panel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Button 2</AccordionButton>
            <AccordionPanel>Panel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      expect(getByText('Panel 1')).not.toHaveAttribute('hidden', true);
      expect(getByText('Panel 2')).not.toHaveAttribute('hidden', true);
    });

    it('should leave the first panel open and open the second panel when clicking the second button', () => {
      const { getByText } = render(
        <Accordion isCollapsible>
          <AccordionItem isExpanded>
            <AccordionButton>Button 1</AccordionButton>
            <AccordionPanel>Panel 1</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Button 2</AccordionButton>
            <AccordionPanel>Panel 2</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const panel1 = getByText('Panel 1');
      const panel2 = getByText('Panel 2');
      const btn2 = getByText('Button 2').parentElement;

      expect(panel1).not.toHaveAttribute('hidden', true);
      expect(panel2).toHaveAttribute('hidden');

      fireEvent.click(btn2);

      expect(panel1).not.toHaveAttribute('hidden', true);
      expect(panel2).not.toHaveAttribute('hidden', true);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Section 1</AccordionButton>
          <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
