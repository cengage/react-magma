import * as React from 'react';

interface ToastsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  toastCount?: number;
  testId?: string;
}

export interface ToastsContextInterface {
  toastCount?: number;
  setToastCount?: any;
}

export const ToastsContext = React.createContext<ToastsContextInterface>({
  toastCount: 0
});

export const ToastsContainer: React.FunctionComponent<
  ToastsContainerProps
> = React.forwardRef(({ children, testId }: ToastsContainerProps, ref: any) => {
  const [toastCount, setToastCount] = React.useState(0);

  return (
    <ToastsContext.Provider value={{ toastCount, setToastCount }}>
      <div ref={ref} data-testid={testId}>
        {children}
      </div>
    </ToastsContext.Provider>
  );
});
