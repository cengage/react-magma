import * as React from 'react';
// import styled from '../../theme/styled';
import {
  InputBase,
  InputBaseProps,
  InputIconPosition,
  InputSize,
  InputType,
} from '../InputBase';
import { I18nContext } from '../../i18n';
import { useIsInverse } from '../../inverse';
import { SearchIcon } from 'react-magma-icons';
import { Spinner } from '../Spinner';

export interface SearchProps extends InputBaseProps {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * Text for icon button aria-label
   * @default "Search"
   */
  iconAriaLabel?: string;
  /**
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * Style properties for the input element
   */
  inputStyle?: React.CSSProperties;
  /**
   * Position within the component for the icon to appear
   * @default InputIconPosition.right
   */
  iconPosition?: InputIconPosition;
  /**
   * Clear contents of input by clicking a clear button
   */
  isClearable?: boolean;
  /**
   * If true, the component will show a loading animation instead of a search button
   * @default false
   */
  isLoading?: boolean;
  isInverse?: boolean;
  /**
   * Text for input aria-label
   * @default "Search"
   */
  labelText?: string;
  /**
   * Action that will fire when search icon button is clicked
   */
  onSearch: (term: string) => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Value of the input element
   */
  value?: string;
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (props, ref) => {
    const {
      iconAriaLabel,
      isClearable,
      isInverse,
      isLoading,
      labelText,
      placeholder,
      onSearch,
      ...other
    } = props;

    const i18n = React.useContext(I18nContext);

    const [value, setValue] = React.useState<string>(props.value);
    const [characterLength, setCharacterLength] = React.useState<number>(0);

    const icon = isLoading ? <Spinner isInverse={isInverse} /> : <SearchIcon />;

    React.useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);
      setValue(event.target.value);
      setCharacterLength(event.target.value.length);
    }

    // handle search on enter
    function handleKeyPress(event: React.KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearch();
      }
    }

    function handleSearch() {
      onSearch(value);
    }

    return (
      <InputBase
        {...other}
        aria-label={labelText ? labelText : i18n.search.input.ariaLabel}
        icon={icon}
        iconAriaLabel={
          iconAriaLabel ? iconAriaLabel : i18n.search.iconAriaLabel
        }
        isClearable={isClearable}
        isInverse={useIsInverse(props.isInverse)}
        inputLength={characterLength}
        onChange={handleChange}
        onIconClick={
          props.isPredictive ? null : isLoading ? null : handleSearch
        }
        onKeyDown={handleKeyPress}
        placeholder={placeholder ? placeholder : i18n.search.input.placeholder}
        type={InputType.search}
        value={value}
        ref={ref}
      />
    );
  }
);
