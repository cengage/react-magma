/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

import { Layout } from './src/components/layout';
import { MainContainer } from './src/components/MainContainer';

export const wrapRootElement = ({ element }) => {
  return <MainContainer>{element}</MainContainer>;
};

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  return <Layout {...props}>{element}</Layout>;
};

function scrollToPosition(top) {
  const html = document.querySelector('html');
  const previousScrollBehavior = html?.style.scrollBehavior;

  if (html) {
    html.style.scrollBehavior = 'auto';
  }

  window.scrollTo(0, Math.max(0, top));

  window.requestAnimationFrame(() => {
    if (html) {
      html.style.scrollBehavior = previousScrollBehavior;
    }
  });
}

function scrollToHashTarget(hash) {
  if (!hash || typeof document === 'undefined') {
    return false;
  }

  const targetId = decodeURIComponent(hash.slice(1));
  const element =
    document.getElementById(targetId) ||
    document.getElementsByName(targetId)[0];

  if (!element) {
    return false;
  }

  const offset = -40;
  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;

  scrollToPosition(elementPosition + offset);

  return true;
}

export const onClientEntry = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
};

export const shouldUpdateScroll = ({ routerProps }) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const hash = routerProps?.location?.hash;

  if (hash && scrollToHashTarget(hash)) {
    return false;
  }

  scrollToPosition(0);

  return false;
};
