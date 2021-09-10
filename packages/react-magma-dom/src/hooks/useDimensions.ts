import {
  useCallback,
  useState,
  useLayoutEffect
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


export function useDimensions({
  dependencies=[],
  initialDimensions={},
  observe=true,
}: UseDimensionsProps = {}): [React.Ref<HTMLElement>, DOMRect, HTMLElement] {

  const [dimensions, setDimensions] = useState({...defaultDimensions, ...initialDimensions});
  const [node, setNode] = useState(null);

  const ref = useCallback((newNode) => {
    setNode(newNode);
  }, []);

  useLayoutEffect(() => {
    if(!node) return;

    const measure = () => {
      setDimensions(node.getBoundingClientRect());
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
  }, [node, observe, ...dependencies]);

  return [ref, dimensions, node];
}