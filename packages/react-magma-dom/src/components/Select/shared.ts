import React from 'react';

export interface Options {
  label: string;
  value: string;
}

export function useSelectValue(
  newValue: Options[] | Options,
  defaultValue: Options[] | Options,
  onChange: (option: Options[] | Options) => void
) {
  const [value, setValue] = React.useState<Options[] | Options>(
    defaultValue || newValue
  );

  React.useEffect(() => {
    setValue(newValue);
  }, [newValue]);

  function handleChange(changedValue: Options | Options[] | null) {
    setValue(changedValue);
    onChange && typeof onChange === 'function' && onChange(changedValue);
  }

  return [value, handleChange];
}
