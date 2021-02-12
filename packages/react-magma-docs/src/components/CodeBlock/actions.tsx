import {
  IconButton,
  Button,
  ButtonSize,
  ButtonColor,
  ButtonIconPosition,
} from 'react-magma-dom';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { ExternalLinkIcon } from 'react-magma-icons';
import CodeSandboxer from 'react-codesandboxer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from '@emotion/styled';

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

const ActionsDiv = styled.div`
  align-items: flex-end;
  display: flex;
`;

export const Actions: React.FC<HTMLAttributes<HTMLDivElement>> = props => {
  return <ActionsDiv {...props} />;
};

interface CodeSandboxActionProps extends HTMLAttributes<HTMLButtonElement> {
  code: string;
}
export const CodeSandboxAction: React.FC<CodeSandboxActionProps> = props => {
  return (
    <CodeSandboxer
      example={props.code}
      examplePath="does/not/do/anything/but/is/required.tsx"
      pkgJSON={pkg}
      gitInfo={{
        account: 'cengage',
        repository: 'react-magma',
        branch: 'main',
        host: 'github',
      }}
      dependencies={{
        '@emotion/core': '10.0.35',
        '@emotion/styled': '10.0.27',
        'date-fns': '2.16.0',
        downshift: '5.4.7',
        react: '16.13.1',
        'react-dom': '16.13.1',
        'react-magma-icons': 'latest',
        'react-magma-dom': 'latest',
        uuid: '8.3.0',
      }}
      providedFiles={{
        'index.tsx': { content: CODESANDBOX_INDEX_FILE },
        'App.tsx': { content: CODESANDBOX_APP_FILE },
        'styles.css': { content: CODESANDBOX_CSS_FILE },
      }}
      template="create-react-app-typescript"
    >
      {(props: { error: string; isDeploying: boolean; isLoading: boolean }) => {
        const { error, isDeploying, isLoading } = props;
        const deploying = isDeploying || isLoading || false;

        const buttonText = deploying ? 'Opening...' : 'Open in Codesandbox';

        if (error) console.log(error);

        return (
          <IconButton
            color={ButtonColor.secondary}
            icon={<ExternalLinkIcon />}
            iconPosition={ButtonIconPosition.right}
            size={ButtonSize.small}
            style={{ marginRight: 0 }}
          >
            {error ? 'Error' : buttonText}
          </IconButton>
        );
      }}
    </CodeSandboxer>
  );
};

interface CopyActionProps extends HTMLAttributes<HTMLButtonElement> {
  code: string;
}
export const CopyAction: React.FC<CopyActionProps> = props => {
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

  return copied ? (
    <Button disabled color={ButtonColor.secondary} size={ButtonSize.small}>
      Copied!
    </Button>
  ) : (
    <CopyToClipboard text={props.code} onCopy={handleCopy}>
      <Button color={ButtonColor.secondary} size={ButtonSize.small}>
        Copy
      </Button>
    </CopyToClipboard>
  );
};

interface ExpandActionProps extends HTMLAttributes<HTMLButtonElement> {
  expanded: boolean;
}
export const ExpandAction: React.FC<ExpandActionProps> = props => {
  const { expanded, ...rest } = props;

  return (
    <Button {...rest} color={ButtonColor.secondary} size={ButtonSize.small}>
      {expanded ? 'Collapse' : 'Expand'} code
    </Button>
  );
};
