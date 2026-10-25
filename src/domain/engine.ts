export interface BenchmarkSample { caseId: string; passed: boolean; latencyMs: number; inputTokens: number; outputTokens: number; costUsd: number }
export interface BenchmarkSummary { cases: number; passRate: number; p50LatencyMs: number; p95LatencyMs: number; totalTokens: number; totalCostUsd: number }
function percentile(values: number[], p: number): number { const sorted=[...values].sort((a,b)=>a-b); return sorted[Math.max(0,Math.ceil(p*sorted.length)-1)] ?? 0; }
export function summarizeBenchmark(samples: readonly BenchmarkSample[]): BenchmarkSummary {
  if (samples.length===0) throw new RangeError("at least one sample is required");
  for (const sample of samples) if (![sample.latencyMs,sample.inputTokens,sample.outputTokens,sample.costUsd].every(Number.isFinite) || sample.latencyMs<0 || sample.inputTokens<0 || sample.outputTokens<0 || sample.costUsd<0) throw new TypeError("sample metrics must be finite and non-negative");
  const latency=samples.map(sample=>sample.latencyMs); const passed=samples.filter(sample=>sample.passed).length;
  return {cases:samples.length,passRate:passed/samples.length,p50LatencyMs:percentile(latency,0.5),p95LatencyMs:percentile(latency,0.95),totalTokens:samples.reduce((sum,sample)=>sum+sample.inputTokens+sample.outputTokens,0),totalCostUsd:samples.reduce((sum,sample)=>sum+sample.costUsd,0)};
}