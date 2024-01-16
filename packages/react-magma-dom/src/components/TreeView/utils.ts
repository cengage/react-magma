import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';

export enum TreeNodeType {
  branch = 'branch',
  leaf = 'leaf',
}

/**
 * Leaf node - 1st level has 40px of left padding.
 * Each level after that adds 24px of left padding.
 * 40, 64, 88, 112, 136, etc.
 * f(depth) = 24*depth + 40
 *
 * Branch node - 1st level has 8px of left padding.
 * Each level after that adds 24px of left padding.
 * 8, 32, 56, 80, 104, etc.
 * f(depth) = 24*depth + 8
 */
export function calculateLeftPadding(type: TreeNodeType, depth: number = 0) {
  // let padding = 0;
  
  let padding = 24 * depth;

  if (type === TreeNodeType.leaf) {
    if (depth === 0 ) {
      padding += 16;
    }
    else {
      padding += 32;
    }
  // } else if (type === TreeNodeType.branch && depth === 0) {
  } else if (type === TreeNodeType.branch) {
    padding += 8;
  }
  
  // console.log('type', type, '>>>>>>>>>>> padding', padding);
  return `${padding}px`;
}


export const addPxStyleStrings = (styleStrings: (string | number)[]): string => {
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