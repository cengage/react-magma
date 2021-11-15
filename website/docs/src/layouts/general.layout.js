import React from "react";
import { MDXRenderer } from 'gatsby-plugin-mdx';

const GeneralLayout = ({ children }) => {
  return (
    <div>
      <MDXRenderer>{children}</MDXRenderer>
    </div>
  );
};

export default GeneralLayout;