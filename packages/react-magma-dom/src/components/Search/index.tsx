import * as React from 'react';
import { Input, InputIconPosition, InputSize, InputType } from '../Input';
import { Search2Icon } from '../Icon/types/Search2Icon';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  helperMessage?: string;
  iconAriaLabel?: string;
  id?: string;
  inputSize?: InputSize;
  isInverse?: boolean;
  isLoading?: boolean;
  labelText?: string;
  onSearch: (term: string) => void;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Search: React.FunctionComponent<SearchProps> = React.forwardRef(
  (props: SearchProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      errorMessage,
      helperMessage,
      iconAriaLabel,
      id,
      isInverse,
      inputSize,
      isLoading,
      labelText,
      placeholder,
      onSearch
    } = props;

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
      <Input
        errorMessage={errorMessage}
        helperMessage={helperMessage}
        icon={<Search2Icon />}
        onIconClick={handleSearch}
        iconAriaLabel={iconAriaLabel ? iconAriaLabel : SEARCH}
        iconPosition={InputIconPosition.right}
        id={id}
        inputSize={inputSize}
        isInverse={isInverse}
        isLabelVisuallyHidden
        isLoading={isLoading}
        labelText={labelText ? labelText : SEARCH}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder ? placeholder : SEARCH}
        type={InputType.search}
        value={value}
        ref={ref}
      />
    );
  }
);
