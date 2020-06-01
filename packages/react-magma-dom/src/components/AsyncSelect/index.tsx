import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { SelectWrapper } from '../Select/SelectWrapper';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getStyles,
  useSelectValue,
  getAriaLabel,
  BaseSelectProps,
  OptionType
} from '../Select/shared';
import { Props as AsyncReactSelectProps } from 'react-select/async';

const Loader = () => null;

export interface AsyncSelectProps
  extends BaseSelectProps,
    AsyncReactSelectProps<OptionType> {}

export const AsyncSelect: React.FunctionComponent<AsyncSelectProps> = (
  props: AsyncSelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );
  const [ReactAsyncSelect, updateReactAsyncSelect] = React.useState<any>(
    () => Loader
  );

  React.useEffect(() => {
    import('react-select/async')
      .then(module => updateReactAsyncSelect(() => module.default))
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
      <ReactAsyncSelect
        {...other}
        aria-label={ariaLabelText}
        classNamePrefix="magma"
        components={{
          ClearIndicator,
          DropdownIndicator,
          MultiValueRemove,
          ...components
        }}
        onChange={onChange}
        styles={getStyles(styles, theme, errorMessage, isInverse)}
        value={value}
      />
    </SelectWrapper>
  );
};
