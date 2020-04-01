import React from 'react';

interface TabPanelContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export const TabPanelsContainer: React.FunctionComponent<
  TabPanelContainerProps
> = React.forwardRef((props, ref: React.Ref<any>) => {
  const { children, testId, ...rest } = props;

  return (
    <div ref={ref} data-testid={testId} {...rest}>
      {React.Children.map(children, (child: React.ReactElement<any>, index) => {
        return React.cloneElement(child, { index, key: index });
      })}
      {children}
    </div>
  );
});
