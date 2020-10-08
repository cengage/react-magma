import * as React from 'react';
import { ThemeContext } from 'react-magma-dom';
import { SelectWrapper } from '../Select/SelectWrapper';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getStyles,
  useSelectValue,
  getAriaLabel,
  BaseSelectProps,
  OptionType,
} from '../Select/shared';
import { Props as AsyncCreatableReactSelectProps } from 'react-select/async-creatable';

const Loader = () => null;

export interface AsyncCreatableSelectProps
  extends BaseSelectProps,
    AsyncCreatableReactSelectProps<OptionType> {}

export const AsyncCreatableSelect: React.FunctionComponent<AsyncCreatableSelectProps> = (
  props: AsyncCreatableSelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );
  const [
    ReactAsyncCreatableSelect,
    updateReactAsyncCreatableSelect,
  ] = React.useState<any>(() => Loader);

  React.useEffect(() => {
    import('react-select/async-creatable')
      .then(module => updateReactAsyncCreatableSelect(() => module.default))
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            'React-Magma: Unable to import component from react-select'
          );
        }
        throw new Error(err);
      });
  }, []);

  const {
    components,
    testId,
    labelText,
    errorMessage,
    helperMessage,
    isInverse,
    styles,
    ...other
  } = props;

  const ariaLabelText = getAriaLabel(labelText, errorMessage, helperMessage);

  const theme = React.useContext(ThemeContext);

  return (
    <SelectWrapper
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      isInverse={isInverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactAsyncCreatableSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove,
          ...components,
        }}
        onChange={onChange}
        styles={getStyles(styles, theme, errorMessage)}
        value={value}
      />
    </SelectWrapper>
  );
};
