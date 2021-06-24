import { ValidatorFunction } from '@data-driven-forms/react-form-renderer';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

export interface ValidatorMapper {
  [key: string]: (options?: object) => ValidatorFunction;
}

export { validatorTypes };
