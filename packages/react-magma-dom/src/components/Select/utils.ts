import { instanceOfItemWithOptionalDisabled } from ".";

export function isItemDisabled(item) {
  return instanceOfItemWithOptionalDisabled(item) && item.disabled;
}
