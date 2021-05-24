/**
 * - When creating an interactive component, we recommend creating hooks that
 * handles accessibility, state management, and behavior concerns.
 *
 * - Hooks should return prop-getters and some state information.
 *
 * > If you're not creating an interactive component, you can delete this file.
 *
 */

import * as React from 'react';

export interface UseFormFieldProps {
  /**
   * Content of the error message. If a value is provided, the field will be styled as an error state and the error message will display.
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message.
   */
  helperMessage?: React.ReactNode;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Content for label; can be a node or a string
   */
  labelText?: React.ReactNode;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;
}

export function useFormField(props: UseFormFieldProps) {
  return {};
}

export type UseFormFieldReturn = ReturnType<typeof useFormField>;
