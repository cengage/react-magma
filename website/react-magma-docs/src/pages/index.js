import React from 'react';
import { IndexPageContent } from '../components/Intro/IndexPageContent';
import { Global, css } from '@emotion/core';
import { ThemeContext } from 'react-magma-dom';

import './animate.css';

const IndexPage = () => (
  <ThemeContext.Consumer>
    {theme => (
      <>
        <Global
          styles={css`
            @import url('https://fonts.googleapis.com/css?family=Abel&display=swap');
            .content {
              background: ${theme.colors.primary700};
              color: ${theme.colors.neutral100};
              padding: 0;
              overflow: hidden;
            }
            .content-article {
              && {
                background: linear-gradient(
                  to bottom,
                  ${theme.colors.primary700} 0%,
                  ${theme.colors.tertiary} 100%
                );
                margin: 0;
                max-width: none;
                padding: 0;
                width: auto;
              }
            }
          `}
        />
        <IndexPageContent />
      </>
    )}
  </ThemeContext.Consumer>
);

export default IndexPage;
