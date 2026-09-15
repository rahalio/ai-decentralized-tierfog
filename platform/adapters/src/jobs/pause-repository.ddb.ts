/**
 * PauseRepository — in-memory sandbox implementation.
 */

import type { PauseRepository } from '@tierfog/services/jobs';
import { responseMeta } from '../_shared/sandbox-store.js';
import { pauseAnalyticsJob } from '../_shared/product-sandbox-store.js';

export class PauseRepositoryDdb implements PauseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async pauseAnalyticsJob(
    input: Parameters<PauseRepository['pauseAnalyticsJob']>[0]
  ): Promise<Awaited<ReturnType<PauseRepository['pauseAnalyticsJob']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const jobId = String(raw.jobId ?? raw.id ?? '');
    const job = pauseAnalyticsJob(jobId);
    if (!job) return null as never;
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }
}
