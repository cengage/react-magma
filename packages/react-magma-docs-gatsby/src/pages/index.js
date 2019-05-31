import React from 'react'
import Layout from '../components/layout'
import { IndexPageContent } from '../components/intro/index-page-content'
import { Global, css } from '@emotion/core'
import "animate.css/animate.min.css";

const IndexPage = () => (
  <Layout>
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Abel');
      .content { background: #00263E; color: #fff; padding: 0; overflow: hidden; } 
      .content-article { background: linear-gradient(to bottom, #003865 0%,#e0004d 100%);  margin: 0; max-width: none; padding: 0; width: auto; } 
    `} />

    <IndexPageContent />
  </Layout>
)

export default IndexPage
