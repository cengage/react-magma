import {
  useCallback,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';

interface UseDimensionsProps {
  initialDimensions?: Partial<DOMRect>;
  observe?: boolean;
  dependencies?: Array<any>;
}

const defaultDimensions: DOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON: () => {}
}


export function useDimensions<T=HTMLElement>({
  dependencies=[],
  initialDimensions={},
  observe=true,
}: UseDimensionsProps = {}): [React.RefObject<T>, DOMRect] {

  const [dimensions, setDimensions] = useState({...defaultDimensions, ...initialDimensions});
  const ref = useRef<HTMLElement>();

  useLayoutEffect(() => {
    if(!ref) return;

    const measure = () => {
      setDimensions(ref.current.getBoundingClientRect());
    }
    
    measure();

    if(observe) {
      window.addEventListener('resize', measure);
      window.addEventListener('scroll', measure);
    }

    return () => {
      if(observe) {
        window.removeEventListener('resize', measure);
        window.removeEventListener('scroll', measure);
      } 
    }
  }, [observe, ...dependencies]);

  return [ref, dimensions];
}