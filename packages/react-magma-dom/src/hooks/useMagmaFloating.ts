import {
  useFloating,
  flip,
  autoUpdate,
  AlignedPlacement,
} from '@floating-ui/react-dom';

export function useMagmaFloating(placement: AlignedPlacement = 'bottom-start') {
  return useFloating({
    middleware: [flip()],
    placement,
    whileElementsMounted: autoUpdate,
  });
}
