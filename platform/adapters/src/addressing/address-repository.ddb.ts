/**
 * AddressRepository — in-memory sandbox implementation.
 */

import type { AddressRepository } from '@tierfog/services/addressing';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createDataAddress, listDataAddresses } from '../_shared/product-sandbox-store.js';

export class AddressRepositoryDdb implements AddressRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDataAddresses(
    input: Parameters<AddressRepository['listDataAddresses']>[0]
  ): Promise<Awaited<ReturnType<AddressRepository['listDataAddresses']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listDataAddresses({
      owningTierId: raw.owningTierId ? String(raw.owningTierId) : undefined,
      status: raw.status ? String(raw.status) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async registerDataAddress(
    input: Parameters<AddressRepository['registerDataAddress']>[0]
  ): Promise<Awaited<ReturnType<AddressRepository['registerDataAddress']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const address = createDataAddress({
      id: raw.id ? String(raw.id) : sandboxId('adr'),
      ref: String(raw.ref ?? `ref_${sandboxId('opaque')}`),
      owningTierId: String(raw.owningTierId ?? sandboxId('tir')),
    });
    return {
      data: address,
      ...responseMeta(correlationId),
    };
  }
}
