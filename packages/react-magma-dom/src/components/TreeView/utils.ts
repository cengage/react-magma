import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';
import { TreeViewSelectable } from './useTreeView';

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
export function calculateLeftPadding(
  type: TreeNodeType,
  depth: number = 0,
  selected: boolean,
  negative: boolean = false
) {
  let padding = 0;

  if (type === TreeNodeType.leaf) {
    if (depth === 0) {
      if (negative) {
        padding = 40;
      } else {
        padding = 54;
      }
    } else {
      padding = 56;
    }
  } else if (type === TreeNodeType.branch) {
    if (depth === 0) {
      padding = 8;
    } else {
      padding = 24;
    }
  }

  // this accounts for the border-left added when an item is selected
  if (selected) {
    padding -= 4;
  }

  return `${negative ? '-' : ''}${padding}px`;
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

export function getTreeItemWrapperCursor(
  disabled: boolean,
  selectable: TreeViewSelectable,
  nodeType: TreeNodeType
) {
  if (disabled) {
    return 'not-allowed';
  }
  if (nodeType === TreeNodeType.branch) {
    if (
      selectable === TreeViewSelectable.off ||
      selectable === TreeViewSelectable.single
    ) {
      return 'pointer';
    }
  }

  return 'default';
}
