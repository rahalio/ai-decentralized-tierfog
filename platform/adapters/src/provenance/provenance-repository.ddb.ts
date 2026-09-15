/**
 * ProvenanceRepository — in-memory sandbox implementation.
 */

import type { ProvenanceRepository } from '@tierfog/services/provenance';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  getArtefactProvenance,
  listArtefactProvenance,
  sealArtefactProvenance,
} from '../_shared/product-sandbox-store.js';

export class ProvenanceRepositoryDdb implements ProvenanceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listArtefactProvenance(
    input: Parameters<ProvenanceRepository['listArtefactProvenance']>[0]
  ): Promise<Awaited<ReturnType<ProvenanceRepository['listArtefactProvenance']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listArtefactProvenance({
      tierId: raw.tierId ? String(raw.tierId) : undefined,
      jobId: raw.jobId ? String(raw.jobId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async sealArtefactProvenance(
    input: Parameters<ProvenanceRepository['sealArtefactProvenance']>[0]
  ): Promise<Awaited<ReturnType<ProvenanceRepository['sealArtefactProvenance']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const record = sealArtefactProvenance({
      id: raw.id ? String(raw.id) : sandboxId('prv'),
      artefactHash: raw.artefactHash ? String(raw.artefactHash) : undefined,
      tierId: raw.tierId ? String(raw.tierId) : undefined,
      jobId: raw.jobId ? String(raw.jobId) : undefined,
      tierPath: Array.isArray(raw.tierPath)
        ? (raw.tierPath as string[]).map(String)
        : undefined,
    });
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }

  async getArtefactProvenance(
    input: Parameters<ProvenanceRepository['getArtefactProvenance']>[0]
  ): Promise<Awaited<ReturnType<ProvenanceRepository['getArtefactProvenance']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const provenanceId = String(raw.provenanceId ?? raw.id ?? '');
    const record = getArtefactProvenance(provenanceId);
    if (!record) return null as never;
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }
}
