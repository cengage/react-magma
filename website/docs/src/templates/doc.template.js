import React from "react"
import { graphql } from "gatsby"
import DocLayout from "../layouts/doc.layout";

export const query = graphql`
  query($pagePath: String!) {
    allFile(filter: { fields: { pagePath: { eq: $pagePath } } }) {
      nodes {
        fields {
          sectionName
        }
        childMdx {
          tableOfContents(maxDepth:3)
          body
        }
      }
    }
  }
`

export default function ComplexPage({ data }) {
  const tabs = data.allFile.nodes.reduce((result, node) => {
    result[node.fields.sectionName] = node.childMdx
    return result
  }, {})

  return <DocLayout sectionName={data.sectionName} tabs={tabs}/>
}