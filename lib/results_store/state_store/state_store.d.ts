import { TestRunResults } from "./state_types/state_types";
import { StartTestRunActionParams, StartTestCollectionActionParams, StartTestActionParams, EndTestActionParams, EndTestCollectionActionParams, EndTestRunActionParams } from "../action_types/actions_types";
declare type BuildResults = (params: StartTestRunActionParams) => void;
declare type StartTestCollection = (params: StartTestCollectionActionParams) => void;
declare type StartTest = (params: StartTestActionParams) => void;
declare type CancelRun = (params: EndTestRunActionParams) => void;
declare type EndTest = (params: EndTestActionParams) => void;
declare type EndTestCollection = (params: EndTestCollectionActionParams) => void;
declare type EndTestRun = (params: EndTestRunActionParams) => void;
declare type GetResults = () => TestRunResults;
declare const buildResults: BuildResults;
declare const startTestCollection: StartTestCollection;
declare const startTest: StartTest;
declare const cancelRun: CancelRun;
declare const endTest: EndTest;
declare const endTestCollection: EndTestCollection;
declare const endTestRun: EndTestRun;
declare const getResults: GetResults;
export { buildResults, startTestCollection, startTest, cancelRun, endTest, endTestCollection, endTestRun, getResults, };
