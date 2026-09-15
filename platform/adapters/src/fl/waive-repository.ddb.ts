/**
 * WaiveRepository — in-memory sandbox implementation.
 */

import type { WaiveRepository } from '@tierfog/services/fl';
import { responseMeta } from '../_shared/sandbox-store.js';
import { waiveFlHealthGate } from '../_shared/product-sandbox-store.js';

export class WaiveRepositoryDdb implements WaiveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async waiveFlHealthGate(
    input: Parameters<WaiveRepository['waiveFlHealthGate']>[0]
  ): Promise<Awaited<ReturnType<WaiveRepository['waiveFlHealthGate']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const eligibilityId = String(raw.eligibilityId ?? raw.id ?? '');
    const record = waiveFlHealthGate(
      eligibilityId,
      raw.waiverNote ? String(raw.waiverNote) : undefined
    );
    if (!record) return null as never;
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }
}
