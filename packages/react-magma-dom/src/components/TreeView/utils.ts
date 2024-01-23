import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';

export enum TreeNodeType {
  branch = 'branch',
  leaf = 'leaf',
}

/**
 * Leaf node - 1st level has 40px of left padding.
 * Each level after that adds 56px of left padding.
 * 40, 64, 88, 112, 136, etc.
 *
 * Branch node - 1st level has 8px of left padding.
 * Each level after that adds 24px of left padding.
 * 8, 32, 56, 80, 104, etc.
 */
export function calculateLeftPadding(type: TreeNodeType, depth: number = 0) {
  let padding = 0;

  if (type === TreeNodeType.leaf) {
    if (depth === 0) {
      padding += 40;
    } else {
      padding += 56;
    }
  } else if (type === TreeNodeType.branch) {
    if (depth === 0) {
      padding += 8;
    } else {
      padding += 24;
    }
  }

  return `${padding}px`;
}

export const addPxStyleStrings = (
  styleStrings: (string | number)[]
): string => {
  const pxValues: number[] = styleStrings.map(styleString => {
    return parseInt(styleString.toString().replace(/\s*px$/, ''));
  });
  return pxValues.reduce((total, value) => total + value).toString() + 'px';
};

export function getTreeItemLabelColor(
  isInverse: boolean,
  disabled: boolean,
  theme: ThemeInterface
) {
  if (disabled) {
    if (isInverse) {
      return transparentize(0.6, theme.colors.neutral100);
    }
    return transparentize(0.6, theme.colors.neutral500);
  }
  if (isInverse) {
    return theme.colors.neutral100;
  }
  return theme.colors.neutral700;
}

// TODO
// const focusFirst = () => {
  // (buttonRefArray.current[0].current as HTMLLIElement).focus();
// };

// const focusNext = () => {
  // (buttonRefArray.current[index + 1].current as HTMLLIElement).focus();
// };

// const focusPrev = () => {
  // (buttonRefArray.current[index - 1].current as HTMLLIElement).focus();
// };

// const focusLast = () => {
  // const arrLength = buttonRefArray.current.length;
  // (
  //   buttonRefArray.current[arrLength - 1].current as HTMLLIElement
  // ).focus();
// };

// const handleKeyDown = (event: React.KeyboardEvent) => {
//   // console.log('handleKeyDown');

//   const arrLength = buttonRefArray.current.length;
//   // console.log(arrLength, buttonRefArray);

//   switch (event.key) {
//     case 'ArrowDown': {
//       index === arrLength - 1 ? focusFirst() : focusNext();
//       break;
//     }
//     case 'ArrowUp': {
//       index === 0 ? focusLast() : focusPrev();
//       break;
//     }
//     case 'Home': {
//       focusFirst();
//       break;
//     }
//     case 'End': {
//       focusLast();
//       break;
//     }
//     default:
//       return;
//   }
// };
