import * as React from 'react';
import { IconProps } from '../../IconProps';
import { SearchIcon } from '../Actions/SearchIcon';
export const Search2Icon = (props: IconProps) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('Search2Icon has been deprecated');
  }
  return <SearchIcon {...props} />;
};
