import * as React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import FieldArrayBase from '@data-driven-forms/react-form-renderer/dist/cjs/field-array';

// import { v4 as uuidv4 } from 'uuid';
import { Button, ButtonColor, Heading, Paragraph } from 'react-magma-dom';

import { FieldArrayItem } from './FieldArrayItem';

export const FieldArray = ({ ...props }: any) => {
  const {
    arrayValidator,
    label,
    description,
    fields: formFields,
    defaultItem,
    meta,
    minItems,
    maxItems,
    noItemsMessage = "You haven't added any items yet!",
    FormControlProps,
    ...rest
  } = useFieldApi(props);

  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <FieldArrayBase
      key={rest.input.name}
      name={rest.input.name}
      validate={arrayValidator}
    >
      {({ fields: { map, value = [], push, remove } }) => {
        return (
          <>
            {label && <Heading level={6}>{label}</Heading>}
            <Button
              color={ButtonColor.primary}
              onClick={() => push(defaultItem)}
              disabled={value.length >= maxItems}
            >
              ADD ITEM
            </Button>
            {description && <Paragraph>{description}</Paragraph>}
            {value.length <= 0 ? (
              <Paragraph>{noItemsMessage}</Paragraph>
            ) : (
              map((name, index) => (
                <FieldArrayItem
                  key={name}
                  fields={formFields}
                  name={name}
                  fieldIndex={index}
                  remove={remove}
                  length={value.length}
                  minItems={minItems}
                  removeLabel="REMOVE"
                />
              ))
            )}
            {isError && <Paragraph>{error}</Paragraph>}
          </>
        );
      }}
    </FieldArrayBase>
  );
};
