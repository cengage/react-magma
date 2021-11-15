import React from "react"
import { graphql } from "gatsby"
import TabbedLayout from '../layouts/tabbed.layout';
import GeneralLayout from '../layouts/tabbed.layout';

export const query = graphql`
  query($pagePath: String!) {
    allFile(filter: { fields: { pagePath: { eq: $pagePath } } }) {
      nodes {
        fields {
          sectionName,
          type
        }
        childMdx {
          tableOfContents(maxDepth:3)
          body
        }
      }
    }
  }
`

export default function ComplexPage({data, pageContext: {section, type, ...rest}}) {
  const tabs = data.allFile.nodes.reduce((result, node) => {
    result[node.fields.sectionName] = node.childMdx
    return result
  }, {})

  const Layout = type === 'file' ? TabbedLayout : GeneralLayout;

  console.log({ section, type, ...rest });

  const layoutProps = {
    section,
    tabs,
  }

  return <Layout {...layoutProps} />;
}