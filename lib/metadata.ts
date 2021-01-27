import { RunnerStats, Tag, cjson_metadata } from '@wdio/reporter';
import { NOT_KNOWN } from './constants';
import WebDriver from 'webdriver';
import type { pickle } from 'cucumber';

export class Metadata {
  /**
   * ```
   * Determine the metadata that needs to be added
   *
   * @param {object} data instance data
   *
   * @returns {
   *  {
   *      metadata: {
   *          app: {
   *              name: string,
   *              version: string
   *          },
   *          browser: {
   *              name: string,
   *              version: string
   *          },
   *          device: string,
   *          platform: {
   *              name: string,
   *              version: string
   *          }
   *      }
   *  }
   * }
   * ```
   */
  public determineMetadata ( data: RunnerStats ): MetadataObject {
    let instanceData: MetadataObject;
    const currentCapabilities = data.capabilities;
    // const capabilities: WebDriver.DesiredCapabilities = browser.options.capabilities as WebDriver.DesiredCapabilities;
    const optsCaps = typeof browser !== 'undefined' ? browser?.options?.capabilities : {} as WebDriver.W3CCapabilities;
    // const { capabilities: optsCaps = {}, requestedCapabilities = {} } = browser.options;
    const currentConfigCapabilities = data?.capabilities;
    const w3cCaps = typeof browser !== 'undefined' ? browser.options.requestedCapabilities : {};
    // const { w3cCaps = {} } = requestedCapabilities;
    const metadata: cjson_metadata = currentConfigCapabilities?.cjson_metadata // For WDIO V6
            || w3cCaps?.cjson_metadata // When an app is used to test
            || optsCaps?.cjson_metadata // devtools
            || {} as cjson_metadata;

    // When an app is used to test
    // eslint-disable-next-line @typescript-eslint/tslint/config
    if ( currentConfigCapabilities?.app || currentConfigCapabilities?.testobject_app_id || metadata?.app ) {
      instanceData = this.determineAppData( currentConfigCapabilities, metadata );
    } else {
      // Then a browser
      instanceData = this.determineBrowserData( currentCapabilities, currentConfigCapabilities, metadata );
    }

    return <MetadataObject> {
      ...instanceData,
      device: this.determineDeviceName( metadata, currentConfigCapabilities ),
      platform: {
        name: this.determinePlatformName( metadata, currentCapabilities ),
        version: this.determinePlatformVersion( metadata ),
      },
    };
  }

  /**
   * Determine the device name
   *
   * @param {object} metadata
   * @param {object} currentConfigCapabilities
   * @return {string}
   */
  public determineDeviceName ( metadata: cjson_metadata, currentConfigCapabilities: WebDriver.DesiredCapabilities ): string {
    return ( metadata?.device || currentConfigCapabilities?.deviceName || `Device name ${NOT_KNOWN}` );
  }

  /**
   * Determine the platform name
   *
   * @param {object} metadata
   * @param {object} currentCapabilities
   * @return {string}
   */
  public determinePlatformName ( metadata: cjson_metadata, currentCapabilities: WebDriver.DesiredCapabilities ): string {
    const currentPlatformName = currentCapabilities?.platformName
      ? currentCapabilities?.platformName.includes( 'mac' )
        ? 'osx'
        : currentCapabilities.platformName.includes( 'windows' )
          ? 'windows'
          : currentCapabilities?.platformName
      : `Platform name ${NOT_KNOWN}`;
    return ( metadata.platform && metadata?.platform?.name )
      ? metadata.platform?.name
      : currentPlatformName;
  }

  /**
   * Determine the platform version
   *
   * @param {object} metadata
   * @return {string}
   */
  public determinePlatformVersion ( metadata: cjson_metadata ): string {
    return ( metadata && metadata.platform && metadata.platform?.version )
      ? metadata.platform.version
      : `Version ${NOT_KNOWN}`;
  }

  /**
   * Determine the app data
   *
   * @param {object} currentConfigCapabilities The capabilities from the configured capabilities
   * @param {object} metadata The custom set capabilities
   *
   * @returns {
   * {
   * app: {
   *          name: string,
   *          version: string,
   *      },
   *  }
   * }
   */
  public determineAppData ( currentConfigCapabilities: WebDriver.DesiredCapabilities, metadata: cjson_metadata ): MetadataObject {
    const metaAppName: string = ( metadata?.app && metadata.app?.name ) ? metadata?.app?.name : 'No metadata.app.name available';
    const metaAppVersion: string = ( metadata?.app && metadata.app.version ) ? metadata.app.version : 'No metadata.app.version available';
    const appPath = ( currentConfigCapabilities.app || currentConfigCapabilities.testobject_app_id || metaAppName );
    const appName = appPath.substring( appPath.replace( '\\', '/' ).lastIndexOf( '/' ) ).replace( '/', '' );

    return {
      app: {
        name: appName,
        version: metaAppVersion,
      },
    };
  }

  /**
   * Determine the browser data
   *
   * @param {object} currentCapabilities The capabilities of the current run, that holds the most actual data
   * @param {object} currentConfigCapabilities The capabilities from the configured capabilities
   * @param {object} metadata The custom set capabilities
   *
   * @returns {
   *  {
   *      browser: {
   *          name: string,
   *          version: string,
   *      },
   *  }
   * }
   */
  public determineBrowserData ( currentCapabilities: WebDriver.DesiredCapabilities, currentConfigCapabilities: WebDriver.DesiredCapabilities, metadata: cjson_metadata ): BrowserData {
    const browserName = currentCapabilities?.browserName
            || currentConfigCapabilities?.browserName
            || ( ( metadata && metadata?.browser && metadata.browser?.name ) ? metadata?.browser?.name : 'No metadata.browser.name available' );
    const browserVersion = currentCapabilities?.version
            || currentCapabilities?.browserVersion
            || currentConfigCapabilities?.browserVersion
            || ( ( metadata && metadata?.browser && metadata?.browser?.version ) ? metadata?.browser?.version : 'No metadata.browser.version available' );

    return <BrowserData>{
      browser: {
        name: browserName,
        version: browserVersion,
      }
    };
  }
}

export interface BrowserData{
  browser: {
    name: string;
    version: string;
  };
}

export interface MetadataObject{
  app?: {
    name: string;
    version: string;
  };
  browser?: {
    name: string;
    version: string;
  };
  device?: string;
  platform?: {
    name: string;
    version: string;
  };
  foo?: string;
}

export interface Report{
  feature: Feature;
}

export interface Feature{
  keyword?: string;
  type?: string;
  metadata?: {
    keyword: string;
    type: string;
  };
  description?: string;
  line?: number;
  name?: string;
  uri?: string;
  tags?: string[] | Tag[] | string;
  elements?: Scenario[];
  id?: string;
}

export interface Scenario{
  keyword?: string;
  type?: string;
  description?: string;
  name?: string;
  tags?: string[] | Tag[] | string;
  id?: string;
  steps?: Step[];
  foo?: string;
  bar?: string;
  foobar?: string;
}

export interface Step{
  arguments?: pickle.Argument[];
  keyword?: string;
  name?: string;
  result?: {
    status: string;
    duration: number;
    error_message?: string;
  };
  line?: number | string;
  match?: {
    location: number | string;
  };
  embeddings?: Embedding[];
  foo?: string;
}

export interface Result extends ErrorMessage{
  status: string;
  duration: number;
}

export interface CucumberJsAttachment{
  data: string;
  type: string;
}

export interface Embedding{
  data: string;
  mime_type: string;
}

export interface ErrorMessage{
  error_message?: string;
}
