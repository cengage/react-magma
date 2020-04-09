import * as React from 'react';
import { Input, InputIconPosition, InputSize, InputType } from '../Input';
import { Search2Icon } from '../Icon/types/Search2Icon';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  errorMessage?: string;
  helperMessage?: string;
  iconAriaLabel?: string;
  id?: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  isLoading?: boolean;
  labelText?: string;
  placeholderText?: string;
  onSearch: () => void;
  testId?: string;
}

export const Search: React.FunctionComponent<SearchProps> = ({
  containerStyle,
  errorMessage,
  helperMessage,
  iconAriaLabel,
  id,
  inverse,
  inputSize,
  inputStyle,
  isLoading,
  labelText,
  placeholderText,
  onSearch,
  testId
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
      containerStyle={containerStyle}
      errorMessage={errorMessage}
      helperMessage={helperMessage}
      icon={<Search2Icon />}
      onIconClick={onSearch}
      iconAriaLabel={iconAriaLabel ? iconAriaLabel : SEARCH}
      iconPosition={InputIconPosition.right}
      id={id}
      inputSize={inputSize}
      inputStyle={inputStyle}
      inverse={inverse}
      isLoading={isLoading}
      labelText={labelText ? labelText : SEARCH}
      labelVisuallyHidden
      onKeyDown={handleKeyPress}
      placeholder={placeholderText ? placeholderText : SEARCH}
      testId={testId}
      type={InputType.search}
      value=""
    />
  );
};
