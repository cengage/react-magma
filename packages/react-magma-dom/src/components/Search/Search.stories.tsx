import React from 'react';
import { Search } from '.';

export default {
  component: Search,
  title: 'Search',
};

export const Default = () => {
  return (
    <Search
      onSearch={term => {
        alert(term);
      }}
    />
  );
};
