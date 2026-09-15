/**
 * ReleaseRepository — in-memory sandbox implementation.
 */

import type { ReleaseRepository } from '@tierfog/services/trust';
import { responseMeta } from '../_shared/sandbox-store.js';
import { releaseQuarantine } from '../_shared/product-sandbox-store.js';

export class ReleaseRepositoryDdb implements ReleaseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async releaseQuarantine(
    input: Parameters<ReleaseRepository['releaseQuarantine']>[0]
  ): Promise<Awaited<ReturnType<ReleaseRepository['releaseQuarantine']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const eventId = String(raw.eventId ?? raw.id ?? '');
    const event = releaseQuarantine(eventId);
    if (!event) return null as never;
    return {
      data: event,
      ...responseMeta(correlationId),
    };
  }
}
