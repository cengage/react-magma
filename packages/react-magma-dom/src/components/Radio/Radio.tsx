import * as React from 'react';
import { RadioCore } from 'react-magma-core';
import { RadioContext } from './RadioGroup';

export interface RadioProps {
  labelText: string;
  value: string;
}

export const Radio: React.SFC<RadioProps> = (
  props: RadioProps
): JSX.Element => (
  <RadioContext.Consumer>
    {context =>
      context && (
        <RadioCore
          selectedValue={context.selectedValue}
          handleChange={context.handleChange}
          value={props.value}
        >
          {({ handleChange, checked }) => {
            const { labelText, value } = props;
            const { name } = context;

            return (
              <>
                <input
                  type="radio"
                  aria-checked={checked}
                  id={value}
                  name={name}
                  value={value}
                  onChange={handleChange}
                />
                <label htmlFor={value}>{labelText}</label>
              </>
            );
          }}
        </RadioCore>
      )
    }
  </RadioContext.Consumer>
);

export default Radio;
