/**
 * QuarantineRepository — in-memory sandbox implementation.
 */

import type { QuarantineRepository } from '@tierfog/services/trust';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { listQuarantineEvents, quarantineTier } from '../_shared/product-sandbox-store.js';

export class QuarantineRepositoryDdb implements QuarantineRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listQuarantineEvents(
    input: Parameters<QuarantineRepository['listQuarantineEvents']>[0]
  ): Promise<Awaited<ReturnType<QuarantineRepository['listQuarantineEvents']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listQuarantineEvents({
      tierId: raw.tierId ? String(raw.tierId) : undefined,
      active: raw.active !== undefined ? Boolean(raw.active) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async quarantineTier(
    input: Parameters<QuarantineRepository['quarantineTier']>[0]
  ): Promise<Awaited<ReturnType<QuarantineRepository['quarantineTier']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const event = quarantineTier({
      id: raw.id ? String(raw.id) : sandboxId('qrn'),
      tierId: String(raw.tierId ?? sandboxId('tir')),
      reason: raw.reason ? String(raw.reason) : undefined,
      continueParentDag:
        raw.continueParentDag !== undefined ? Boolean(raw.continueParentDag) : undefined,
    });
    return {
      data: event,
      ...responseMeta(correlationId),
    };
  }
}
