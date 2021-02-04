import { CucumberJsAttachment, Feature, MetadataObject, Report, Scenario, Step } from './models';
import WDIOReporter, { HookStats, RunnerStats, SuiteStats, TestStats, WDIOReporterOptions } from '@wdio/reporter';
import { Metadata } from './metadata';
import Utils from './utils';
export declare class CucumberJsJsonReporter extends WDIOReporter {
    options: Partial<WDIOReporterOptions>;
    reporterName: string;
    instanceMetadata: MetadataObject;
    report: Report;
    metadataClassObject: Metadata;
    utilsObject: Utils;
    constructor(options: Partial<WDIOReporterOptions>);
    static attach(data: string, type?: string): void;
    registerListeners(): void;
    onRunnerStart(runnerData: RunnerStats): void;
    onSuiteStart(payload: SuiteStats): void;
    onHookStart(payload: HookStats): void;
    onHookEnd(payload: HookStats): void;
    onTestStart(payload: TestStats): void;
    onTestPass(payload: TestStats): void;
    onTestFail(payload: TestStats): void;
    onTestSkip(payload: TestStats): void;
    onRunnerEnd(): void;
    getFeatureDataObject(featureData: SuiteStats): Feature;
    getScenarioDataObject(scenarioData: SuiteStats, id: string): Scenario;
    getStepDataObject(stepData: TestStats | HookStats): Step;
    getCurrentScenario(): Scenario;
    getCurrentStep(): Step;
    addStepData(test: TestStats | HookStats): void;
    updateStepStatus(test: TestStats | HookStats): void;
    cucumberJsAttachment(attachment: CucumberJsAttachment): void;
}
export default CucumberJsJsonReporter;
//# sourceMappingURL=reporter.d.ts.map