import * as React from 'react';
import {
  BaseInput,
  InputIconPosition,
  InputSize,
  InputType
} from '../BaseInput';

import { Search2Icon } from '../Icon/types/Search2Icon';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  iconAriaLabel?: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  labelText?: string;
  onSearch: (term: string) => void;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
}

export const Search: React.FunctionComponent<SearchProps> = React.forwardRef(
  (props: SearchProps, ref: React.Ref<HTMLInputElement>) => {
    const { iconAriaLabel, labelText, placeholder, onSearch, ...other } = props;

    const SEARCH = 'Search';

    const [value, setValue] = React.useState<string>(props.value);

    React.useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);
      setValue(event.target.value);
    }

    // handle search on enter
    function handleKeyPress(event: React.KeyboardEvent) {
      if (event.keyCode === 13) {
        event.preventDefault();
        handleSearch();
      }
    }

    function handleSearch() {
      onSearch(value);
    }

    return (
      <BaseInput
        {...other}
        aria-label={labelText ? labelText : SEARCH}
        icon={<Search2Icon />}
        iconAriaLabel={iconAriaLabel ? iconAriaLabel : SEARCH}
        iconPosition={InputIconPosition.right}
        onChange={handleChange}
        onIconClick={handleSearch}
        onKeyDown={handleKeyPress}
        placeholder={placeholder ? placeholder : SEARCH}
        type={InputType.search}
        value={value}
        ref={ref}
      />
    );
  }
);
