import * as React from 'react';
import { Point } from 'victory';
import { useForceUpdate } from 'react-magma-dom';

export const CustomScatterDataComponent = props => {
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

export const CustomPointComponent = props => {
  const {
    lineIndex,
    pointRefArray,
    pointIndex,
    registerPoint,
    unregisterPoint,
    ...other
  } = props;
  const forceUpdate = useForceUpdate();
  const ref = React.useRef<SVGPathElement>();

  React.useEffect(() => {
    registerPoint(pointRefArray, ref);

    forceUpdate();

    return () => unregisterPoint(pointRefArray, ref);
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
