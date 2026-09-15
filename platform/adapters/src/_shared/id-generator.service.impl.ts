/**
 * ID Generator Service Implementation — Tierfog prefixes.
 */

import type { DomainCode } from '@tierfog/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@tierfog/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@tierfog/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  sitId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.sites);
  }
  tirId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tiers);
  }
  prdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.protocol);
  }
  jobId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.jobs);
  }
  flrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.fl);
  }
  adrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.addressing);
  }
  trsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.trust);
  }
  prvId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.provenance);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
