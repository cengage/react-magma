import { renderHook } from '@testing-library/react-hooks';

import useDeviceDetect from './useDeviceDetect';

describe('useDeviceDetect', () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
    });
  });

  it('should detect Safari browser', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isSafari).toBe(true);
    expect(result.current.isChrome).toBe(false);
    expect(result.current.isFirefox).toBe(false);
    expect(result.current.isEdge).toBe(false);
    expect(result.current.isMobile).toBe(false);
  });

  it('should detect Chrome browser', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isSafari).toBe(false);
    expect(result.current.isChrome).toBe(true);
    expect(result.current.isFirefox).toBe(false);
    expect(result.current.isEdge).toBe(false);
    expect(result.current.isMobile).toBe(false);
  });

  it('should detect Firefox browser', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isSafari).toBe(false);
    expect(result.current.isChrome).toBe(false);
    expect(result.current.isFirefox).toBe(true);
    expect(result.current.isEdge).toBe(false);
    expect(result.current.isMobile).toBe(false);
  });

  it('should detect Edge browser', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isSafari).toBe(false);
    expect(result.current.isChrome).toBe(false);
    expect(result.current.isFirefox).toBe(false);
    expect(result.current.isEdge).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });

  it('should detect mobile device', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isSafari).toBe(true);
    expect(result.current.isChrome).toBe(false);
    expect(result.current.isFirefox).toBe(false);
    expect(result.current.isEdge).toBe(false);
    expect(result.current.isMobile).toBe(true);
  });

  it('should detect Windows OS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isWindows).toBe(true);
    expect(result.current.isMacOS).toBe(false);
    expect(result.current.isLinux).toBe(false);
    expect(result.current.isAndroid).toBe(false);
    expect(result.current.isIOS).toBe(false);
  });

  it('should detect macOS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isWindows).toBe(false);
    expect(result.current.isMacOS).toBe(true);
    expect(result.current.isLinux).toBe(false);
    expect(result.current.isAndroid).toBe(false);
    expect(result.current.isIOS).toBe(false);
  });

  it('should detect Linux (non-Android)', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isWindows).toBe(false);
    expect(result.current.isMacOS).toBe(false);
    expect(result.current.isLinux).toBe(true);
    expect(result.current.isAndroid).toBe(false);
    expect(result.current.isIOS).toBe(false);
  });

  it('should detect Android OS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isWindows).toBe(false);
    expect(result.current.isMacOS).toBe(false);
    expect(result.current.isLinux).toBe(false);
    expect(result.current.isAndroid).toBe(true);
    expect(result.current.isIOS).toBe(false);
  });

  it('should detect iOS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
      writable: true,
    });

    const { result } = renderHook(() => useDeviceDetect());

    expect(result.current.isWindows).toBe(false);
    expect(result.current.isMacOS).toBe(false);
    expect(result.current.isLinux).toBe(false);
    expect(result.current.isAndroid).toBe(false);
    expect(result.current.isIOS).toBe(true);
  });
});
