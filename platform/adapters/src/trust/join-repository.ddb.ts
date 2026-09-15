/**
 * JoinRepository — in-memory sandbox implementation.
 */

import type { JoinRepository } from '@tierfog/services/trust';
import { responseMeta } from '../_shared/sandbox-store.js';
import { approveSphereJoin } from '../_shared/product-sandbox-store.js';

export class JoinRepositoryDdb implements JoinRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async approveSphereJoin(
    input: Parameters<JoinRepository['approveSphereJoin']>[0]
  ): Promise<Awaited<ReturnType<JoinRepository['approveSphereJoin']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const sphereId = String(raw.sphereId ?? raw.id ?? '');
    const tierId = String(raw.tierId ?? '');
    const sphere = approveSphereJoin(sphereId, tierId);
    if (!sphere) return null as never;
    return {
      data: sphere,
      ...responseMeta(correlationId),
    };
  }
}
