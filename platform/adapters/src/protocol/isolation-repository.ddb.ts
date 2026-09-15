/**
 * IsolationRepository — in-memory sandbox implementation.
 */

import type { IsolationRepository } from '@tierfog/services/protocol';
import { responseMeta } from '../_shared/sandbox-store.js';
import { updateIsolationPolicy } from '../_shared/product-sandbox-store.js';

export class IsolationRepositoryDdb implements IsolationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async updateIsolationPolicy(
    input: Parameters<IsolationRepository['updateIsolationPolicy']>[0]
  ): Promise<Awaited<ReturnType<IsolationRepository['updateIsolationPolicy']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const domainId = String(raw.domainId ?? raw.id ?? '');
    const policy = updateIsolationPolicy(domainId, {
      highThroughputWeight:
        raw.highThroughputWeight !== undefined
          ? Number(raw.highThroughputWeight)
          : undefined,
      lowPowerWeight:
        raw.lowPowerWeight !== undefined ? Number(raw.lowPowerWeight) : undefined,
      stormProtection:
        raw.stormProtection !== undefined ? Boolean(raw.stormProtection) : undefined,
    });
    if (!policy) return null as never;
    return {
      data: policy,
      ...responseMeta(correlationId),
    };
  }
}
