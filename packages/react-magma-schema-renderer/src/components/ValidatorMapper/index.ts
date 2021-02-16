import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import { Validators } from '@data-driven-forms/react-form-renderer';

export interface ValidatorMapper {
  [key: string]: (options?: object) => (value: any, allValues: object) => string | undefined;
}

export { validatorTypes };

export const validatorMapper: ValidatorMapper = {
  ...Validators
}