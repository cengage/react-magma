/**
 * - When creating an interactive component, we recommend creating hooks that 
 * handles accessibility, state management, and behavior concerns.
 * 
 * - Hooks should return prop-getters and some state information.
 * 
 * > If you're not creating an interactive component, you can delete this file.
 * 
 */

import * as React from "react"

export interface UseDatagridProps {
}

export function useDatagrid(props: UseDatagridProps) {
  return {};
}

export type UseDatagridReturn = ReturnType<typeof useDatagrid>