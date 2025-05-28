import { renderHook } from '@testing-library/react-hooks';

import useOSDetect from './useOSDetect';

describe('useOSDetect', () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
    });
  });

  it('should detect Windows OS', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      writable: true,
    });

    const { result } = renderHook(() => useOSDetect());

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

    const { result } = renderHook(() => useOSDetect());

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

    const { result } = renderHook(() => useOSDetect());

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

    const { result } = renderHook(() => useOSDetect());

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

    const { result } = renderHook(() => useOSDetect());

    expect(result.current.isWindows).toBe(false);
    expect(result.current.isMacOS).toBe(false);
    expect(result.current.isLinux).toBe(false);
    expect(result.current.isAndroid).toBe(false);
    expect(result.current.isIOS).toBe(true);
  });
});
