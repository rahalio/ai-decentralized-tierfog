/**
 * TierRepository — in-memory sandbox implementation.
 */

import type { TierRepository } from '@tierfog/services/tiers';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createTier, getTier, listTiers } from '../_shared/product-sandbox-store.js';

export class TierRepositoryDdb implements TierRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTiers(
    input: Parameters<TierRepository['listTiers']>[0]
  ): Promise<Awaited<ReturnType<TierRepository['listTiers']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listTiers({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      role: raw.role ? String(raw.role) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async registerTier(
    input: Parameters<TierRepository['registerTier']>[0]
  ): Promise<Awaited<ReturnType<TierRepository['registerTier']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const tier = createTier({
      id: raw.id ? String(raw.id) : sandboxId('tir'),
      siteId: String(raw.siteId ?? 'sit_demo'),
      role: String(raw.role ?? 'fog'),
      parentTierId: raw.parentTierId ? String(raw.parentTierId) : undefined,
    });
    return {
      data: tier,
      ...responseMeta(correlationId),
    };
  }

  async getTier(
    input: Parameters<TierRepository['getTier']>[0]
  ): Promise<Awaited<ReturnType<TierRepository['getTier']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const tierId = String(raw.tierId ?? raw.id ?? '');
    const tier = getTier(tierId);
    if (!tier) return null as never;
    return {
      data: tier,
      ...responseMeta(correlationId),
    };
  }
}
