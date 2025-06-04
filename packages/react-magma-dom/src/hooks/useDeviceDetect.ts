import { useMemo } from 'react';

export const useDeviceDetect = () => {
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

  const isWindows = useMemo(() => /windows nt/.test(userAgent), [userAgent]);

  const isMacOS = useMemo(() => /macintosh/.test(userAgent), [userAgent]);

  const isAndroid = useMemo(() => /android/.test(userAgent), [userAgent]);

  const isIOS = useMemo(() => /iphone|ipad|ipod/.test(userAgent), [userAgent]);

  const isLinux = useMemo(
    () => /linux/.test(userAgent) && !isAndroid,
    [userAgent, isAndroid]
  );

  return {
    isSafari,
    isChrome,
    isFirefox,
    isEdge,
    isMobile,
    isWindows,
    isMacOS,
    isLinux,
    isAndroid,
    isIOS,
  };
};

export default useDeviceDetect;
