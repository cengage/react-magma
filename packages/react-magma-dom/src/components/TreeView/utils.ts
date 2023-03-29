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
export function calculateLeftPadding(type: string, depth: number) {
  let padding = (24 * depth);

  if (type === 'leaf') {
    padding += 40;
  } else if (type === 'branch') {
    padding += 8;
  }

  return `${padding}px`;
}


export const addPxStyleStrings = (styleStrings: (string | number)[]): string => {
  const pxValues: number[] = styleStrings.map(styleString => {
    return parseInt(styleString.toString().replace(/\s*px$/, ''));
  });
  return pxValues.reduce((total, value) => total + value).toString() + 'px';
};