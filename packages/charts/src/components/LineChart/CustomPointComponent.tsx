import * as React from 'react';

import { useForceUpdate } from 'react-magma-dom';
import { Point, PointProps } from 'victory';

export interface CustomScatterDataComponentInterface extends PointProps {
  lineIndex: number;
  pointRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  registerPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
  unregisterPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
}

export interface CustomPointComponentInterface {
  lineIndex: number;
  pointIndex: PointProps['index'];
  pointRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  registerPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
  unregisterPoint: (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void;
}

export const CustomScatterDataComponent = (
  props: CustomScatterDataComponentInterface
) => {
  const {
    datum,
    index: pointIndex,
    lineIndex,
    pointRefArray,
    registerPoint,
    unregisterPoint,
    ...other
  } = props;

  return (
    <Point
      {...other}
      ariaLabel={datum.label}
      pathComponent={
        <CustomPointComponent
          lineIndex={lineIndex}
          pointIndex={pointIndex}
          pointRefArray={pointRefArray}
          registerPoint={registerPoint}
          unregisterPoint={unregisterPoint}
        />
      }
      role="button"
      tabIndex={0}
    />
  );
};

export const CustomPointComponent = (props: CustomPointComponentInterface) => {
  const {
    lineIndex,
    pointRefArray,
    pointIndex,
    registerPoint,
    unregisterPoint,
    ...other
  } = props;
  const forceUpdate = useForceUpdate();
  const ref = React.useRef<SVGPathElement | null>(null);

  React.useEffect(() => {
    registerPoint(pointRefArray, ref as React.MutableRefObject<Element>);

    forceUpdate();

    return () =>
      unregisterPoint(pointRefArray, ref as React.MutableRefObject<Element>);
  }, []);

  return (
    <path
      ref={ref}
      data-line-index={lineIndex}
      data-point-index={pointIndex}
      {...other}
    />
  );
};
