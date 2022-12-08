import { createContext, useContext } from 'react';

interface InverseInterface {
  isInverse?: boolean;
}

export const InverseContext = createContext<InverseInterface>({
  isInverse: false,
});

export function useIsInverse(inverseProp?: boolean) {
  const inverseContext = useContext(InverseContext);

  return typeof inverseProp !== 'undefined'
    ? Boolean(inverseProp)
    : inverseContext.isInverse;
}
