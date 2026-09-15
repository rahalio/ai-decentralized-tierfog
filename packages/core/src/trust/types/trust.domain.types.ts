/**
 * Trust Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/trust.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type QuarantineEvent = components["schemas"]["QuarantineEvent"];
export type QuarantineEventCreate = components["schemas"]["QuarantineEventCreate"];
export type QuarantineEventId = components["schemas"]["QuarantineEventId"];
export type QuarantineEventListData = components["schemas"]["QuarantineEventListData"];
export type TenantSphere = components["schemas"]["TenantSphere"];
export type TenantSphereCreate = components["schemas"]["TenantSphereCreate"];
export type TenantSphereId = components["schemas"]["TenantSphereId"];
export type TenantSphereListData = components["schemas"]["TenantSphereListData"];
export type TrustSphere = components["schemas"]["TrustSphere"];
export type TrustSphereCreate = components["schemas"]["TrustSphereCreate"];
export type TrustSphereId = components["schemas"]["TrustSphereId"];
export type TrustSphereListData = components["schemas"]["TrustSphereListData"];
export type SphereJoinRequest = components["schemas"]["SphereJoinRequest"];
export type Sphere = operations["listTrustSpheres"]["responses"]["200"]["content"]["application/json"]["data"];
export type Quarantine = operations["listQuarantineEvents"]["responses"]["200"]["content"]["application/json"]["data"];
export type Tenant = operations["listTenantSpheres"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTrustSphereRequestInput = NonNullable<operations["createTrustSphere"]["requestBody"]>["content"]["application/json"];
export type ApproveSphereJoinRequestInput = NonNullable<operations["approveSphereJoin"]["requestBody"]>["content"]["application/json"];
export type QuarantineTierRequestInput = NonNullable<operations["quarantineTier"]["requestBody"]>["content"]["application/json"];
export type CreateTenantSphereRequestInput = NonNullable<operations["createTenantSphere"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTrustSpheresParams = NonNullable<operations["listTrustSpheres"]["parameters"]["query"]>;
export type ApproveSphereJoinParams = operations["approveSphereJoin"]["parameters"]["path"];
export type ListQuarantineEventsParams = NonNullable<operations["listQuarantineEvents"]["parameters"]["query"]>;
export type ReleaseQuarantineParams = operations["releaseQuarantine"]["parameters"]["path"];
export type ListTenantSpheresParams = NonNullable<operations["listTenantSpheres"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTrustSpheresResponse = operations["listTrustSpheres"]["responses"]["200"]["content"]["application/json"];
export type CreateTrustSphereResponse = operations["createTrustSphere"]["responses"]["201"]["content"]["application/json"];
export type ApproveSphereJoinResponse = operations["approveSphereJoin"]["responses"]["200"]["content"]["application/json"];
export type ListQuarantineEventsResponse = operations["listQuarantineEvents"]["responses"]["200"]["content"]["application/json"];
export type QuarantineTierResponse = operations["quarantineTier"]["responses"]["201"]["content"]["application/json"];
export type ReleaseQuarantineResponse = operations["releaseQuarantine"]["responses"]["200"]["content"]["application/json"];
export type ListTenantSpheresResponse = operations["listTenantSpheres"]["responses"]["200"]["content"]["application/json"];
export type CreateTenantSphereResponse = operations["createTenantSphere"]["responses"]["201"]["content"]["application/json"];


