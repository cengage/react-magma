import * as React from 'react';

export interface ToastsContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  bottomOffset?: number;
  toastsArray?: any;
  testId?: string;
}

export interface ToastsContextInterface {
  bottomOffset?: number;
  toastsArray?: any;
}

export const ToastsContext = React.createContext<ToastsContextInterface>({
  toastsArray: { current: [] },
  bottomOffset: 0
});

export const ToastsContainer: React.FunctionComponent<ToastsContainerProps> = React.forwardRef(
  ({ bottomOffset, children, testId }: ToastsContainerProps, ref: any) => {
    const toastsArray = React.useRef([]);

    return (
      <ToastsContext.Provider value={{ bottomOffset, toastsArray }}>
        <div ref={ref} data-testid={testId}>
          {children}
        </div>
      </ToastsContext.Provider>
    );
  }
);
