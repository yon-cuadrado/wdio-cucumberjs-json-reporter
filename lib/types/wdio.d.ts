import '@wdio/reporter';
import 'webdriver';
import type { pickle } from 'cucumber';

declare module '@wdio/reporter'{
  export interface WDIOReporterBaseOptions {
    jsonFolder: string;
    language: string;
    cjson_metadata: cjson_metadata;
  }

  export interface cjson_metadata{
    browser?: {
      name: string;
      version: string;
    };
    device?: string;
    app?: {
      name: string;
      version: string;
    };
    platform?: {
      name: string;
      version: string;
    };
  }

  export interface HookStats{
    keyword: string;
    argument?: pickle.Argument;
    // state?: 'failed' | 'passed' | 'pending';
  }

  export interface TestStats{
    keyword?: string;
    foo?: string | boolean;
    bar?: boolean;
  }

  export interface RunnerStats{
    metadata?: {
      foo?: string;
    };
  }
}

