import { HookStats, RunnerStats, SuiteStats, TestStats } from '@wdio/reporter';
import { Scenario } from '../../models';
export declare const EMPTY_FEATURE: {
    keyword: string;
    description: string;
    line: number;
    name: string;
    tags: string;
    elements: Scenario[];
    id: string;
};
export declare const EMPTY_SCENARIO: {
    keyword: string;
    description: string;
    name: string;
    tags: string;
    id: string;
    steps: any[];
};
export declare const SMALL_RUNNER_STATS: RunnerStats;
export declare const FULL_RUNNER_STATS: RunnerStats;
export declare const WDIO6_RUNNER_STATS: RunnerStats;
export declare const SUITE_FEATURE_STATS: SuiteStats;
export declare const STEP_TEST_ONSTART_STATS: TestStats;
export declare const STEP_TEST_ONSTART_ARGUMENT_STATS: TestStats;
export declare const STEP_HOOK_ONSTART_STATS: HookStats;
export declare const TEST_SCENARIO_STATS: HookStats;
export declare const TEST_SCENARIO_STATS_ERROR: TestStats;
export declare const TEST_EMPTY_STATS: HookStats;
//# sourceMappingURL=mocks.d.ts.map