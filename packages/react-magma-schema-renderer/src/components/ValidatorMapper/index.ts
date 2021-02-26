import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';
import { ValidatorFunction } from '@data-driven-forms/react-form-renderer/dist/cjs/validators';

export interface ValidatorMapper {
  [key: string]: (options?: object) => ValidatorFunction;
}

export { validatorTypes };
