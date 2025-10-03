import React, { act } from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axe } from '../../../axe-helper';
import { Button } from '../Button';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '.';

describe('Accordion', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Accordion testId={testId} defaultIndex={[0]}>
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
      <Accordion testId={testId} defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByText('Button 1').parentElement;
    const panel = getByText('Panel 1');
    const accordion = getByTestId(testId);

    expect(btn).toHaveStyleRule('background', 'transparent');
    expect(panel).toHaveStyleRule('background', 'transparent');
    expect(accordion).toHaveStyleRule('background', 'transparent');
  });

  it('should render the component with the correct inverse styles', () => {
    const testId = 'test-id';

    const { getByText, getByTestId } = render(
      <Accordion testId={testId} defaultIndex={[0]} isInverse>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByText('Button 1').parentElement;
    const panel = getByText('Panel 1');
    const accordion = getByTestId(testId);

    expect(btn).toHaveStyleRule('background', 'transparent');
    expect(panel).toHaveStyleRule('background', 'transparent');
    expect(accordion).toHaveStyleRule('background', 'transparent');
  });

  it('should render the component a left-aligned icon', () => {
    const testId = 'test-id';

    const { getByTestId } = render(
      <Accordion iconPosition="left" defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton testId={testId}>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByTestId(testId);

    expect(btn.firstChild.firstChild.nodeName).toBe('svg');
  });

  it('should not allow focusabled elements to be focused when accordion is collapsed', async () => {
    const testId = 'test-id';

    const { queryByTestId } = render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Button 1</AccordionButton>
          <AccordionPanel>
            <Button testId={testId}>Hello</Button>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Button 2</AccordionButton>
          <AccordionPanel>Panel 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    await userEvent.tab();

    expect(queryByTestId(testId)).not.toEqual(document.activeElement);
  });

  describe('keyboard behavior', () => {
    it('should navigate to the next item and back to the first item when pressing the down arrow', async () => {
      const testId1 = 'test-id1';
      const testId2 = 'test-id2';

      const { getByTestId } = render(
        <Accordion>
          <AccordionItem>
            <AccordionButton testId={testId1}>Section 1</AccordionButton>
            <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton testId={testId2}>Section 2</AccordionButton>
            <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const btn1 = getByTestId(testId1);
      const btn2 = getByTestId(testId2);

      act(() => {
        btn1.focus();
      });

      await userEvent.keyboard('{Arrowdown}');

      expect(btn2).toHaveFocus();

      await userEvent.keyboard('{Arrowdown}');

      expect(btn1).toHaveFocus();
    });

    it('should navigate to the previous item and back to the last item when pressing the down arrow', async () => {
      const testId1 = 'test-id1';
      const testId2 = 'test-id2';

      const { getByTestId } = render(
        <Accordion>
          <AccordionItem>
            <AccordionButton testId={testId1}>Section 1</AccordionButton>
            <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton testId={testId2}>Section 2</AccordionButton>
            <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const btn1 = getByTestId(testId1);
      const btn2 = getByTestId(testId2);

      act(() => {
        btn2.focus();
      });

      await userEvent.keyboard('{ArrowUp}');

      expect(btn1).toHaveFocus();

      await userEvent.keyboard('{ArrowUp}');

      expect(btn2).toHaveFocus();
    });

    it('should focus to the first item when pressing the home key', async () => {
      const testId1 = 'test-id1';
      const testId2 = 'test-id2';

      const { getByTestId } = render(
        <Accordion>
          <AccordionItem>
            <AccordionButton testId={testId1}>Section 1</AccordionButton>
            <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton testId={testId2}>Section 2</AccordionButton>
            <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const btn1 = getByTestId(testId1);
      const btn2 = getByTestId(testId2);

      act(() => {
        btn2.focus();
      });

      await userEvent.keyboard('{Home}');

      expect(btn1).toHaveFocus();
    });

    it('should focus to the last item when pressing the end key', async () => {
      const testId1 = 'test-id1';
      const testId2 = 'test-id2';

      const { getByTestId } = render(
        <Accordion>
          <AccordionItem>
            <AccordionButton testId={testId1}>Section 1</AccordionButton>
            <AccordionPanel>Content for section one lorem ipsum</AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton testId={testId2}>Section 2</AccordionButton>
            <AccordionPanel>Content for section two lorem ipsum</AccordionPanel>
          </AccordionItem>
        </Accordion>
      );

      const btn1 = getByTestId(testId1);
      const btn2 = getByTestId(testId2);

      btn1.focus();

      await userEvent.keyboard('{End}');

      expect(btn2).toHaveFocus();
    });
  });

  it('should fire the onExpandedChange event', async () => {
    const testId = 'test-id';
    const handleExpandedChange = jest.fn();

    const { getByTestId } = render(
      <Accordion onExpandedChange={handleExpandedChange}>
        <AccordionItem>
          <AccordionButton testId={testId}>Button 1</AccordionButton>
          <AccordionPanel>Panel 1</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const btn = getByTestId(testId);

    expect(handleExpandedChange).not.toHaveBeenCalled();

    await userEvent.click(btn);

    expect(handleExpandedChange).toHaveBeenCalled();
  });

  describe('no multiple', () => {
    it('should render the first panel closed by default and open and close it when clicking its button', async () => {
      const { getByText, queryByText } = render(
        <Accordion isMulti={false}>
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

      let panel1 = queryByText('Panel 1');
      const btn1 = getByText('Button 1').parentElement;

      expect(btn1).toHaveAttribute('aria-expanded', 'false');
      expect(panel1).not.toBeInTheDocument();

      await userEvent.click(btn1);

      panel1 = getByText(/panel 1/i);

      expect(btn1).toHaveAttribute('aria-expanded', 'true');
      expect(panel1).toHaveAttribute('aria-hidden', 'false');

      await userEvent.click(btn1);

      expect(btn1).toHaveAttribute('aria-expanded', 'false');
    });

    it('should close first panel and open the second panel when the second button button', async () => {
      const { getByText, queryByText } = render(
        <Accordion defaultIndex={0} isMulti={false}>
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
      let panel2 = queryByText('Panel 2');
      const btn1 = getByText('Button 1').parentElement;
      const btn2 = getByText('Button 2').parentElement;

      expect(btn1).toHaveAttribute('aria-expanded', 'true');
      expect(btn2).toHaveAttribute('aria-expanded', 'false');

      expect(panel1).toHaveAttribute('aria-hidden', 'false');
      expect(panel2).not.toBeInTheDocument();

      await userEvent.click(btn2);

      panel2 = getByText(/panel 2/i);

      expect(btn1).toHaveAttribute('aria-expanded', 'false');
      expect(btn2).toHaveAttribute('aria-expanded', 'true');

      expect(panel2).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('multiple', () => {
    it('should have no panels open by default when isMulti is true', () => {
      const { queryByText } = render(
        <Accordion isMulti>
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

      const panel1 = queryByText('Panel 1');
      const panel2 = queryByText('Panel 2');

      expect(panel1).not.toBeInTheDocument();
      expect(panel2).not.toBeInTheDocument();
    });

    it('should expand the panels specified in defaultIndex prop', () => {
      const { getByText } = render(
        <Accordion isMulti defaultIndex={[0, 1]}>
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

      expect(panel1).toHaveAttribute('aria-hidden', 'false');
      expect(panel2).toHaveAttribute('aria-hidden', 'false');
    });

    it('should leave the first panel open and open and close the second panel when clicking the second button', async () => {
      const { getByText, queryByText, debug } = render(
        <Accordion isMulti defaultIndex={[0]}>
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
      let panel2 = queryByText('Panel 2');
      const btn2 = getByText('Button 2').parentElement;

      expect(panel1).toHaveAttribute('aria-hidden', 'false');
      expect(panel2).not.toBeInTheDocument();

      await userEvent.click(btn2);

      panel2 = getByText(/panel 2/i);

      expect(panel1).toHaveAttribute('aria-hidden', 'false');
      expect(panel2).toHaveAttribute('aria-hidden', 'false');
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Accordion defaultIndex={[0]}>
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
