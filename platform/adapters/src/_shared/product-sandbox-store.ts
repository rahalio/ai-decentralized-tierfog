/**
 * Process-wide in-memory store for local / sandbox Tierfog product-domain flows.
 * Used by sites, tiers, protocol, jobs, fl, addressing, trust, provenance adapters.
 */

import { nowIso, sandboxId } from './sandbox-store.js';

export type SiteClass = 'hospital' | 'factory' | 'vehicle' | 'building' | 'other' | string;
export type TierRole = 'device' | 'fog' | 'edge' | 'cloud' | string;
export type TierStatus = 'active' | 'quarantined' | string;
export type ProtocolFamily =
  | 'mqtt_coap'
  | 'rpl_6lowpan'
  | 'bt_mesh'
  | 'v2x'
  | 'http_rich'
  | 'other'
  | string;
export type ProtocolDomainStatus = 'pending' | 'healthy' | 'degraded' | 'failed' | string;
export type ChannelClass = 'high_throughput' | 'low_power_mesh' | string;
export type JobStatus = 'scheduled' | 'running' | 'completed' | 'failed' | 'paused' | string;
export type FlEligibilityStatus = 'eligible' | 'denied' | 'waived' | string;
export type FlDenyReason = 'mesh_loss' | 'quarantine' | 'unhealthy' | 'other' | string;
export type DataAddressStatus = 'active' | 'revoked' | 'blocked' | string;

export interface SandboxSite {
  id: string;
  name: string;
  siteClass: SiteClass;
  estimatedGbPerDay?: number;
  backhaulBytesAvoided?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxTierNode {
  id: string;
  siteId: string;
  role: TierRole;
  parentTierId?: string;
  status: TierStatus;
  healthScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxIsolationPolicy {
  domainId: string;
  highThroughputWeight: number;
  lowPowerWeight: number;
  stormProtection: boolean;
}

export interface SandboxProtocolDomain {
  id: string;
  protocolFamily: ProtocolFamily;
  tierId: string;
  gatewayConfigVersion?: string;
  status: ProtocolDomainStatus;
  isolationChannelClass?: ChannelClass;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxAnalyticsJob {
  id: string;
  status: JobStatus;
  executionTierId: string;
  preferredMaxTierRole?: TierRole;
  inPlace: boolean;
  backhaulBytesAvoided?: number;
  flRoundId?: string;
  siteId?: string;
  overrideReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxFlRoundEligibility {
  id: string;
  roundId: string;
  tierId: string;
  status: FlEligibilityStatus;
  denyReason?: FlDenyReason;
  healthScore?: number;
  waiverNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxDataAddress {
  id: string;
  ref: string;
  owningTierId: string;
  status: DataAddressStatus;
  grantedTierIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SandboxTrustSphere {
  id: string;
  name: string;
  memberTierIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SandboxQuarantineEvent {
  id: string;
  tierId: string;
  active: boolean;
  reason: string;
  continueParentDag: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxTenantSphere {
  id: string;
  name: string;
  hostTierId: string;
  cryptoIsolated?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxArtefactProvenance {
  id: string;
  artefactHash: string;
  tierId: string;
  jobId?: string;
  tierPath?: string[];
  sealedAt: string;
  createdAt: string;
  updatedAt: string;
}

type ProductSandboxState = {
  sitesById: Map<string, SandboxSite>;
  tiersById: Map<string, SandboxTierNode>;
  domainsById: Map<string, SandboxProtocolDomain>;
  isolationByDomainId: Map<string, SandboxIsolationPolicy>;
  jobsById: Map<string, SandboxAnalyticsJob>;
  flEligibilityById: Map<string, SandboxFlRoundEligibility>;
  addressesById: Map<string, SandboxDataAddress>;
  trustSpheresById: Map<string, SandboxTrustSphere>;
  quarantineById: Map<string, SandboxQuarantineEvent>;
  tenantSpheresById: Map<string, SandboxTenantSphere>;
  provenanceById: Map<string, SandboxArtefactProvenance>;
  seeded: boolean;
};

const GLOBAL_KEY = '__tierfog_product_sandbox__';

function state(): ProductSandboxState {
  const g = globalThis as typeof globalThis & { [GLOBAL_KEY]?: ProductSandboxState };
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = {
      sitesById: new Map(),
      tiersById: new Map(),
      domainsById: new Map(),
      isolationByDomainId: new Map(),
      jobsById: new Map(),
      flEligibilityById: new Map(),
      addressesById: new Map(),
      trustSpheresById: new Map(),
      quarantineById: new Map(),
      tenantSpheresById: new Map(),
      provenanceById: new Map(),
      seeded: false,
    };
  }
  return g[GLOBAL_KEY]!;
}

export function ensureProductSandboxSeeded(): void {
  if (state().seeded) return;
  state().seeded = true;
}

// —— Sites ——

export function listSites(filter?: { siteClass?: string }): SandboxSite[] {
  ensureProductSandboxSeeded();
  let items = [...state().sitesById.values()];
  if (filter?.siteClass) {
    items = items.filter((s) => s.siteClass === filter.siteClass);
  }
  return items;
}

export function getSite(id: string): SandboxSite | undefined {
  ensureProductSandboxSeeded();
  return state().sitesById.get(id);
}

export function createSite(input: {
  id?: string;
  name: string;
  siteClass: SiteClass;
  estimatedGbPerDay?: number;
}): SandboxSite {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const site: SandboxSite = {
    id: input.id ?? sandboxId('sit'),
    name: input.name,
    siteClass: input.siteClass,
    estimatedGbPerDay: input.estimatedGbPerDay,
    backhaulBytesAvoided: 0,
    createdAt: now,
    updatedAt: now,
  };
  state().sitesById.set(site.id, site);
  return site;
}

export function updateSite(
  id: string,
  patch: {
    name?: string;
    siteClass?: SiteClass;
    estimatedGbPerDay?: number;
  }
): SandboxSite | undefined {
  ensureProductSandboxSeeded();
  const existing = state().sitesById.get(id);
  if (!existing) return undefined;
  const updated: SandboxSite = {
    ...existing,
    name: patch.name ?? existing.name,
    siteClass: patch.siteClass ?? existing.siteClass,
    estimatedGbPerDay:
      patch.estimatedGbPerDay !== undefined
        ? patch.estimatedGbPerDay
        : existing.estimatedGbPerDay,
    updatedAt: nowIso(),
  };
  state().sitesById.set(id, updated);
  return updated;
}

// —— Tiers ——

export function listTiers(filter?: { siteId?: string; role?: string }): SandboxTierNode[] {
  ensureProductSandboxSeeded();
  let items = [...state().tiersById.values()];
  if (filter?.siteId) items = items.filter((t) => t.siteId === filter.siteId);
  if (filter?.role) items = items.filter((t) => t.role === filter.role);
  return items;
}

export function getTier(id: string): SandboxTierNode | undefined {
  ensureProductSandboxSeeded();
  return state().tiersById.get(id);
}

export function createTier(input: {
  id?: string;
  siteId: string;
  role: TierRole;
  parentTierId?: string;
}): SandboxTierNode {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const tier: SandboxTierNode = {
    id: input.id ?? sandboxId('tir'),
    siteId: input.siteId,
    role: input.role,
    parentTierId: input.parentTierId,
    status: 'active',
    healthScore: 1,
    createdAt: now,
    updatedAt: now,
  };
  state().tiersById.set(tier.id, tier);
  return tier;
}

export function setTierStatus(tierId: string, status: TierStatus): SandboxTierNode | undefined {
  ensureProductSandboxSeeded();
  const tier = state().tiersById.get(tierId);
  if (!tier) return undefined;
  tier.status = status;
  tier.updatedAt = nowIso();
  state().tiersById.set(tierId, tier);
  return tier;
}

// —— Protocol ——

export function listProtocolDomains(filter?: {
  tierId?: string;
}): SandboxProtocolDomain[] {
  ensureProductSandboxSeeded();
  let items = [...state().domainsById.values()];
  if (filter?.tierId) items = items.filter((d) => d.tierId === filter.tierId);
  return items;
}

export function getProtocolDomain(id: string): SandboxProtocolDomain | undefined {
  ensureProductSandboxSeeded();
  return state().domainsById.get(id);
}

export function createProtocolDomain(input: {
  id?: string;
  protocolFamily?: ProtocolFamily;
  tierId: string;
  gatewayConfigVersion?: string;
  isolationChannelClass?: ChannelClass;
}): SandboxProtocolDomain {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const domain: SandboxProtocolDomain = {
    id: input.id ?? sandboxId('prd'),
    protocolFamily: input.protocolFamily ?? 'other',
    tierId: input.tierId,
    gatewayConfigVersion: input.gatewayConfigVersion ?? 'v1',
    status: 'pending',
    isolationChannelClass: input.isolationChannelClass,
    createdAt: now,
    updatedAt: now,
  };
  state().domainsById.set(domain.id, domain);
  state().isolationByDomainId.set(domain.id, {
    domainId: domain.id,
    highThroughputWeight: 50,
    lowPowerWeight: 50,
    stormProtection: true,
  });
  return domain;
}

export function pushGatewayConfig(
  domainId: string,
  configVersion?: string
): SandboxProtocolDomain | undefined {
  ensureProductSandboxSeeded();
  const domain = state().domainsById.get(domainId);
  if (!domain) return undefined;
  domain.gatewayConfigVersion = configVersion ?? domain.gatewayConfigVersion ?? 'v1';
  domain.status = 'healthy';
  domain.updatedAt = nowIso();
  state().domainsById.set(domainId, domain);
  return domain;
}

export function getIsolationPolicy(domainId: string): SandboxIsolationPolicy | undefined {
  ensureProductSandboxSeeded();
  return state().isolationByDomainId.get(domainId);
}

export function updateIsolationPolicy(
  domainId: string,
  patch: {
    highThroughputWeight?: number;
    lowPowerWeight?: number;
    stormProtection?: boolean;
  }
): SandboxIsolationPolicy | undefined {
  ensureProductSandboxSeeded();
  const existing = state().isolationByDomainId.get(domainId) ?? {
    domainId,
    highThroughputWeight: 50,
    lowPowerWeight: 50,
    stormProtection: true,
  };
  if (!state().domainsById.has(domainId) && !state().isolationByDomainId.has(domainId)) {
    // Allow update even if domain missing — create policy record for sandbox UX
  }
  const policy: SandboxIsolationPolicy = {
    domainId,
    highThroughputWeight: patch.highThroughputWeight ?? existing.highThroughputWeight,
    lowPowerWeight: patch.lowPowerWeight ?? existing.lowPowerWeight,
    stormProtection:
      patch.stormProtection !== undefined ? patch.stormProtection : existing.stormProtection,
  };
  state().isolationByDomainId.set(domainId, policy);
  return policy;
}

// —— Jobs ——

export function listAnalyticsJobs(filter?: { status?: string }): SandboxAnalyticsJob[] {
  ensureProductSandboxSeeded();
  let items = [...state().jobsById.values()];
  if (filter?.status) items = items.filter((j) => j.status === filter.status);
  return items;
}

export function getAnalyticsJob(id: string): SandboxAnalyticsJob | undefined {
  ensureProductSandboxSeeded();
  return state().jobsById.get(id);
}

export function createAnalyticsJob(input: {
  id?: string;
  preferredMaxTierRole?: TierRole;
  flRoundId?: string;
  siteId?: string;
  executionTierId?: string;
}): SandboxAnalyticsJob {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const job: SandboxAnalyticsJob = {
    id: input.id ?? sandboxId('job'),
    status: 'scheduled',
    executionTierId: input.executionTierId ?? sandboxId('tir'),
    preferredMaxTierRole: input.preferredMaxTierRole ?? 'fog',
    inPlace: true,
    backhaulBytesAvoided: 0,
    flRoundId: input.flRoundId,
    siteId: input.siteId,
    createdAt: now,
    updatedAt: now,
  };
  state().jobsById.set(job.id, job);
  return job;
}

export function pauseAnalyticsJob(jobId: string): SandboxAnalyticsJob | undefined {
  ensureProductSandboxSeeded();
  const job = state().jobsById.get(jobId);
  if (!job) return undefined;
  job.status = 'paused';
  job.updatedAt = nowIso();
  state().jobsById.set(jobId, job);
  return job;
}

export function overrideJobPlacement(
  jobId: string,
  executionTierId?: string,
  reason?: string
): SandboxAnalyticsJob | undefined {
  ensureProductSandboxSeeded();
  const job = state().jobsById.get(jobId);
  if (!job) return undefined;
  if (executionTierId) job.executionTierId = executionTierId;
  job.overrideReason = reason ?? job.overrideReason ?? 'manual override';
  job.inPlace = false;
  job.updatedAt = nowIso();
  state().jobsById.set(jobId, job);
  return job;
}

// —— FL ——

export function listFlRoundEligibility(filter?: {
  roundId?: string;
  tierId?: string;
  status?: string;
}): SandboxFlRoundEligibility[] {
  ensureProductSandboxSeeded();
  let items = [...state().flEligibilityById.values()];
  if (filter?.roundId) items = items.filter((e) => e.roundId === filter.roundId);
  if (filter?.tierId) items = items.filter((e) => e.tierId === filter.tierId);
  if (filter?.status) items = items.filter((e) => e.status === filter.status);
  return items;
}

export function getFlRoundEligibility(id: string): SandboxFlRoundEligibility | undefined {
  ensureProductSandboxSeeded();
  return state().flEligibilityById.get(id);
}

export function evaluateFlRoundEligibility(input: {
  id?: string;
  roundId: string;
  tierId: string;
  healthScore?: number;
}): SandboxFlRoundEligibility {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const health = input.healthScore ?? 1;
  const tier = state().tiersById.get(input.tierId);
  const quarantined = tier?.status === 'quarantined';
  const record: SandboxFlRoundEligibility = {
    id: input.id ?? sandboxId('flr'),
    roundId: input.roundId,
    tierId: input.tierId,
    status: quarantined || health < 0.5 ? 'denied' : 'eligible',
    denyReason: quarantined ? 'quarantine' : health < 0.5 ? 'unhealthy' : undefined,
    healthScore: health,
    createdAt: now,
    updatedAt: now,
  };
  state().flEligibilityById.set(record.id, record);
  return record;
}

export function waiveFlHealthGate(
  eligibilityId: string,
  waiverNote?: string
): SandboxFlRoundEligibility | undefined {
  ensureProductSandboxSeeded();
  const record = state().flEligibilityById.get(eligibilityId);
  if (!record) return undefined;
  record.status = 'waived';
  record.waiverNote = waiverNote ?? record.waiverNote ?? 'sandbox waiver';
  record.updatedAt = nowIso();
  state().flEligibilityById.set(eligibilityId, record);
  return record;
}

// —— Addressing ——

export function listDataAddresses(filter?: {
  owningTierId?: string;
  status?: string;
}): SandboxDataAddress[] {
  ensureProductSandboxSeeded();
  let items = [...state().addressesById.values()];
  if (filter?.owningTierId) {
    items = items.filter((a) => a.owningTierId === filter.owningTierId);
  }
  if (filter?.status) items = items.filter((a) => a.status === filter.status);
  return items;
}

export function getDataAddress(id: string): SandboxDataAddress | undefined {
  ensureProductSandboxSeeded();
  return state().addressesById.get(id);
}

export function createDataAddress(input: {
  id?: string;
  ref: string;
  owningTierId: string;
}): SandboxDataAddress {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const address: SandboxDataAddress = {
    id: input.id ?? sandboxId('adr'),
    ref: input.ref,
    owningTierId: input.owningTierId,
    status: 'active',
    grantedTierIds: [],
    createdAt: now,
    updatedAt: now,
  };
  state().addressesById.set(address.id, address);
  return address;
}

export function grantDataAddressResolve(
  addressId: string,
  tierId?: string
): SandboxDataAddress | undefined {
  ensureProductSandboxSeeded();
  const address = state().addressesById.get(addressId);
  if (!address) return undefined;
  const grantTier = tierId ?? 'sandbox_tier';
  if (!address.grantedTierIds.includes(grantTier)) {
    address.grantedTierIds = [...address.grantedTierIds, grantTier];
  }
  address.updatedAt = nowIso();
  state().addressesById.set(addressId, address);
  return address;
}

export function revokeDataAddress(addressId: string): SandboxDataAddress | undefined {
  ensureProductSandboxSeeded();
  const address = state().addressesById.get(addressId);
  if (!address) return undefined;
  address.status = 'revoked';
  address.updatedAt = nowIso();
  state().addressesById.set(addressId, address);
  return address;
}

// —— Trust ——

export function listTrustSpheres(): SandboxTrustSphere[] {
  ensureProductSandboxSeeded();
  return [...state().trustSpheresById.values()];
}

export function getTrustSphere(id: string): SandboxTrustSphere | undefined {
  ensureProductSandboxSeeded();
  return state().trustSpheresById.get(id);
}

export function createTrustSphere(input: {
  id?: string;
  name: string;
  memberTierIds?: string[];
}): SandboxTrustSphere {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const sphere: SandboxTrustSphere = {
    id: input.id ?? sandboxId('trs'),
    name: input.name,
    memberTierIds: input.memberTierIds ?? [],
    createdAt: now,
    updatedAt: now,
  };
  state().trustSpheresById.set(sphere.id, sphere);
  return sphere;
}

export function approveSphereJoin(
  sphereId: string,
  tierId: string
): SandboxTrustSphere | undefined {
  ensureProductSandboxSeeded();
  const sphere = state().trustSpheresById.get(sphereId);
  if (!sphere) return undefined;
  if (!sphere.memberTierIds.includes(tierId)) {
    sphere.memberTierIds = [...sphere.memberTierIds, tierId];
  }
  sphere.updatedAt = nowIso();
  state().trustSpheresById.set(sphereId, sphere);
  return sphere;
}

export function listQuarantineEvents(filter?: {
  tierId?: string;
  active?: boolean;
}): SandboxQuarantineEvent[] {
  ensureProductSandboxSeeded();
  let items = [...state().quarantineById.values()];
  if (filter?.tierId) items = items.filter((q) => q.tierId === filter.tierId);
  if (filter?.active !== undefined) {
    items = items.filter((q) => q.active === filter.active);
  }
  return items;
}

export function getQuarantineEvent(id: string): SandboxQuarantineEvent | undefined {
  ensureProductSandboxSeeded();
  return state().quarantineById.get(id);
}

export function quarantineTier(input: {
  id?: string;
  tierId: string;
  reason?: string;
  continueParentDag?: boolean;
}): SandboxQuarantineEvent {
  ensureProductSandboxSeeded();
  const now = nowIso();
  setTierStatus(input.tierId, 'quarantined');
  const event: SandboxQuarantineEvent = {
    id: input.id ?? sandboxId('qrn'),
    tierId: input.tierId,
    active: true,
    reason: input.reason ?? 'sandbox quarantine',
    continueParentDag: input.continueParentDag ?? true,
    createdAt: now,
    updatedAt: now,
  };
  state().quarantineById.set(event.id, event);
  return event;
}

export function releaseQuarantine(eventId: string): SandboxQuarantineEvent | undefined {
  ensureProductSandboxSeeded();
  const event = state().quarantineById.get(eventId);
  if (!event) return undefined;
  event.active = false;
  event.updatedAt = nowIso();
  state().quarantineById.set(eventId, event);
  setTierStatus(event.tierId, 'active');
  return event;
}

export function listTenantSpheres(): SandboxTenantSphere[] {
  ensureProductSandboxSeeded();
  return [...state().tenantSpheresById.values()];
}

export function createTenantSphere(input: {
  id?: string;
  name: string;
  hostTierId: string;
  cryptoIsolated?: boolean;
}): SandboxTenantSphere {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const sphere: SandboxTenantSphere = {
    id: input.id ?? sandboxId('tns'),
    name: input.name,
    hostTierId: input.hostTierId,
    cryptoIsolated: input.cryptoIsolated ?? true,
    createdAt: now,
    updatedAt: now,
  };
  state().tenantSpheresById.set(sphere.id, sphere);
  return sphere;
}

// —— Provenance ——

export function listArtefactProvenance(filter?: {
  tierId?: string;
  jobId?: string;
}): SandboxArtefactProvenance[] {
  ensureProductSandboxSeeded();
  let items = [...state().provenanceById.values()];
  if (filter?.tierId) items = items.filter((p) => p.tierId === filter.tierId);
  if (filter?.jobId) items = items.filter((p) => p.jobId === filter.jobId);
  return items;
}

export function getArtefactProvenance(id: string): SandboxArtefactProvenance | undefined {
  ensureProductSandboxSeeded();
  return state().provenanceById.get(id);
}

export function sealArtefactProvenance(input: {
  id?: string;
  artefactHash?: string;
  tierId?: string;
  jobId?: string;
  tierPath?: string[];
}): SandboxArtefactProvenance {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const record: SandboxArtefactProvenance = {
    id: input.id ?? sandboxId('prv'),
    artefactHash: input.artefactHash ?? `sha256:sandbox_${sandboxId('hash')}`,
    tierId: input.tierId ?? sandboxId('tir'),
    jobId: input.jobId,
    tierPath: input.tierPath,
    sealedAt: now,
    createdAt: now,
    updatedAt: now,
  };
  state().provenanceById.set(record.id, record);
  return record;
}
