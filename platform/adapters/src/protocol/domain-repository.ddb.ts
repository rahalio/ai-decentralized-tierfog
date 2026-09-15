/**
 * DomainRepository — in-memory sandbox implementation.
 */

import type { DomainRepository } from '@tierfog/services/protocol';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  createProtocolDomain,
  getProtocolDomain,
  listProtocolDomains,
} from '../_shared/product-sandbox-store.js';

export class DomainRepositoryDdb implements DomainRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listProtocolDomains(
    input: Parameters<DomainRepository['listProtocolDomains']>[0]
  ): Promise<Awaited<ReturnType<DomainRepository['listProtocolDomains']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listProtocolDomains({
      tierId: raw.tierId ? String(raw.tierId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async onboardProtocolDomain(
    input: Parameters<DomainRepository['onboardProtocolDomain']>[0]
  ): Promise<Awaited<ReturnType<DomainRepository['onboardProtocolDomain']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const domain = createProtocolDomain({
      id: raw.id ? String(raw.id) : sandboxId('prd'),
      protocolFamily: raw.protocolFamily ? String(raw.protocolFamily) : 'other',
      tierId: String(raw.tierId ?? sandboxId('tir')),
      gatewayConfigVersion: raw.gatewayConfigVersion
        ? String(raw.gatewayConfigVersion)
        : undefined,
      isolationChannelClass: raw.isolationChannelClass
        ? String(raw.isolationChannelClass)
        : undefined,
    });
    return {
      data: domain,
      ...responseMeta(correlationId),
    };
  }

  async getProtocolDomain(
    input: Parameters<DomainRepository['getProtocolDomain']>[0]
  ): Promise<Awaited<ReturnType<DomainRepository['getProtocolDomain']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const domainId = String(raw.domainId ?? raw.id ?? '');
    const domain = getProtocolDomain(domainId);
    if (!domain) return null as never;
    return {
      data: domain,
      ...responseMeta(correlationId),
    };
  }
}
