/**
 * GatewayConfigRepository — in-memory sandbox implementation.
 */

import type { GatewayConfigRepository } from '@tierfog/services/protocol';
import { responseMeta } from '../_shared/sandbox-store.js';
import { pushGatewayConfig } from '../_shared/product-sandbox-store.js';

export class GatewayConfigRepositoryDdb implements GatewayConfigRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async pushGatewayConfig(
    input: Parameters<GatewayConfigRepository['pushGatewayConfig']>[0]
  ): Promise<Awaited<ReturnType<GatewayConfigRepository['pushGatewayConfig']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const domainId = String(raw.domainId ?? '');
    const domain = pushGatewayConfig(
      domainId,
      raw.configVersion ? String(raw.configVersion) : undefined
    );
    if (!domain) return null as never;
    return {
      data: domain,
      ...responseMeta(correlationId),
    };
  }
}
