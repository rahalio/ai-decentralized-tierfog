/**
 * EligibilityRepository — in-memory sandbox implementation.
 */

import type { EligibilityRepository } from '@tierfog/services/fl';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  evaluateFlRoundEligibility,
  getFlRoundEligibility,
  listFlRoundEligibility,
} from '../_shared/product-sandbox-store.js';

export class EligibilityRepositoryDdb implements EligibilityRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFlRoundEligibility(
    input: Parameters<EligibilityRepository['listFlRoundEligibility']>[0]
  ): Promise<Awaited<ReturnType<EligibilityRepository['listFlRoundEligibility']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listFlRoundEligibility({
      roundId: raw.roundId ? String(raw.roundId) : undefined,
      tierId: raw.tierId ? String(raw.tierId) : undefined,
      status: raw.status ? String(raw.status) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async evaluateFlRoundEligibility(
    input: Parameters<EligibilityRepository['evaluateFlRoundEligibility']>[0]
  ): Promise<Awaited<ReturnType<EligibilityRepository['evaluateFlRoundEligibility']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const record = evaluateFlRoundEligibility({
      id: raw.id ? String(raw.id) : sandboxId('flr'),
      roundId: String(raw.roundId ?? sandboxId('rnd')),
      tierId: String(raw.tierId ?? sandboxId('tir')),
      healthScore: raw.healthScore !== undefined ? Number(raw.healthScore) : undefined,
    });
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }

  async getFlRoundEligibility(
    input: Parameters<EligibilityRepository['getFlRoundEligibility']>[0]
  ): Promise<Awaited<ReturnType<EligibilityRepository['getFlRoundEligibility']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const eligibilityId = String(raw.eligibilityId ?? raw.id ?? '');
    const record = getFlRoundEligibility(eligibilityId);
    if (!record) return null as never;
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }
}
