"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const mocks_1 = require("./__mocks__/mocks");
const fs_extra_1 = require("fs-extra");
const metadata_1 = require("../metadata");
const reporter_1 = __importDefault(require("../reporter"));
const fileExists_1 = require("./fileExists");
describe('reporter', () => {
    let tmpReporter = null;
    beforeEach(() => {
        tmpReporter = new reporter_1.default({
            jsonFolder: '.tmp/json-folder/',
            language: 'en',
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
        mocks_1.EMPTY_FEATURE.elements = [];
        mocks_1.EMPTY_SCENARIO.steps = [];
        delete mocks_1.STEP_HOOK_ONSTART_STATS.keyword;
    });
    describe('on create', () => {
        it('should set the defaults  if no options are provided', () => {
            const noOptionsReporter = new reporter_1.default({});
            expect(noOptionsReporter.options).toMatchSnapshot();
        });
        it('should verify initial properties', () => {
            expect(tmpReporter.options).toMatchSnapshot();
            expect(tmpReporter.instanceMetadata).toBeNull();
            expect(tmpReporter.report).toMatchSnapshot();
        });
    });
    describe('onRunnerStart', () => {
        it('should set instance data if it is not available yet', () => {
            const metadata = { foo: 'bar' };
            const metadataClassObject = tmpReporter.metadataClassObject;
            const determineMetadataSpy = jest.spyOn(metadataClassObject, 'determineMetadata').mockReturnValue(metadata);
            expect(tmpReporter.instanceMetadata).toBeNull();
            tmpReporter.onRunnerStart({});
            expect(determineMetadataSpy).toHaveBeenCalled();
            expect(tmpReporter.instanceMetadata).toEqual(metadata);
        });
        it('should set not set instance data if it is already available', () => {
            const metadata = { foo: 'bar' };
            const determineMetadataSpy = jest.spyOn(new metadata_1.Metadata(), 'determineMetadata').mockReturnValue(metadata);
            tmpReporter.instanceMetadata = metadata;
            expect(tmpReporter.instanceMetadata).toEqual(metadata);
            tmpReporter.onRunnerStart({});
            expect(determineMetadataSpy).not.toHaveBeenCalled();
        });
    });
    describe('onSuiteStart', () => {
        it('should add the CucumberJS feature object if it is not available', () => {
            const featureData = { keyword: 'feature' };
            const getFeatureDataObjectSpy = jest.spyOn(tmpReporter, 'getFeatureDataObject').mockReturnValue(featureData);
            expect(tmpReporter.report).toMatchSnapshot();
            tmpReporter.onSuiteStart({});
            expect(getFeatureDataObjectSpy).toHaveBeenCalled();
            expect(tmpReporter.report).toMatchSnapshot();
        });
        it('should add instance data to the feature if the feature is already there', () => {
            const metadata = { foo: 'bar' };
            const featureData = { keyword: 'feature' };
            const getFeatureDataObjectSpy = jest.spyOn(tmpReporter, 'getFeatureDataObject').mockReturnValue(featureData);
            jest.spyOn(tmpReporter, 'getScenarioDataObject').mockReturnValue(mocks_1.EMPTY_SCENARIO);
            expect(tmpReporter.report).toMatchSnapshot();
            tmpReporter.instanceMetadata = metadata;
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            tmpReporter.onSuiteStart({});
            expect(getFeatureDataObjectSpy).not.toHaveBeenCalled();
            expect(tmpReporter.report).toMatchSnapshot();
        });
        it('should add a scenario to the feature if the feature is already there', () => {
            const getFeatureDataObjectSpy = jest.spyOn(tmpReporter, 'getFeatureDataObject');
            const getScenarioDataObjectSpy = jest.spyOn(tmpReporter, 'getScenarioDataObject').mockReturnValue(mocks_1.EMPTY_SCENARIO);
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            expect(tmpReporter.report.feature.elements.length).toEqual(0);
            tmpReporter.onSuiteStart({});
            expect(getFeatureDataObjectSpy).not.toHaveBeenCalled();
            expect(getScenarioDataObjectSpy).toHaveBeenCalledWith({}, mocks_1.EMPTY_FEATURE.id);
            expect(tmpReporter.report.feature.elements).toMatchSnapshot();
        });
    });
    describe('onHookStart', () => {
        it('should call `addStepData` to add a pending before step', () => {
            const getCurrentScenarioSpy = jest.spyOn(tmpReporter, 'getCurrentScenario').mockReturnValue(mocks_1.EMPTY_SCENARIO);
            const containsStepsSpy = jest.spyOn(tmpReporter.utilsObject, 'containsSteps').mockReturnValue(false);
            const addStepDataSpy = jest.spyOn(tmpReporter, 'addStepData').mockReturnValue();
            tmpReporter.onHookStart({});
            expect(getCurrentScenarioSpy).toHaveBeenCalledTimes(1);
            expect(containsStepsSpy).toHaveBeenCalledTimes(1);
            expect(addStepDataSpy).toHaveBeenCalledWith({ state: constants_1.PASSED, keyword: constants_1.BEFORE });
        });
        it('should call `addStepData` to add a pending after step', () => {
            const getCurrentScenarioSpy = jest.spyOn(tmpReporter, 'getCurrentScenario').mockReturnValue(mocks_1.EMPTY_SCENARIO);
            const containsStepsSpy = jest.spyOn(tmpReporter.utilsObject, 'containsSteps').mockReturnValue(true);
            const addStepDataSpy = jest.spyOn(tmpReporter, 'addStepData').mockReturnValue();
            tmpReporter.onHookStart({});
            expect(getCurrentScenarioSpy).toHaveBeenCalledTimes(1);
            expect(containsStepsSpy).toHaveBeenCalledTimes(1);
            expect(addStepDataSpy).toHaveBeenCalledWith({ state: constants_1.PASSED, keyword: constants_1.AFTER });
        });
    });
    describe('onHookEnd', () => {
        it('should call update a hook step to passed', () => {
            const updateStepStatusSpy = jest.spyOn(tmpReporter, 'updateStepStatus').mockReturnValue();
            tmpReporter.onHookEnd({});
            expect(updateStepStatusSpy).toHaveBeenCalledWith({ state: constants_1.PASSED });
        });
        it('should call update a hook step to the current state when there is an error', () => {
            const updateStepStatusSpy = jest.spyOn(tmpReporter, 'updateStepStatus').mockReturnValue();
            tmpReporter.onHookEnd({ state: constants_1.FAILED, error: {} });
            expect(updateStepStatusSpy).toHaveBeenCalledWith({ state: constants_1.FAILED, error: {} });
        });
    });
    describe('onTestStart', () => {
        it('should call `addStepDataSpy` to add a step when a test is started', () => {
            const addStepDataSpy = jest.spyOn(tmpReporter, 'addStepData').mockReturnValue();
            tmpReporter.onTestStart({ foo: 'bar' });
            expect(addStepDataSpy).toHaveBeenCalledWith({ foo: 'bar' });
        });
    });
    describe('onTestPass', () => {
        it('should call update a step', () => {
            const updateStepStatusSpy = jest.spyOn(tmpReporter, 'updateStepStatus').mockReturnValue();
            tmpReporter.onTestPass({ foo: true });
            expect(updateStepStatusSpy).toHaveBeenCalledWith({ foo: true });
        });
    });
    describe('onTestFail', () => {
        it('should call update a step', () => {
            const updateStepStatusSpy = jest.spyOn(tmpReporter, 'updateStepStatus').mockReturnValue();
            tmpReporter.onTestFail({ bar: true });
            expect(updateStepStatusSpy).toHaveBeenCalledWith({ bar: true });
        });
    });
    describe('onTestSkip', () => {
        it('should call update a step', () => {
            const updateStepStatusSpy = jest.spyOn(tmpReporter, 'updateStepStatus').mockReturnValue();
            tmpReporter.onTestSkip({ bar: false });
            expect(updateStepStatusSpy).toHaveBeenCalledWith({ bar: false });
        });
    });
    describe('onRunnerEnd', () => {
        it('should store the json file on the file system', () => {
            const jsonFolder = './.tmp/ut-folder';
            tmpReporter.report.feature = { id: 'this-feature' };
            tmpReporter.options.jsonFolder = jsonFolder;
            expect(fileExists_1.fileExists(jsonFolder)).toEqual(false);
            tmpReporter.onRunnerEnd();
            const files = fs_extra_1.readdirSync(jsonFolder);
            expect(files.length).toEqual(1);
            expect(files[0].includes(tmpReporter.report.feature.id)).toEqual(true);
            expect(fileExists_1.fileExists(jsonFolder)).toEqual(true);
            fs_extra_1.removeSync(jsonFolder);
        });
        it('should be able to add json to an existing json output', () => {
            const jsonFolder = './.tmp/ut-folder';
            const jsonFile = `${jsonFolder}/this-feature.json`;
            fs_extra_1.copySync('lib/tests/__mocks__/mock.json', jsonFile);
            tmpReporter.report.feature = { id: 'this-feature' };
            tmpReporter.options.jsonFolder = jsonFolder;
            expect(fs_extra_1.readJsonSync(jsonFile).length).toEqual(1);
            tmpReporter.onRunnerEnd();
            const files = fs_extra_1.readdirSync(jsonFolder);
            expect(files.length).toEqual(1);
            expect(fs_extra_1.readJsonSync(jsonFile).length).toEqual(2);
            fs_extra_1.removeSync(jsonFolder);
        });
    });
    describe('getFeatureDataObject', () => {
        it('should be able to to create a feature JSON data object', () => {
            expect(tmpReporter.getFeatureDataObject(mocks_1.SUITE_FEATURE_STATS)).toMatchSnapshot();
        });
    });
    describe('getScenarioDataObject', () => {
        it('should be able to to create a scenario JSON data object', () => {
            expect(tmpReporter.getScenarioDataObject(mocks_1.SUITE_FEATURE_STATS, 'create-passed-feature')).toMatchSnapshot();
        });
    });
    describe('getStepDataObject', () => {
        let getFailedMessageSpy;
        beforeEach(() => {
            getFailedMessageSpy = jest.spyOn(tmpReporter.utilsObject, 'getFailedMessage').mockReturnValue({});
        });
        it('should be able to to create a step JSON data object', () => {
            expect(tmpReporter.getStepDataObject(mocks_1.STEP_TEST_ONSTART_STATS)).toMatchSnapshot();
            expect(getFailedMessageSpy).toHaveBeenCalledTimes(1);
        });
        it('should be able to add arguments to the step if they are present', () => {
            expect(tmpReporter.getStepDataObject(mocks_1.STEP_TEST_ONSTART_ARGUMENT_STATS)).toMatchSnapshot();
            expect(getFailedMessageSpy).toHaveBeenCalledTimes(1);
        });
        it('should be able to to create a step JSON data object based on a hook', () => {
            mocks_1.STEP_HOOK_ONSTART_STATS.keyword = constants_1.BEFORE;
            expect(tmpReporter.getStepDataObject(mocks_1.STEP_HOOK_ONSTART_STATS)).toMatchSnapshot();
            expect(getFailedMessageSpy).toHaveBeenCalledTimes(1);
        });
        it('should be able to to create a step JSON data object based on malformed data', () => {
            expect(tmpReporter.getStepDataObject(mocks_1.TEST_EMPTY_STATS)).toMatchSnapshot();
            expect(getFailedMessageSpy).toHaveBeenCalled();
        });
    });
    describe('getCurrentScenario', () => {
        it('should return the last number of the scenario array as the current running scenario number', () => {
            tmpReporter.report.feature = {
                elements: [{ foo: 'first-scenario' }, { bar: 'second-scenario' }, { foobar: 'current-scenario' }],
            };
            expect(tmpReporter.getCurrentScenario()).toEqual({ foobar: 'current-scenario' });
        });
    });
    describe('getCurrentStep', () => {
        it('should return current running step', () => {
            const currentScenarioMock = {
                steps: [
                    { foo: 'first-step' },
                    { foo: 'second-step' },
                    { foo: 'current-step' },
                ],
            };
            const getCurrentScenarioSpy = jest.spyOn(tmpReporter, 'getCurrentScenario').mockReturnValue(currentScenarioMock);
            expect(tmpReporter.getCurrentStep()).toEqual(currentScenarioMock.steps[2]);
            expect(getCurrentScenarioSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('addStepData', () => {
        it('should add step data to a current scenario', () => {
            const getCurrentScenarioSpy = jest.spyOn(tmpReporter, 'getCurrentScenario');
            const getStepDataObjectSpy = jest.spyOn(tmpReporter, 'getStepDataObject').mockReturnValue({ foo: 'current-step' });
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            tmpReporter.report.feature.elements.push(mocks_1.EMPTY_SCENARIO);
            expect(tmpReporter.report.feature.elements[0].steps.length).toEqual(0);
            tmpReporter.addStepData({});
            expect(tmpReporter.report.feature.elements[0].steps.length).toEqual(1);
            expect(tmpReporter.report.feature.elements[0].steps).toMatchSnapshot();
            expect(getCurrentScenarioSpy).toHaveBeenCalledTimes(1);
            expect(getStepDataObjectSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('updateStepStatus', () => {
        it('should update step data of the current scenario step', () => {
            const pendingStep = { foo: 'current-step', status: constants_1.PENDING };
            const updatedStep = { foo: 'current-step', status: constants_1.PASSED, bar: false };
            const getCurrentScenarioSpy = jest.spyOn(tmpReporter, 'getCurrentScenario');
            const getStepDataObjectSpy = jest.spyOn(tmpReporter, 'getStepDataObject').mockReturnValue(updatedStep);
            const getCurrentStepSpy = jest.spyOn(tmpReporter, 'getCurrentStep').mockReturnValue({ foo: 'current-step' });
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            tmpReporter.report.feature.elements.push(mocks_1.EMPTY_SCENARIO);
            tmpReporter.report.feature.elements[0].steps.push(pendingStep);
            expect(tmpReporter.report.feature.elements[0].steps).toMatchSnapshot();
            expect(tmpReporter.report.feature.elements[0].steps.length).toEqual(1);
            tmpReporter.updateStepStatus({});
            expect(tmpReporter.report.feature.elements[0].steps).toMatchSnapshot();
            expect(tmpReporter.report.feature.elements[0].steps.length).toEqual(1);
            expect(getCurrentScenarioSpy).toHaveBeenCalledTimes(1);
            expect(getStepDataObjectSpy).toHaveBeenCalledTimes(1);
            expect(getCurrentStepSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('attach', () => {
        let mockStdout;
        beforeAll(() => {
            mockStdout = jest.spyOn(process, 'emit').mockImplementation();
        });
        afterEach(() => {
            mockStdout.mockClear();
        });
        it('should be able to attach default data', () => {
            reporter_1.default.attach('foo');
            expect(mockStdout).toHaveBeenCalledTimes(1);
            expect(mockStdout).toHaveBeenCalledWith('wdioCucumberJsReporter:attachment', {
                data: 'foo',
                type: constants_1.TEXT_PLAIN
            });
        });
        it('should be able to attach with all data', () => {
            reporter_1.default.attach('foo', 'type/string');
            expect(mockStdout).toHaveBeenCalledTimes(1);
            expect(mockStdout).toHaveBeenCalledWith('wdioCucumberJsReporter:attachment', {
                data: 'foo',
                type: 'type/string'
            });
        });
    });
    describe('cucumberJsAttachment', () => {
        it('should be able to add embeddings to a current step when they have not been added', () => {
            const pendingStep = { foo: 'current-step', status: constants_1.PENDING };
            const getCurrentStepSpy = jest.spyOn(tmpReporter, 'getCurrentStep').mockReturnValue(pendingStep);
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            tmpReporter.report.feature.elements.push(mocks_1.EMPTY_SCENARIO);
            tmpReporter.report.feature.elements[0].steps.push(pendingStep);
            expect(tmpReporter.report.feature.elements[0].steps[0]).toMatchSnapshot();
            tmpReporter.cucumberJsAttachment({ data: 'data', type: 'mime_type' });
            expect(tmpReporter.report.feature.elements[0].steps[0]).toMatchSnapshot();
            expect(getCurrentStepSpy).toHaveBeenCalledTimes(1);
        });
        it('should be able to add embeddings to a current step which already has embeddings', () => {
            const pendingStep = {
                foo: 'current-step',
                status: constants_1.PENDING,
                embeddings: [{ data: 'data-1', mime_type: 'mime_type-1' }]
            };
            const getCurrentStepSpy = jest.spyOn(tmpReporter, 'getCurrentStep').mockReturnValue(pendingStep);
            tmpReporter.report.feature = mocks_1.EMPTY_FEATURE;
            tmpReporter.report.feature.elements.push(mocks_1.EMPTY_SCENARIO);
            tmpReporter.report.feature.elements[0].steps.push(pendingStep);
            expect(tmpReporter.report.feature.elements[0].steps[0]).toMatchSnapshot();
            tmpReporter.cucumberJsAttachment({ data: 'data-2', type: 'mime_type-2' });
            expect(tmpReporter.report.feature.elements[0].steps[0]).toMatchSnapshot();
            expect(getCurrentStepSpy).toHaveBeenCalledTimes(1);
        });
    });
});
//# sourceMappingURL=reporter.spec.js.map