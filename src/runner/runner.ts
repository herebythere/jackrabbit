// brian taylor vann
// jackrabbit

// TODO:
// use performance.now() when nodejs is dead

import type {
  Assertions,
  Test,
  TestCollection,
  TestParams,
  TestRunResults,
} from "../results_store/results_store";

import { getResults } from "../results_store/results_store";
import {
  cancelRun,
  endTestCollection,
  endTestRun,
  startTestCollection,
  startTestRun,
} from "./relay_results/relay_results";
import { getStub, updateStub } from "./receipt/receipt";
import { runTestsAllAtOnce, runTestsInOrder } from "./run_tests/run_tests";

interface StartLtrTestCollectionRunParams {
  testCollection: TestCollection;
  startTime: number;
  stub: number;
}
type StartLtrTestCollectionRun = (
  params: StartLtrTestCollectionRunParams
) => Promise<void>;

interface StartLtrTestRunParams {
  testCollection: TestCollection;
}
type StartLtrTestRun = (
  params: StartLtrTestRunParams
) => Promise<TestRunResults | undefined>;

// create a test collection

const startLtrTestCollectionRun: StartLtrTestCollectionRun = async ({
  testCollection,
  startTime,
  stub,
}) => {
  startTestRun({ testCollection, startTime, stub });

  let collectionID = 0;
  for (const collection of testCollection) {
    if (stub < getStub()) {
      return;
    }

    const { tests, runTestsAsynchronously, timeoutInterval } = collection;
    const runParams = {
      collectionID,
      tests,
      startTime,
      timeoutInterval,
    };
    startTestCollection({
      collectionID,
      startTime,
    });

    if (runTestsAsynchronously) {
      await runTestsAllAtOnce(runParams);
    } else {
      await runTestsInOrder(runParams);
    }

    if (stub < getStub()) {
      return;
    }

    const endTime = Date.now();
    endTestCollection({
      collectionID,
      endTime,
    });

    collectionID += 1;
  }

  if (stub < getStub()) {
    return;
  }
  const endTime = Date.now();
  endTestRun({ endTime });
};

// iterate through tests synchronously
const runTests: StartLtrTestRun = async (params) => {
  const startTime = Date.now();
  const stub = updateStub();

  await startLtrTestCollectionRun({ ...params, ...{ startTime, stub } });
  if (stub < getStub()) {
    return;
  }

  return getResults();
};

export type { Assertions, Test, TestCollection, TestParams };
export { cancelRun, runTests };
