import { Dropdown, Heading, Paragraph } from 'react-magma-dom';

import frontmatter from '@github-docs/frontmatter';
import React, { useContext, useState } from 'react';

import {
  Actions,
  ActionsLeft,
  ActionsRight,
  CopyAction,
  CodeSandboxAction,
  ExpandAction,
} from './actions';
import { CodeBlockContext } from './context';
import { Editor } from './editor';
import { Preview } from './preview';
// import styles from './styles.module.css'

export interface ExampleData {
  code: string;
  description: string;
  id: string;
  title: string;
  value: string;
}

interface ExamplesSwitcherProps {
  examples: ExampleData[];
}
export const ExamplesSwitcher: React.FC<ExamplesSwitcherProps> = props => {
  const [selectedOption, setSelectedOption] = useState(props.examples[0].value);

  const handleDropdownChange = (_evt: React.FormEvent, value: string) => {
    setSelectedOption(value);
  };

  return (
    <div>
      {/* <header className={styles.header}> */}
      <header>
        <div style={{ flex: 0 }}>
          <Heading level={3}>Examples:</Heading>
        </div>

        <div style={{ flex: 2 }}>
          <Dropdown
            menu={props.examples.map(example => {
              return (
                <Dropdown.Item key={example.id} value={example.value}>
                  {example.title}
                </Dropdown.Item>
              );
            })}
            onChange={handleDropdownChange}
            value={selectedOption}
          />
        </div>
      </header>

      <div>
        {props.examples
          .filter(example => example.value === selectedOption)
          .map(example => {
            return (
              <Example
                key={example.id}
                code={example.code}
                description={example.description}
              />
            );
          })}
      </div>
    </div>
  );
};

function calculateStartExpanded(code: string, startExpanded: boolean) {
  if (startExpanded) return startExpanded;
  const AUTO_EXPAND_LINE_COUNT_THRESHOLD = 5;
  const lineCount = code.split(/\r\n|\r|\n/).length;
  return lineCount <= AUTO_EXPAND_LINE_COUNT_THRESHOLD;
}

interface ExampleProps {
  description?: string;
  code: string;
}
export const Example: React.FC<ExampleProps> = props => {
  const context = useContext(CodeBlockContext);
  const [expanded, setExpanded] = useState<boolean>(
    calculateStartExpanded(props.code, context.startExpanded)
  );
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      {props.description && <Paragraph>{props.description}</Paragraph>}

      <div>
        {/* <div className={styles.example}> */}
        <Preview code={props.code} />

        <Actions>
          <ActionsLeft>
            <ExpandAction expanded={expanded} onClick={toggleExpanded} />
          </ActionsLeft>

          <ActionsRight>
            <CopyAction code={props.code} />
            <CodeSandboxAction code={props.code} />
          </ActionsRight>
        </Actions>

        <Editor expanded={expanded} onClick={toggleExpanded}>
          {props.code}
        </Editor>
      </div>
    </div>
  );
};

export function parseCode(
  code: string,
  delimiter = '\n\n===\n\n'
): ExampleData[] {
  return code.split(delimiter).map((str: string, index) => {
    const { content = '', data = {} } = frontmatter(str);
    const code = content.trim();

    const description = data.description || '';
    const title = data.title || `Example #${index}`;
    const value = `value ${index}`;

    return { id: `${index}`, code, description, title, value };
  });
}
