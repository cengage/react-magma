import * as React from 'react';
import {
  BaseInput,
  InputIconPosition,
  InputSize,
  InputType
} from '../BaseInput';
import { I18nContext } from '../../i18n';
import { Search2Icon } from '../Icon/types/Search2Icon';
import { Spinner } from '../Spinner';

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  iconAriaLabel?: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  isLoading?: boolean;
  isInverse?: boolean;
  labelText?: string;
  onSearch: (term: string) => void;
  ref?: React.Ref<HTMLInputElement>;
  testId?: string;
  value?: string;
}

export const Search: React.FunctionComponent<SearchProps> = React.forwardRef(
  (props: SearchProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      iconAriaLabel,
      isLoading,
      labelText,
      placeholder,
      onSearch,
      ...other
    } = props;

    const i18n = React.useContext(I18nContext);

    const [value, setValue] = React.useState<string>(props.value);

    const icon = isLoading ? <Spinner /> : <Search2Icon size={17} />;

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
        aria-label={labelText ? labelText : i18n.search.input.ariaLabel}
        icon={icon}
        iconAriaLabel={
          iconAriaLabel ? iconAriaLabel : i18n.search.iconAriaLabel
        }
        iconPosition={InputIconPosition.right}
        onChange={handleChange}
        onIconClick={isLoading ? null : handleSearch}
        onKeyDown={handleKeyPress}
        placeholder={placeholder ? placeholder : i18n.search.input.placeholder}
        type={InputType.search}
        value={value}
        ref={ref}
      />
    );
  }
);
