import React from 'react'
import Layout from '../components/layout'
import { IndexPageContent } from '../components/intro/index-page-content'
import { Global, css } from '@emotion/core'
import { ThemeContext } from 'react-magma-dom'

import '../components/animate.css'

const IndexPage = () => (
  <ThemeContext.Consumer>
    {theme => (
      <Layout>
        <Global
          styles={css`
            @import url('https://fonts.googleapis.com/css?family=Abel&display=swap');
            .content {
              background: ${theme.colors.neutral01};
              color: ${theme.colors.neutral08};
              padding: 0;
              overflow: hidden;
            }
            .content-article {
              background: linear-gradient(
                to bottom,
                ${theme.colors.foundation01} 0%,
                ${theme.colors.pop01} 100%
              );
              margin: 0;
              max-width: none;
              padding: 0;
              width: auto;
            }
          `}
        />
        <IndexPageContent />
      </Layout>
    )}
  </ThemeContext.Consumer>
)

export default IndexPage
