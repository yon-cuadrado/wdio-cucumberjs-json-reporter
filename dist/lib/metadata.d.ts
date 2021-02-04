import { BrowserData, MetadataObject, cjson_metadata } from './models';
import { RunnerStats } from '@wdio/reporter';
import WebDriver from 'webdriver';
export declare class Metadata {
    determineMetadata(data: RunnerStats): MetadataObject;
    determineDeviceName(metadata: cjson_metadata, currentConfigCapabilities: WebDriver.DesiredCapabilities): string;
    determinePlatformName(metadata: cjson_metadata, currentCapabilities: WebDriver.DesiredCapabilities): string;
    determinePlatformVersion(metadata: cjson_metadata): string;
    determineAppData(currentConfigCapabilities: WebDriver.DesiredCapabilities, metadata: cjson_metadata): MetadataObject;
    determineBrowserData(currentCapabilities: WebDriver.DesiredCapabilities, currentConfigCapabilities: WebDriver.DesiredCapabilities, metadata: cjson_metadata): BrowserData;
}
//# sourceMappingURL=metadata.d.ts.map