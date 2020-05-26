import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { SelectWrapper } from '../Select/SelectWrapper';
import {
  getStyles,
  ClearIndicator,
  DropdownIndicator,
  MultiValueRemove,
  getAriaLabel,
  useSelectValue,
  BaseSelectProps,
  OptionType
} from '../Select/shared';
import { Props as CreatableReactSelectProps } from 'react-select/creatable';

const Loader = () => null;

export interface CreatableSelectProps
  extends BaseSelectProps,
    CreatableReactSelectProps<OptionType> {}

export const CreatableSelect: React.FunctionComponent<CreatableSelectProps> = (
  props: CreatableSelectProps
) => {
  const [value, onChange] = useSelectValue(
    props.value,
    props.defaultValue,
    props.onChange
  );
  const [ReactCreatableSelect, updateReactCreatableSelect] = React.useState<
    any
  >(() => Loader);

  React.useEffect(() => {
    import('react-select/creatable')
      .then(module => updateReactCreatableSelect(() => module.default))
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
      isInverse={isInverse}
      labelText={labelText}
      testId={testId}
    >
      <ReactCreatableSelect
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
        isInverse={isInverse}
        styles={getStyles(styles, theme, errorMessage)}
        value={value}
      />
    </SelectWrapper>
  );
};
