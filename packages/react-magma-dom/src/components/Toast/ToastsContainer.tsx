import * as React from 'react';

export interface ToastsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of additional pixels from bottom of screen
   * @default 0
   */
  bottomOffset?: number;
  /**
   * @internal
   */
  toastsArray?: any;
  /**
   * @internal
   */
  testId?: string;
}

export interface ToastsContextInterface {
  bottomOffset?: number;
  toastsArray?: any;
}

export const ToastsContext = React.createContext<ToastsContextInterface>({
  toastsArray: { current: [] },
  bottomOffset: 0,
});

export const ToastsContainer = React.forwardRef<
  HTMLDivElement,
  ToastsContainerProps
>((props, ref) => {
  const { bottomOffset, children, testId } = props;
  const toastsArray = React.useRef([]);

  return (
    <ToastsContext.Provider value={{ bottomOffset, toastsArray }}>
      <div ref={ref} data-testid={testId}>
        {children}
      </div>
    </ToastsContext.Provider>
  );
});
