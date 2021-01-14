export type Comparator<T> = (a: T, B: T) => number;

export type Locale = 'en-GB' | 'en-US' | 'pl-PL';

export interface ServerLoggingData {
  origin?: string;
  referer?: string;
  userAgent?: string;
  xForwardedFor?: string | string[];
  xRealIp?: string | string[];
}
