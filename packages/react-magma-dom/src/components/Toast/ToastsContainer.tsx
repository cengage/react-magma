import * as React from 'react';

interface ToastsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  toastsArray?: any;
  testId?: string;
}

export interface ToastsContextInterface {
  toastsArray?: any;
}

export const ToastsContext = React.createContext<ToastsContextInterface>({
  toastsArray: { current: [] }
});

export const ToastsContainer: React.FunctionComponent<ToastsContainerProps> = React.forwardRef(
  ({ children, testId }: ToastsContainerProps, ref: any) => {
    const toastsArray = React.useRef([]);

    return (
      <ToastsContext.Provider value={{ toastsArray }}>
        <div ref={ref} data-testid={testId}>
          {children}
        </div>
      </ToastsContext.Provider>
    );
  }
);
