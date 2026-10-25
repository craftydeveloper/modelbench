import { describe, expect, it } from "vitest";
import { summarizeBenchmark } from "../src/domain/engine.js";
describe("benchmark summaries", () => {
  it("reports percentile latency, pass rate, and spend", () => { const result=summarizeBenchmark([{caseId:"a",passed:true,latencyMs:10,inputTokens:3,outputTokens:2,costUsd:0.01},{caseId:"b",passed:false,latencyMs:100,inputTokens:4,outputTokens:6,costUsd:0.02}]); expect(result.passRate).toBe(0.5); expect(result.p95LatencyMs).toBe(100); expect(result.totalTokens).toBe(15); expect(result.totalCostUsd).toBeCloseTo(0.03); });
  it("rejects empty batches", () => { expect(()=>summarizeBenchmark([])).toThrow(RangeError); });
});