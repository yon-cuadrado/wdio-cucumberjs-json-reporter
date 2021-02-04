"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const constants_1 = require("./constants");
class Metadata {
    determineMetadata(data) {
        let instanceData;
        const currentCapabilities = data.capabilities;
        const optsCaps = browser?.options?.capabilities;
        const currentConfigCapabilities = data?.capabilities;
        const w3cCaps = browser?.options?.requestedCapabilities;
        const metadata = currentConfigCapabilities?.cjson_metadata
            || w3cCaps?.cjson_metadata
            || optsCaps?.cjson_metadata
            || {};
        if (currentConfigCapabilities?.app || currentConfigCapabilities?.testobject_app_id || metadata?.app) {
            instanceData = this.determineAppData(currentConfigCapabilities, metadata);
        }
        else {
            instanceData = this.determineBrowserData(currentCapabilities, currentConfigCapabilities, metadata);
        }
        return {
            ...instanceData,
            device: this.determineDeviceName(metadata, currentConfigCapabilities),
            platform: {
                name: this.determinePlatformName(metadata, currentCapabilities),
                version: this.determinePlatformVersion(metadata),
            },
        };
    }
    determineDeviceName(metadata, currentConfigCapabilities) {
        return (metadata?.device || currentConfigCapabilities?.deviceName || `Device name ${constants_1.NOT_KNOWN}`);
    }
    determinePlatformName(metadata, currentCapabilities) {
        const currentPlatformName = currentCapabilities?.platformName
            ? currentCapabilities?.platformName.includes('mac')
                ? 'osx'
                : currentCapabilities.platformName.includes('windows')
                    ? 'windows'
                    : currentCapabilities?.platformName
            : `Platform name ${constants_1.NOT_KNOWN}`;
        return (metadata.platform && metadata?.platform?.name)
            ? metadata.platform?.name
            : currentPlatformName;
    }
    determinePlatformVersion(metadata) {
        return (metadata && metadata.platform && metadata.platform?.version)
            ? metadata.platform.version
            : `Version ${constants_1.NOT_KNOWN}`;
    }
    determineAppData(currentConfigCapabilities, metadata) {
        const metaAppName = (metadata?.app && metadata.app?.name) ? metadata?.app?.name : 'No metadata.app.name available';
        const metaAppVersion = (metadata?.app && metadata.app.version) ? metadata.app.version : 'No metadata.app.version available';
        const appPath = (currentConfigCapabilities.app || currentConfigCapabilities.testobject_app_id || metaAppName);
        const appName = appPath.substring(appPath.replace('\\', '/').lastIndexOf('/')).replace('/', '');
        return {
            app: {
                name: appName,
                version: metaAppVersion,
            },
        };
    }
    determineBrowserData(currentCapabilities, currentConfigCapabilities, metadata) {
        const browserName = currentCapabilities?.browserName
            || currentConfigCapabilities?.browserName
            || ((metadata && metadata?.browser && metadata.browser?.name) ? metadata?.browser?.name : 'No metadata.browser.name available');
        const browserVersion = currentCapabilities?.version
            || currentCapabilities?.browserVersion
            || currentConfigCapabilities?.browserVersion
            || ((metadata && metadata?.browser && metadata?.browser?.version) ? metadata?.browser?.version : 'No metadata.browser.version available');
        return {
            browser: {
                name: browserName,
                version: browserVersion,
            }
        };
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=metadata.js.map