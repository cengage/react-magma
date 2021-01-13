import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { Combobox } from '../index';
// import { Story, Meta } from '@storybook/react/types-6-0';
// import { AlertVariant } from '../../AlertBase';

interface SelectOption {
  label: string;
  value: string;
}

// const MultiTemplate: Story<MultiComboboxProps<SelectOption>> = args => (
//   <Combobox isMulti {...args} />
// );

// export default {
//   title: 'Combobox',
//   component: Combobox,
//   argTypes: {
//     variant: {
//       control: {
//         type: 'select',
//         options: AlertVariant,
//       },
//     },
//   },
// } as Meta;

// export const Default = MultiTemplate.bind({});
// Default.args = {
//   errorMessage: "Please correct this error",
//   labelText: "Multi Combobox Controlled",
//   items: [
//     { label: 'Red', value: 'red' },
//     { label: 'Blue', value: 'blue' },
//     { label: 'Green', value: 'green' },
//   ],
//   selectedItems={selectedItems}
//   onSelectedItemsChange={handleSelectedItemsChange}
//   onRemoveSelectedItem={handleRemoveSelectedItem}
// };

export default {
  title: 'Combobox',
  component: Combobox,
} as Meta;

export const Controlled = () => {
  const [selectedItem, updateSelectedItem] = React.useState<SelectOption>(
    undefined
  );

  const items: Array<SelectOption> = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ];

  function handleselectedItemChange(changes) {
    updateSelectedItem(changes.selectedItem);
  }

  return (
    <Combobox<SelectOption>
      items={items}
      labelText="Combobox Controlled"
      selectedItem={selectedItem}
      onSelectedItemChange={handleselectedItemChange}
    />
  );
};

export const ControlledMulti = () => {
  const [selectedItems, updateSelectedItems] = React.useState<
    Array<SelectOption>
  >([]);

  const items: Array<SelectOption> = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ];

  function handleSelectedItemsChange(changes) {
    updateSelectedItems(changes.selectedItems);
  }

  function handleRemoveSelectedItem(removedItem) {
    updateSelectedItems(selectedItems.filter(item => item !== removedItem));
  }

  return (
    <Combobox<SelectOption>
      isMulti
      items={items}
      labelText="Multi Combobox Controlled"
      selectedItems={selectedItems}
      onSelectedItemsChange={handleSelectedItemsChange}
      onRemoveSelectedItem={handleRemoveSelectedItem}
    />
  );
};
