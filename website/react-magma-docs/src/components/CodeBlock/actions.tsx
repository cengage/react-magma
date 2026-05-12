import React, { HTMLAttributes, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { getParameters } from 'codesandbox/lib/api/define';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonVariant,
  useIsInverse,
  magma,
} from 'react-magma-dom';

const pkg = require('../../../package.json');

function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const CODESANDBOX_CSS_FILE = `
.App {
  padding: 16px;
}
`;
const CODESANDBOX_INDEX_FILE = `
import * as React from 'react';
import { render } from 'react-dom';

import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
`;

const CODESANDBOX_APP_FILE = `
import * as React from 'react';
import './styles.css';
import { GlobalStyles } from 'react-magma-dom';
import { Example } from './example';

export default function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Example />
    </div>
  );
}
`;

const ActionsDiv = styled.div<{ isInverse?: boolean }>`
  align-items: flex-end;
  background: ${props =>
    props.isInverse ? magma.colors.primary700 : magma.colors.neutral200};
  border: 1px solid
    ${props =>
      props.isInverse ? magma.colors.borderInverse : magma.colors.border};
  border-bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: ${magma.spaceScale.spacing03};
`;

export const Actions = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const isInverse = useIsInverse();
  return <ActionsDiv {...props} isInverse={isInverse} />;
};

const ActionsLeftDiv = styled.div`
  flex-grow: 1;
`;

export const ActionsLeft = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <ActionsLeftDiv {...props} />;
};

interface CodeSandboxActionProps extends HTMLAttributes<HTMLButtonElement> {
  code: string;
}
export const CodeSandboxAction = ({ ...props }: CodeSandboxActionProps) => {
  const handleOpenSandbox = () => {
    const parameters = getParameters({
      files: {
        'package.json': {
          content: JSON.stringify(
            {
              dependencies: {
                '@data-driven-forms/react-form-renderer':
                  pkg.dependencies['@data-driven-forms/react-form-renderer'],
                '@emotion/react': pkg.dependencies['@emotion/react'],
                '@emotion/styled': pkg.dependencies['@emotion/styled'],
                'date-fns': pkg.dependencies['date-fns'],
                downshift: pkg.dependencies['downshift'],
                react: pkg.dependencies['react'],
                'framer-motion': pkg.dependencies['framer-motion'],
                'react-dom': pkg.dependencies['react-dom'],
                'react-magma-icons': pkg.dependencies['react-magma-icons'],
                'react-magma-dom': pkg.dependencies['react-magma-dom'],
                '@react-magma/charts': pkg.dependencies['@react-magma/charts'],
                uuid: pkg.dependencies['uuid'],
              },
            },
            null,
            2
          ),
          isBinary: false,
        },
        'index.tsx': {
          content: CODESANDBOX_INDEX_FILE,
          isBinary: false,
        },
        'App.tsx': {
          content: CODESANDBOX_APP_FILE,
          isBinary: false,
        },
        'styles.css': {
          content: CODESANDBOX_CSS_FILE,
          isBinary: false,
        },
        'example.tsx': {
          content: props.code,
          isBinary: false,
        },
      },
    });

    window.open(
      `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
      '_blank'
    );
  };

  return (
    <Button
      color={ButtonColor.secondary}
      onClick={handleOpenSandbox}
      size={ButtonSize.small}
      variant={ButtonVariant.link}
    >
      Edit in CodeSandbox
    </Button>
  );
};

interface CopyActionProps extends HTMLAttributes<HTMLButtonElement> {
  code: string;
}
export const CopyAction = ({ ...props }: CopyActionProps) => {
  const [copied, setCopied] = useState(false);
  const prevCopied = usePrevious(copied);

  useEffect(() => {
    if (prevCopied === copied) return;
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  const handleCopy = () => {
    setCopied(true);
  };

  const copyText = copied ? 'Copied!' : 'Copy';

  return (
    <CopyToClipboard text={props.code} onCopy={handleCopy}>
      <Button
        aria-label={copyText}
        color={ButtonColor.secondary}
        disabled={copied}
        size={ButtonSize.small}
        variant={ButtonVariant.link}
      >
        Copy
      </Button>
    </CopyToClipboard>
  );
};

interface ExpandActionProps extends HTMLAttributes<HTMLButtonElement> {
  expanded: boolean;
}
export const ExpandAction = ({ ...props }: ExpandActionProps) => {
  const { expanded, ...rest } = props;

  return (
    <Button
      {...rest}
      color={ButtonColor.secondary}
      size={ButtonSize.small}
      variant={ButtonVariant.link}
    >
      {expanded ? 'Collapse' : 'Expand'} code
    </Button>
  );
};
