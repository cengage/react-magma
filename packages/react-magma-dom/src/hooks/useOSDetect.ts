import { useMemo } from 'react';

const useOSDetect = () => {
  const userAgent = useMemo(() => navigator.userAgent.toLowerCase(), []);

  const isWindows = useMemo(() => /windows nt/.test(userAgent), [userAgent]);

  const isMacOS = useMemo(() => /macintosh/.test(userAgent), [userAgent]);

  const isAndroid = useMemo(() => /android/.test(userAgent), [userAgent]);

  const isIOS = useMemo(() => /iphone|ipad|ipod/.test(userAgent), [userAgent]);

  const isLinux = useMemo(
    () => /linux/.test(userAgent) && !isAndroid,
    [userAgent, isAndroid]
  );

  return { isWindows, isMacOS, isLinux, isAndroid, isIOS };
};

export default useOSDetect;
