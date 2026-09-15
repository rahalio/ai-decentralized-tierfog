/**
 * JobRepository — in-memory sandbox implementation.
 */

import type { JobRepository } from '@tierfog/services/jobs';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  createAnalyticsJob,
  getAnalyticsJob,
  listAnalyticsJobs,
} from '../_shared/product-sandbox-store.js';

export class JobRepositoryDdb implements JobRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAnalyticsJobs(
    input: Parameters<JobRepository['listAnalyticsJobs']>[0]
  ): Promise<Awaited<ReturnType<JobRepository['listAnalyticsJobs']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listAnalyticsJobs({
      status: raw.status ? String(raw.status) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async scheduleAnalyticsJob(
    input: Parameters<JobRepository['scheduleAnalyticsJob']>[0]
  ): Promise<Awaited<ReturnType<JobRepository['scheduleAnalyticsJob']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const job = createAnalyticsJob({
      id: raw.id ? String(raw.id) : sandboxId('job'),
      preferredMaxTierRole: raw.preferredMaxTierRole
        ? String(raw.preferredMaxTierRole)
        : 'fog',
      flRoundId: raw.flRoundId ? String(raw.flRoundId) : undefined,
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      executionTierId: raw.executionTierId ? String(raw.executionTierId) : undefined,
    });
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }

  async getAnalyticsJob(
    input: Parameters<JobRepository['getAnalyticsJob']>[0]
  ): Promise<Awaited<ReturnType<JobRepository['getAnalyticsJob']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const jobId = String(raw.jobId ?? raw.id ?? '');
    const job = getAnalyticsJob(jobId);
    if (!job) return null as never;
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }
}
