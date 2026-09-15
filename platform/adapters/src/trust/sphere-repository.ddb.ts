/**
 * SphereRepository — in-memory sandbox implementation.
 */

import type { SphereRepository } from '@tierfog/services/trust';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createTrustSphere, listTrustSpheres } from '../_shared/product-sandbox-store.js';

export class SphereRepositoryDdb implements SphereRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTrustSpheres(
    input: Parameters<SphereRepository['listTrustSpheres']>[0]
  ): Promise<Awaited<ReturnType<SphereRepository['listTrustSpheres']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listTrustSpheres();
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async createTrustSphere(
    input: Parameters<SphereRepository['createTrustSphere']>[0]
  ): Promise<Awaited<ReturnType<SphereRepository['createTrustSphere']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const sphere = createTrustSphere({
      id: raw.id ? String(raw.id) : sandboxId('trs'),
      name: String(raw.name ?? 'unnamed-sphere'),
      memberTierIds: Array.isArray(raw.memberTierIds)
        ? (raw.memberTierIds as string[]).map(String)
        : undefined,
    });
    return {
      data: sphere,
      ...responseMeta(correlationId),
    };
  }
}
