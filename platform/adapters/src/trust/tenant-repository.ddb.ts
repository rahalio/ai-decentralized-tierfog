/**
 * TenantRepository — in-memory sandbox implementation.
 */

import type { TenantRepository } from '@tierfog/services/trust';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createTenantSphere, listTenantSpheres } from '../_shared/product-sandbox-store.js';

export class TenantRepositoryDdb implements TenantRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTenantSpheres(
    input: Parameters<TenantRepository['listTenantSpheres']>[0]
  ): Promise<Awaited<ReturnType<TenantRepository['listTenantSpheres']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listTenantSpheres();
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async createTenantSphere(
    input: Parameters<TenantRepository['createTenantSphere']>[0]
  ): Promise<Awaited<ReturnType<TenantRepository['createTenantSphere']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const sphere = createTenantSphere({
      id: raw.id ? String(raw.id) : sandboxId('tns'),
      name: String(raw.name ?? 'unnamed-tenant-sphere'),
      hostTierId: String(raw.hostTierId ?? sandboxId('tir')),
      cryptoIsolated:
        raw.cryptoIsolated !== undefined ? Boolean(raw.cryptoIsolated) : undefined,
    });
    return {
      data: sphere,
      ...responseMeta(correlationId),
    };
  }
}
