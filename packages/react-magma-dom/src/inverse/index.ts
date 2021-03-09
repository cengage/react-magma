import * as React from 'react';

interface InverseInterface {
  isInverse?: boolean;
}

export const InverseContext = React.createContext<InverseInterface>({
  isInverse: false,
});

export function getIsInverse(
  inverseContext: InverseInterface,
  inverseProp?: boolean
) {
  return typeof inverseProp !== 'undefined'
    ? Boolean(inverseProp)
    : inverseContext.isInverse;
}
