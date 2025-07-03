import React from 'react';

import { screen, render, fireEvent } from '@testing-library/react';

import { magma } from '../../theme/magma';

import { Transition } from '.';

const TEXT = 'test test test';
const TEST_ID = 'transition';

describe('Basic Transition', () => {
  it('should render the transition component', () => {
    const { getByText, getByTestId } = render(
      <Transition testId={TEST_ID}>{TEXT}</Transition>
    );

    fireEvent.transitionEnd(getByTestId(TEST_ID));

    expect(getByText(TEXT)).toBeInTheDocument();
  });

  it('should be unmounted with unmountOnExit', () => {
    const { queryByText } = render(
      <Transition testId={TEST_ID} collapse unmountOnExit>
        {TEXT}
      </Transition>
    );

    expect(queryByText(TEXT)).not.toBeInTheDocument();
  });

  it('should be mounted with unmountOnExit and isOpen', () => {
    const { queryByText, getByTestId } = render(
      <Transition testId={TEST_ID} collapse unmountOnExit isOpen>
        {TEXT}
      </Transition>
    );

    expect(queryByText(TEXT)).toBeInTheDocument();
  });
});

describe('Transition - Collapse', () => {
  it('should have exit variant by default', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} collapse>
        {TEXT}
      </Transition>
    );

    fireEvent.transitionEnd(getByTestId(TEST_ID));

    expect(getByTestId(TEST_ID)).toHaveStyle(
      `height:${magma.transitions.collapse.motion.exit.height}`
    );
  });

  it('should render enter variant on isOpen', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} collapse isOpen>
        {TEXT}
      </Transition>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));

    expect(getByTestId(TEST_ID)).toHaveStyle(
      `height:${magma.transitions.collapse.motion.enter.height}`
    );
  });
});

describe('Transition - Fade', () => {
  it('should have exit variant by default', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} fade>
        {TEXT}
      </Transition>
    );

    fireEvent.transitionEnd(getByTestId(TEST_ID));

    expect(getByTestId(TEST_ID)).toHaveStyle(
      `opacity:${magma.transitions.fade.motion.exit.opacity}`
    );
  });

  it('should render enter variant on isOpen', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} fade isOpen>
        {TEXT}
      </Transition>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));

    expect(getByTestId(TEST_ID)).toHaveStyle(
      `opacity:${magma.transitions.fade.motion.enter.opacity}`
    );
  });
});

describe('combined', () => {
  // TODO: Fix test (Remove transitionZ(0))
  xit('should merge variants for exit variant', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} nudgeBottom fade>
        {TEXT}
      </Transition>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));

    expect(getByTestId(TEST_ID)).toHaveStyle(
      `transform: translateY(50px) translateZ(0)`
    );
    expect(getByTestId(TEST_ID)).toHaveStyle(
      `opacity:${magma.transitions.fade.motion.exit.opacity}`
    );
  });

  // TODO: Fix test (Remove transitionZ(0))
  xit('should merge variants for the enter variant', () => {
    const { getByTestId } = render(
      <Transition testId={TEST_ID} nudgeBottom fade isOpen>
        {TEXT}
      </Transition>
    );

    fireEvent.animationEnd(getByTestId(TEST_ID));
    expect(getByTestId(TEST_ID)).toHaveStyle(
      `transform: translateY(0) translateZ(0)`
    );
    expect(getByTestId(TEST_ID)).toHaveStyle(
      `opacity:${magma.transitions.fade.motion.enter.opacity}`
    );
  });
});
