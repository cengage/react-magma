import * as React from 'react';

interface InverseInterface {
  isInverse?: boolean;
}

export const InverseContext = React.createContext<InverseInterface>({
  isInverse: false,
});

export function useIsInverse(inverseProp?: boolean) {
  const inverseContext = React.useContext(InverseContext);

  return typeof inverseProp !== 'undefined'
    ? Boolean(inverseProp)
    : inverseContext.isInverse;
}
