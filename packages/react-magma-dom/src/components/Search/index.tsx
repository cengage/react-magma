import * as React from 'react';
import { Input, InputIconPosition, InputSize, InputType } from '../Input';
import { Search2Icon } from '../Icon/types/Search2Icon';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  helperMessage?: string;
  iconAriaLabel?: string;
  id?: string;
  inputSize?: InputSize;
  inverse?: boolean;
  isLoading?: boolean;
  labelText?: string;
  placeholderText?: string;
  onSearch: (term: string) => void;
}

export const Search: React.FunctionComponent<SearchProps> = ({
  errorMessage,
  helperMessage,
  iconAriaLabel,
  id,
  inverse,
  inputSize,
  isLoading,
  labelText,
  placeholderText,
  onSearch
}: SearchProps) => {
  const SEARCH = 'Search';

  const inputRef = React.createRef();

  // handle search on enter
  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSearch();
    }
  }

  function handleSearch() {
    onSearch(inputRef.current['value']);
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
      ref={inputRef}
      inputSize={inputSize}
      inverse={inverse}
      isLoading={isLoading}
      labelText={labelText ? labelText : SEARCH}
      labelVisuallyHidden
      onKeyDown={handleKeyPress}
      placeholder={placeholderText ? placeholderText : SEARCH}
      type={InputType.search}
      value=""
    />
  );
};
