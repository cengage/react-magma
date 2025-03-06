import { useMemo } from 'react';

const useDeviceDetect = () => {
  const userAgent = useMemo(() => navigator.userAgent.toLowerCase(), []);

  const isSafari = useMemo(
    () => /^((?!chrome|android).)*safari/i.test(userAgent),
    [userAgent]
  );
  const isChrome = useMemo(
    () => /chrome|crios/i.test(userAgent) && !/edge|edg/i.test(userAgent),
    [userAgent]
  );
  const isFirefox = useMemo(
    () => /firefox|fxios/i.test(userAgent),
    [userAgent]
  );
  const isEdge = useMemo(() => /edge|edg/i.test(userAgent), [userAgent]);
  const isMobile = useMemo(
    () => /mobi|android|touch|mini/i.test(userAgent),
    [userAgent]
  );

  return { isSafari, isChrome, isFirefox, isEdge, isMobile };
};

export default useDeviceDetect;
