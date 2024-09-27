import { toString } from "mdast-util-to-string"
import { visit } from "unist-util-visit"

const transformer = (tree, file) => {
  let headings = []

  visit(tree, `heading`, heading => {
    headings.push({
      value: toString(heading),
      depth: heading.depth,
    })
  })

  const mdxFile = file
  if (!mdxFile.data.meta) {
    mdxFile.data.meta = {}
  }

  mdxFile.data.meta.headings = headings
}

const remarkHeadingsPlugin = () => transformer

export default remarkHeadingsPlugin