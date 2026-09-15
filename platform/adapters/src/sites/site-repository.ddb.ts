/**
 * SiteRepository — in-memory sandbox implementation.
 */

import type { SiteRepository } from '@tierfog/services/sites';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  createSite,
  getSite,
  listSites,
  updateSite,
} from '../_shared/product-sandbox-store.js';

export class SiteRepositoryDdb implements SiteRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSites(
    input: Parameters<SiteRepository['listSites']>[0]
  ): Promise<Awaited<ReturnType<SiteRepository['listSites']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listSites({
      siteClass: raw.siteClass ? String(raw.siteClass) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async registerSite(
    input: Parameters<SiteRepository['registerSite']>[0]
  ): Promise<Awaited<ReturnType<SiteRepository['registerSite']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const site = createSite({
      id: raw.id ? String(raw.id) : sandboxId('sit'),
      name: String(raw.name ?? 'unnamed-site'),
      siteClass: String(raw.siteClass ?? 'other'),
      estimatedGbPerDay:
        raw.estimatedGbPerDay !== undefined ? Number(raw.estimatedGbPerDay) : undefined,
    });
    return {
      data: site,
      ...responseMeta(correlationId),
    };
  }

  async getSite(
    input: Parameters<SiteRepository['getSite']>[0]
  ): Promise<Awaited<ReturnType<SiteRepository['getSite']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const siteId = String(raw.siteId ?? raw.id ?? '');
    const site = getSite(siteId);
    if (!site) return null as never;
    return {
      data: site,
      ...responseMeta(correlationId),
    };
  }

  async updateSite(
    input: Parameters<SiteRepository['updateSite']>[0]
  ): Promise<Awaited<ReturnType<SiteRepository['updateSite']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const siteId = String(raw.siteId ?? raw.id ?? '');
    const site = updateSite(siteId, {
      name: raw.name ? String(raw.name) : undefined,
      siteClass: raw.siteClass ? String(raw.siteClass) : undefined,
      estimatedGbPerDay:
        raw.estimatedGbPerDay !== undefined ? Number(raw.estimatedGbPerDay) : undefined,
    });
    if (!site) return null as never;
    return {
      data: site,
      ...responseMeta(correlationId),
    };
  }
}
