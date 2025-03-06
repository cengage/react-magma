import * as React from 'react';

import { AccordionContext } from './useAccordion';
import { AccordionItemContext } from './useAccordionItem';
import { useForceUpdate } from '../../hooks/useForceUpdate';
import { useForkedRef } from '../../utils';

export interface UseAccordionButtonProps {
  /**
   * @internal
   */
  testId?: string;
  isInverse?: boolean;
}

export function useAccordionButton(
  props: UseAccordionButtonProps,
  forwardedRef
) {
  const {
    buttonRefArray,
    expandedIndex,
    iconPosition,
    isControlled,
    isMulti,
    registerAccordionButton,
    onExpandedChange,
    setExpandedIndex,
  } = React.useContext(AccordionContext);

  const { buttonId, index, isDisabled, isExpanded, panelId } =
    React.useContext(AccordionItemContext);

  const handleClick = () => {
    typeof onExpandedChange === 'function' && onExpandedChange(index);

    if (!isControlled) {
      isMulti && Array.isArray(expandedIndex)
        ? isExpanded
          ? setExpandedIndex(expandedIndex.filter(item => item !== index))
          : setExpandedIndex(expandedIndex.concat([index]))
        : isExpanded
          ? setExpandedIndex(null)
          : setExpandedIndex(index);
    }
  };

  const focusFirst = () => {
    (buttonRefArray.current[0].current as HTMLButtonElement).focus();
  };

  const focusNext = () => {
    (buttonRefArray.current[index + 1].current as HTMLButtonElement).focus();
  };

  const focusPrev = () => {
    (buttonRefArray.current[index - 1].current as HTMLButtonElement).focus();
  };

  const focusLast = () => {
    const arrLength = buttonRefArray.current.length;
    (
      buttonRefArray.current[arrLength - 1].current as HTMLButtonElement
    ).focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const arrLength = buttonRefArray.current.length;

    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowDown': {
        index === arrLength - 1 ? focusFirst() : focusNext();
        break;
      }
      case 'ArrowUp': {
        index === 0 ? focusLast() : focusPrev();
        break;
      }
      case 'Home': {
        focusFirst();
        break;
      }
      case 'End': {
        focusLast();
        break;
      }
      default:
        return;
    }
  };

  const ownRef = React.useRef<HTMLDivElement>();
  const forceUpdate = useForceUpdate();

  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    if (!isDisabled) {
      registerAccordionButton(buttonRefArray, ownRef);
    }

    forceUpdate();
  }, []);

  return {
    buttonId,
    handleClick,
    handleKeyDown,
    iconPosition,
    index,
    isDisabled,
    isExpanded,
    panelId,
    ref,
  };
}

export type UseAccordionButtonReturn = ReturnType<typeof useAccordionButton>;
