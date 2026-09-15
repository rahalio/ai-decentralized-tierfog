/**
 * Tiers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/tiers.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type TierNode = components["schemas"]["TierNode"];
export type TierNodeCreate = components["schemas"]["TierNodeCreate"];
export type TierNodeId = components["schemas"]["TierNodeId"];
export type TierNodeListData = components["schemas"]["TierNodeListData"];
export type TierRole = components["schemas"]["TierRole"];
export type TierStatus = components["schemas"]["TierStatus"];
export type Tier = operations["listTiers"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterTierRequestInput = NonNullable<operations["registerTier"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTiersParams = NonNullable<operations["listTiers"]["parameters"]["query"]>;
export type GetTierParams = operations["getTier"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTiersResponse = operations["listTiers"]["responses"]["200"]["content"]["application/json"];
export type RegisterTierResponse = operations["registerTier"]["responses"]["201"]["content"]["application/json"];
export type GetTierResponse = operations["getTier"]["responses"]["200"]["content"]["application/json"];


