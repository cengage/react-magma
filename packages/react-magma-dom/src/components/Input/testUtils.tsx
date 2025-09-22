import React from 'react';

import { WorkIcon } from 'react-magma-icons';

import { ButtonColor, ButtonVariant } from '../Button';
import { Combobox } from '../Combobox';
import { IconButton } from '../IconButton';

import { Input } from './index';

// This component is used to render the Input usage for testing purposes.
export const CustomTopicsRow = ({
  topicList,
  isRemoveButtonDisabled,
  shouldValidate,
  topicTitle,
  testTopic,
  studyMaterialsTopic,
  order,
  setTopicTitle,
  setTestTopic,
  setStudyMaterialsTopic,
  removeTopicRow,
}: {
  topicList: { reference: string; title: string }[];
  isRemoveButtonDisabled: boolean;
  shouldValidate?: boolean;
  topicTitle: string;
  testTopic?: string;
  studyMaterialsTopic?: string;
  order: number;
  setTopicTitle: (title: string) => void;
  setTestTopic: (reference: string) => void;
  setStudyMaterialsTopic: (reference: string) => void;
  removeTopicRow: () => void;
}) => {
  const getTopicTitleError = (): string | undefined => {
    if (!topicTitle.length) return 'Enter a topic title';
    if (topicTitle.length >= 100) return 'Title is too long';
    return undefined;
  };

  const normalizeTopicItems = (): { label: string; value: string }[] =>
    topicList.map((topic: { reference: string; title: string }) => ({
      label: topic.title,
      value: topic.reference,
    }));

  const getSelectedTopic = (
    reference?: string
  ): { label: string; value: string } | undefined => {
    if (!reference) return;
    const selectedTopic = topicList.find(
      (topic: { reference: string }) => topic.reference === reference
    );
    return selectedTopic
      ? {
          label: selectedTopic.title,
          value: selectedTopic.reference,
        }
      : undefined;
  };

  const onTopicTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicTitle(event.target.value.trim());
  };

  const onTestTopicChange = (
    changes: Partial<{ selectedItem: { label: string; value: string } }>
  ) => {
    if (changes.selectedItem) {
      setTestTopic(changes.selectedItem.value);
    }
  };

  const onStudyMaterialsTopicChange = (
    changes: Partial<{ selectedItem: { label: string; value: string } }>
  ) => {
    if (changes.selectedItem) {
      setStudyMaterialsTopic(changes.selectedItem.value);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        errorMessage={shouldValidate && getTopicTitleError()}
        id={`topicTitle-${order}`}
        labelText={`Topic ${order} Title *`}
        onChange={onTopicTitleChange}
        required
        testId={`topicTitle-${order}`}
        value={topicTitle}
      />
      <Combobox
        items={normalizeTopicItems()}
        labelText={`Topic ${order} Test *`}
        onSelectedItemChange={onTestTopicChange}
        placeholder="Select a test topic"
        selectedItem={getSelectedTopic(testTopic)}
        testId={`testTopic-${order}`}
      />
      <Combobox
        items={normalizeTopicItems()}
        labelText={`Topic ${order} Study Materials *`}
        onSelectedItemChange={onStudyMaterialsTopicChange}
        placeholder="Select study materials"
        selectedItem={getSelectedTopic(studyMaterialsTopic)}
        testId={`studyMaterialsTopic-${order}`}
      />
      <IconButton
        aria-label="Remove"
        color={
          isRemoveButtonDisabled ? ButtonColor.secondary : ButtonColor.primary
        }
        disabled={isRemoveButtonDisabled}
        icon={<WorkIcon />}
        onClick={removeTopicRow}
        testId={`removeRowButton-${order}`}
        variant={ButtonVariant.link}
      />
    </div>
  );
};
