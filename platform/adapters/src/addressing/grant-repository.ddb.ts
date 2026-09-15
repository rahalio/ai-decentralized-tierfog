/**
 * GrantRepository — in-memory sandbox implementation.
 */

import type { GrantRepository } from '@tierfog/services/addressing';
import { responseMeta } from '../_shared/sandbox-store.js';
import { grantDataAddressResolve } from '../_shared/product-sandbox-store.js';

export class GrantRepositoryDdb implements GrantRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async grantDataAddressResolve(
    input: Parameters<GrantRepository['grantDataAddressResolve']>[0]
  ): Promise<Awaited<ReturnType<GrantRepository['grantDataAddressResolve']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const addressId = String(raw.addressId ?? raw.id ?? '');
    const address = grantDataAddressResolve(
      addressId,
      raw.tierId ? String(raw.tierId) : undefined
    );
    if (!address) return null as never;
    return {
      data: address,
      ...responseMeta(correlationId),
    };
  }
}
