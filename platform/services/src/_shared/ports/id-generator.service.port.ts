/**
 * IdGeneratorService Port — Tierfog domain prefixes.
 */

import type { DomainCode } from '@tierfog/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  sitId(): string;
  tirId(): string;
  prdId(): string;
  jobId(): string;
  flrId(): string;
  adrId(): string;
  trsId(): string;
  prvId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
