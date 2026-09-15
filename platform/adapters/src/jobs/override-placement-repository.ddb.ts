/**
 * OverridePlacementRepository — in-memory sandbox implementation.
 */

import type { OverridePlacementRepository } from '@tierfog/services/jobs';
import { responseMeta } from '../_shared/sandbox-store.js';
import { overrideJobPlacement } from '../_shared/product-sandbox-store.js';

export class OverridePlacementRepositoryDdb implements OverridePlacementRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async overrideJobPlacement(
    input: Parameters<OverridePlacementRepository['overrideJobPlacement']>[0]
  ): Promise<Awaited<ReturnType<OverridePlacementRepository['overrideJobPlacement']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const jobId = String(raw.jobId ?? raw.id ?? '');
    const job = overrideJobPlacement(
      jobId,
      raw.executionTierId ? String(raw.executionTierId) : undefined,
      raw.reason ? String(raw.reason) : undefined
    );
    if (!job) return null as never;
    return {
      data: job,
      ...responseMeta(correlationId),
    };
  }
}
