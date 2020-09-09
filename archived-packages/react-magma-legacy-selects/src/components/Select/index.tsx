import * as React from 'react';
import { ThemeContext } from 'react-magma-dom';
import { Props as ReactSelectProps } from 'react-select';
import {
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getStyles,
  useSelectValue,
  getAriaLabel,
  BaseSelectProps
} from './shared';
import { SelectWrapper } from './SelectWrapper';

const Loader = () => null;

export interface SelectProps extends BaseSelectProps, ReactSelectProps {}

export const Select: React.FunctionComponent<SelectProps> = (
  props: SelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );
  const [ReactSelect, updateReactSelect] = React.useState<any>(() => Loader);

  React.useEffect(() => {
    import('react-select')
      .then(module => updateReactSelect(() => module.default))
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
      <ReactSelect
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
