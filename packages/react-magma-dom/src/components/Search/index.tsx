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
  onSearch: () => void;
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

  // handle search on enter
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <Input
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      icon={<Search2Icon />}
      onIconClick={onSearch}
      iconAriaLabel={iconAriaLabel ? iconAriaLabel : SEARCH}
      iconPosition={InputIconPosition.right}
      id={id}
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
