import * as React from 'react';

interface ToastsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  toastsArray?: Array<string>;
  testId?: string;
}

export interface ToastsContextInterface {
  toastsArray?: Array<string>;
  setToastsArray?: any;
}

export const ToastsContext = React.createContext<ToastsContextInterface>({
  toastsArray: []
});

export const ToastsContainer: React.FunctionComponent<
  ToastsContainerProps
> = React.forwardRef(({ children, testId }: ToastsContainerProps, ref: any) => {
  const [toastsArray, setToastsArray] = React.useState([]);

  return (
    <ToastsContext.Provider value={{ toastsArray, setToastsArray }}>
      <div ref={ref} data-testid={testId}>
        {children}
      </div>
    </ToastsContext.Provider>
  );
});
