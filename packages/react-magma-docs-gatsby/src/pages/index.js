import React from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import FullLogo from '../components/FullLogo'

const LogoContainer = styled.div`
  width: 600px;
`

const IndexPage = () => (
  <Layout>
    <LogoContainer>
      <FullLogo />
    </LogoContainer>
  </Layout>
)

export default IndexPage
