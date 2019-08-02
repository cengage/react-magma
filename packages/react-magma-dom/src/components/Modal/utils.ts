const candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

export function getTrapElements(container) {
  const inContainer: Array<HTMLElement> = Array.from(
    container.current.querySelectorAll(candidateSelectors)
  );

  if (
    inContainer[0] &&
    inContainer[0].focus &&
    typeof inContainer[0].focus === 'function'
  ) {
    inContainer[0].focus();
  }

  return inContainer;
}

export function getFocusedElementIndex(focusedElements, elementToFind) {
  return focusedElements.findIndex(element => {
    return element === elementToFind;
  });
}
