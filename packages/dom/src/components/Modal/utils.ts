const candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

export function getTrapElementsAndFocus(container, body?, header?) {
  const inContainer: Array<HTMLElement> = getTrapElements(container);

  if (header) {
    header.current.focus();
  } else if (
    inContainer[0] &&
    inContainer[0].focus &&
    typeof inContainer[0].focus === 'function'
  ) {
    inContainer[0].focus();
  } else {
    body.current.firstChild.setAttribute('tabIndex', '-1');
    body.current.firstChild.focus();
  }

  return inContainer;
}

export function getTrapElements(container): Array<HTMLElement> {
  return Array.from(container.current.querySelectorAll(candidateSelectors));
}

export function getFocusedElementIndex(focusedElements, elementToFind) {
  return focusedElements.findIndex(element => {
    return element === elementToFind;
  });
}
