import { ComponentMapper } from '@data-driven-forms/react-form-renderer';
import {
  Alert,
  Banner,
  Heading,
  Hyperlink,
  Toast,
  Paragraph,
} from 'react-magma-dom';

import { Checkbox } from '../Checkbox';
import { Combobox } from '../Combobox';
import { Custom } from '../Custom';
import { DatePicker } from '../DatePicker';
import { FieldArray } from '../FieldArray';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { PasswordInput } from '../PasswordInput';
import { Radio } from '../Radio';
import { Select } from '../Select';
import { Spy } from '../Spy';
import { Textarea } from '../Textarea';
import { TimePicker } from '../TimePicker';
import { Toggle } from '../Toggle';

export enum componentTypes {
  ALERT = 'ALERT',
  BANNER = 'BANNER',
  CUSTOM = 'CUSTOM',
  HEADING = 'HEADING',
  HYPERLINK = 'HYPERLINK',
  TOAST = 'TOAST',
  CHECKBOX = 'CHECKBOX',
  COMBOBOX = 'COMBOBOX',
  DATE_PICKER = 'DATE_PICKER',
  FIELD_ARRAY = 'FIELD_ARRAY',
  FORM_GROUP = 'FORM_GROUP',
  INPUT = 'INPUT',
  MODAL = 'MODAL',
  PARAGRAPH = 'PARAGRAPH',
  PASSWORD_INPUT = 'PASSWORD_INPUT',
  RADIO = 'RADIO',
  SPY = 'SPY',
  SELECT = 'SELECT',
  TEXTAREA = 'TEXTAREA',
  TIME_PICKER = 'TIME_PICKER',
  TOGGLE = 'TOGGLE',
}

export const componentMapper: ComponentMapper = {
  [componentTypes.ALERT]: Alert,
  [componentTypes.BANNER]: Banner,
  [componentTypes.CUSTOM]: Custom,
  [componentTypes.HEADING]: Heading,
  [componentTypes.HYPERLINK]: Hyperlink,
  [componentTypes.TOAST]: Toast,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.COMBOBOX]: Combobox,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.FIELD_ARRAY]: FieldArray,
  [componentTypes.FORM_GROUP]: FormGroup,
  [componentTypes.INPUT]: Input,
  [componentTypes.MODAL]: Modal,
  [componentTypes.PARAGRAPH]: Paragraph,
  [componentTypes.PASSWORD_INPUT]: PasswordInput,
  [componentTypes.RADIO]: Radio,
  [componentTypes.SPY]: Spy,
  [componentTypes.SELECT]: Select,
  [componentTypes.TEXTAREA]: Textarea,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.TOGGLE]: Toggle,
};

export { ComponentMapper };
