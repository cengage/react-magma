import * as React from 'react';
import { Input, InputIconPosition, InputSize, InputType } from '../Input';
import { Search2Icon } from '../Icon/types/Search2Icon';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  iconAriaLabel?: string;
  id?: string;
  inputSize?: InputSize;
  inverse?: boolean;
  labelText?: string;
  placeholderText?: string;
}

export const Search: React.FunctionComponent<SearchProps> = ({
  errorMessage,
  iconAriaLabel,
  id,
  inverse,
  inputSize,
  labelText,
  placeholderText
}: SearchProps) => {
  const SEARCH = 'Search';

  return (
    <Input
      errorMessage={errorMessage}
      icon={<Search2Icon />}
      onIconClick={() => {}}
      iconAriaLabel={iconAriaLabel ? iconAriaLabel : SEARCH}
      iconPosition={InputIconPosition.right}
      id={id}
      inputSize={inputSize}
      inverse={inverse}
      labelText={labelText ? labelText : SEARCH}
      labelVisuallyHidden
      placeholder={placeholderText ? placeholderText : SEARCH}
      type={InputType.search}
    />
  );
};
