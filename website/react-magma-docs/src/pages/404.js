import React from 'react';
import { Link, navigate } from 'gatsby';
import {
  Button,
  ButtonColor,
  ButtonGroup,
  Heading,
  Hyperlink,
} from 'react-magma-dom';
import { Layout } from '../components/layout';

const NotFoundPage = () => (
  <Layout>
    <>
      <Heading level={1}>Sorry, page not found.</Heading>
      <p>
        The page you were looking for may have been moved, removed, renamed or
        might never have existed.
      </p>
      <ButtonGroup>
        <Button onClick={() => navigate(-1)} color={ButtonColor.secondary}>
          Back to previous page
        </Button>
        <Hyperlink styledAs="Button" to="/" color={ButtonColor.primary}>
          {linkProps => (
            <Link {...linkProps}>
              <span>Go to home page</span>
            </Link>
          )}
        </Hyperlink>
      </ButtonGroup>
    </>
  </Layout>
);

export default NotFoundPage;
