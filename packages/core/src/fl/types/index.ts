/**
 * Fl Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/fl.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FlDenyReason = components["schemas"]["FlDenyReason"];
export type FlEligibilityStatus = components["schemas"]["FlEligibilityStatus"];
export type FlHealthGateWaive = components["schemas"]["FlHealthGateWaive"];
export type FlRoundEligibility = components["schemas"]["FlRoundEligibility"];
export type FlRoundEligibilityCreate = components["schemas"]["FlRoundEligibilityCreate"];
export type FlRoundEligibilityListData = components["schemas"]["FlRoundEligibilityListData"];
export type FlRoundId = components["schemas"]["FlRoundId"];
export type Eligibility = operations["listFlRoundEligibility"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type EvaluateFlRoundEligibilityRequestInput = NonNullable<operations["evaluateFlRoundEligibility"]["requestBody"]>["content"]["application/json"];
export type WaiveFlHealthGateRequestInput = NonNullable<operations["waiveFlHealthGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListFlRoundEligibilityParams = NonNullable<operations["listFlRoundEligibility"]["parameters"]["query"]>;
export type GetFlRoundEligibilityParams = operations["getFlRoundEligibility"]["parameters"]["path"];
export type WaiveFlHealthGateParams = operations["waiveFlHealthGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListFlRoundEligibilityResponse = operations["listFlRoundEligibility"]["responses"]["200"]["content"]["application/json"];
export type EvaluateFlRoundEligibilityResponse = operations["evaluateFlRoundEligibility"]["responses"]["201"]["content"]["application/json"];
export type GetFlRoundEligibilityResponse = operations["getFlRoundEligibility"]["responses"]["200"]["content"]["application/json"];
export type WaiveFlHealthGateResponse = operations["waiveFlHealthGate"]["responses"]["200"]["content"]["application/json"];


