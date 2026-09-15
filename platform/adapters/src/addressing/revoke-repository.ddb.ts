/**
 * RevokeRepository — in-memory sandbox implementation.
 */

import type { RevokeRepository } from '@tierfog/services/addressing';
import { responseMeta } from '../_shared/sandbox-store.js';
import { revokeDataAddress } from '../_shared/product-sandbox-store.js';

export class RevokeRepositoryDdb implements RevokeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async revokeDataAddress(
    input: Parameters<RevokeRepository['revokeDataAddress']>[0]
  ): Promise<Awaited<ReturnType<RevokeRepository['revokeDataAddress']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const addressId = String(raw.addressId ?? raw.id ?? '');
    const address = revokeDataAddress(addressId);
    if (!address) return null as never;
    return {
      data: address,
      ...responseMeta(correlationId),
    };
  }
}
