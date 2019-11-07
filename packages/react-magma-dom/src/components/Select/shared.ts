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
  const [value, updateValue] = React.useState(defaultValue || newValue);

  React.useEffect(() => {
    updateValue(newValue);
  }, [newValue]);

  function handleChange(changedValue: Options | Options[] | null) {
    updateValue(changedValue);
    onChange && typeof onChange === 'function' && onChange(changedValue);
  }

  return [value, handleChange];
}
