"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_EMPTY_STATS = exports.TEST_SCENARIO_STATS_ERROR = exports.TEST_SCENARIO_STATS = exports.STEP_HOOK_ONSTART_STATS = exports.STEP_TEST_ONSTART_ARGUMENT_STATS = exports.STEP_TEST_ONSTART_STATS = exports.SUITE_FEATURE_STATS = exports.WDIO6_RUNNER_STATS = exports.FULL_RUNNER_STATS = exports.SMALL_RUNNER_STATS = exports.EMPTY_SCENARIO = exports.EMPTY_FEATURE = void 0;
exports.EMPTY_FEATURE = {
    keyword: 'Feature',
    description: '',
    line: 2,
    name: 'Empty feature',
    tags: '',
    elements: [],
    id: 'empty-feature',
};
exports.EMPTY_SCENARIO = {
    keyword: 'Scenario',
    description: '',
    name: 'Open website',
    tags: '',
    id: 'create-passed-feature;open-website',
    steps: [],
};
exports.SMALL_RUNNER_STATS = {
    type: 'runner',
    start: new Date('2019-07-14T07:25:20.897Z'),
    _duration: 0,
    duration: 0,
    complete: () => { },
    cid: '0-0',
    capabilities: {
        browserName: 'chrome',
        chromedriverVersion: '2.46.628411 (3324f4c8be9ff2f70a05a30ebc72ffb013e1a71e)',
        chromeOptions: {
            args: ['user-data-dir=/var/folders/rb/_hbqv7fn5114b206t2s05fs40000gn/T/.org.chromium.Chromium.uwkY0A'],
        },
        'goog:chromeOptions': {
            debuggerAddress: 'localhost:53158'
        },
        platform: 'Mac OS X',
        proxy: {},
        version: '75.0.3770.100',
    },
    sanitizedCapabilities: 'chrome.75_0_3770_100.macosx',
    specs: ['/Users/wswebcreation/Sauce/Git/webdriverio-cucumberjs/__tests__/features/passed.feature'],
    config: {
        jsonFolder: '',
        language: 'en',
        cjson_metadata: {},
        logFile: '',
        stdout: true,
        writeStream: {}
    },
    isMultiremote: false
};
exports.FULL_RUNNER_STATS = {
    type: 'runner',
    start: new Date('2019-07-14T07:25:20.897Z'),
    _duration: 0,
    duration: 0,
    complete: () => { },
    cid: '0-0',
    capabilities: {
        cjson_metadata: {
            app: {
                name: 'test',
                version: '1'
            }
        },
        app: '',
        acceptInsecureCerts: false,
        acceptSslCerts: false,
        applicationCacheEnabled: false,
        browserConnectionEnabled: false,
        browserName: 'chrome',
        chromedriverVersion: '2.46.628411 (3324f4c8be9ff2f70a05a30ebc72ffb013e1a71e)',
        chromeOptions: {
            args: ['user-data-dir=/var/folders/rb/_hbqv7fn5114b206t2s05fs40000gn/T/.org.chromium.Chromium.uwkY0A'],
        },
        cssSelectorsEnabled: true,
        databaseEnabled: false,
        'goog:chromeOptions': {
            debuggerAddress: 'localhost:53158'
        },
        handlesAlerts: true,
        javascriptEnabled: true,
        locationContextEnabled: true,
        mobileEmulationEnabled: false,
        nativeEvents: true,
        pageLoadStrategy: 'normal',
        platform: 'Mac OS X',
        proxy: {},
        rotatable: false,
        setWindowRect: true,
        strictFileInteractability: false,
        timeouts: {
            implicit: 0,
            pageLoad: 300000,
            script: 30000,
        },
        unexpectedAlertBehaviour: 'ignore',
        version: '75.0.3770.100',
        webStorageEnabled: true,
        'webdriver.remote.sessionid': 'b2e560a6ed31a6551fa3509109b71f14'
    },
    sanitizedCapabilities: 'chrome.75_0_3770_100.macosx',
    config: {
        jsonFolder: '',
        language: 'en',
        cjson_metadata: {
            app: {
                name: 'test',
                version: '1'
            }
        },
        logFile: '',
        stdout: true,
        writeStream: {}
    },
    specs: ['/Users/wswebcreation/Sauce/Git/webdriverio-cucumberjs/__tests__/features/passed.feature'],
    sessionId: 'b2e560a6ed31a6551fa3509109b71f14',
    isMultiremote: false,
    retry: 0
};
exports.WDIO6_RUNNER_STATS = {
    type: 'runner',
    start: new Date('2020-04-27T13:24:19.166Z'),
    _duration: 0,
    duration: 0,
    complete: () => { },
    cid: '0-0',
    capabilities: {
        cjson_metadata: {},
        acceptInsecureCerts: false,
        browserName: 'chrome',
        browserVersion: '81.0.4044.122',
        chromedriverVersion: '2.46.628411 (3324f4c8be9ff2f70a05a30ebc72ffb013e1a71e)',
        chromeOptions: {
            args: ['user-data-dir=/var/folders/rb/_hbqv7fn5114b206t2s05fs40000gn/T/.org.chromium.Chromium.uwkY0A'],
        },
        'goog:chromeOptions': { debuggerAddress: 'localhost:56189' },
        pageLoadStrategy: 'normal',
        platformName: 'mac os x',
        proxy: {},
        setWindowRect: true,
        strictFileInteractability: false,
        timeouts: { implicit: 0, pageLoad: 300000, script: 30000 },
        unhandledPromptBehavior: 'dismiss and notify',
        'webdriver.remote.sessionid': '27e5b2b068aa1612e60d90a9e5164a7d',
    },
    sanitizedCapabilities: 'chrome.81_0_4044_122.macosx',
    config: {
        jsonFolder: '',
        language: 'en',
        cjson_metadata: {},
        logFile: '',
        stdout: true,
        writeStream: {}
    },
    specs: ['/Users/wimselles/Git/cucumberjs-json-demo/google.feature'],
    sessionId: '27e5b2b068aa1612e60d90a9e5164a7d',
    isMultiremote: false,
    retry: 0
};
exports.SUITE_FEATURE_STATS = {
    type: 'suite',
    start: new Date('2019-07-15T14:40:50.761Z'),
    _duration: 0,
    duration: 0,
    uid: 'Create passed feature2',
    cid: '0-0',
    title: 'Create passed feature',
    fullTitle: undefined,
    tests: [],
    hooks: [],
    suites: [],
    hooksAndTests: [],
    complete: () => { }
};
exports.STEP_TEST_ONSTART_STATS = {
    'type': 'test',
    'start': new Date('2019-07-19T21:15:01.176Z'),
    '_duration': 0,
    'duration': 0,
    'uid': 'I open "http://webdriver.io/"6',
    'cid': '0-0',
    'title': 'Given I open "http://webdriver.io/"',
    'fullTitle': 'Create failed feature: Open website: Given I open "http://webdriver.io/"',
    'output': [],
    'state': 'pending',
    pass: () => { },
    skip: () => { },
    fail: () => { },
    complete: () => { }
};
exports.STEP_TEST_ONSTART_ARGUMENT_STATS = {
    'type': 'test',
    'start': new Date('2019-07-19T21:15:01.176Z'),
    '_duration': 0,
    duration: 0,
    'uid': 'I open "http://webdriver.io/"6',
    'cid': '0-0',
    'title': 'Given I open "http://webdriver.io/"',
    'fullTitle': 'Create failed feature: Open website: Given I open "http://webdriver.io/"',
    'output': [],
    'state': 'pending',
    'argument': {},
    pass: () => { },
    skip: () => { },
    fail: () => { },
    complete: () => { }
};
exports.STEP_HOOK_ONSTART_STATS = {
    'type': 'hook',
    'start': new Date('2019-07-19T21:15:01.172Z'),
    '_duration': 0,
    duration: 0,
    'uid': 'all.steps.js43',
    'cid': '0-0',
    'title': 'Hook',
    'parent': 'Create failed feature: Open website',
    'keyword': '',
    complete: () => { }
};
exports.TEST_SCENARIO_STATS = {
    type: 'test',
    parent: '',
    start: new Date('2019-07-16T05:50:02.080Z'),
    _duration: 1534,
    duration: 1534,
    uid: 'I open "http://webdriver.io/"6',
    cid: '0-0',
    title: 'Hook This is doing nothing because it\'s a background"',
    state: 'passed',
    keyword: 'Before',
    errors: [],
    end: new Date('2020-05-24T06:32:50.002Z'),
    complete: () => { }
};
exports.TEST_SCENARIO_STATS_ERROR = {
    type: 'test',
    start: new Date('2020-05-24T06:32:50.004Z'),
    _duration: 5,
    duration: 5,
    uid: 'I am a failed step23',
    cid: '0-0',
    title: 'Given I am a failed step',
    fullTitle: 'Google: A failed step: Given I am a failed step',
    output: [],
    state: 'failed',
    end: new Date('2020-05-24T06:32:50.009Z'),
    pass: () => { },
    skip: () => { },
    fail: () => { },
    complete: () => { },
    errors: [{
            name: 'Error',
            message: '\u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoEqual\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // deep equality\u001b[22m\n\nExpected: \u001b[32m"bar"\u001b[39m\nReceived: \u001b[31m"foo"\u001b[39m',
            stack: 'Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoEqual\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // deep equality\u001b[22m\n\nExpected: \u001b[32m"bar"\u001b[39m\nReceived: \u001b[31m"foo"\u001b[39m\n    at World.<anonymous> (/Users/wimselles/Git/cucumberjs-json-demo/steps.js:17:19)'
        }],
    error: {
        name: 'Error',
        message: '\u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoEqual\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // deep equality\u001b[22m\n\nExpected: \u001b[32m"bar"\u001b[39m\nReceived: \u001b[31m"foo"\u001b[39m',
        stack: 'Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoEqual\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // deep equality\u001b[22m\n\nExpected: \u001b[32m"bar"\u001b[39m\nReceived: \u001b[31m"foo"\u001b[39m\n    at World.<anonymous> (/Users/wimselles/Git/cucumberjs-json-demo/steps.js:17:19)'
    }
};
exports.TEST_EMPTY_STATS = {
    title: '',
    type: '',
    start: new Date(),
    uid: '',
    parent: '',
    keyword: '',
    duration: 0,
    _duration: 0,
    cid: '',
    complete: () => { },
};
//# sourceMappingURL=mocks.js.map