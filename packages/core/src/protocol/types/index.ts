/**
 * Protocol Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/protocol.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ChannelClass = components["schemas"]["ChannelClass"];
export type GatewayConfigPush = components["schemas"]["GatewayConfigPush"];
export type IsolationPolicy = components["schemas"]["IsolationPolicy"];
export type IsolationPolicyUpdate = components["schemas"]["IsolationPolicyUpdate"];
export type ProtocolDomain = components["schemas"]["ProtocolDomain"];
export type ProtocolDomainCreate = components["schemas"]["ProtocolDomainCreate"];
export type ProtocolDomainId = components["schemas"]["ProtocolDomainId"];
export type ProtocolDomainListData = components["schemas"]["ProtocolDomainListData"];
export type ProtocolDomainStatus = components["schemas"]["ProtocolDomainStatus"];
export type ProtocolFamily = components["schemas"]["ProtocolFamily"];
export type Domain = operations["listProtocolDomains"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OnboardProtocolDomainRequestInput = NonNullable<operations["onboardProtocolDomain"]["requestBody"]>["content"]["application/json"];
export type PushGatewayConfigRequestInput = NonNullable<operations["pushGatewayConfig"]["requestBody"]>["content"]["application/json"];
export type UpdateIsolationPolicyRequestInput = NonNullable<operations["updateIsolationPolicy"]["requestBody"]>["content"]["application/json"];
export type UpdateIsolationPolicyRequest = UpdateIsolationPolicyRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListProtocolDomainsParams = NonNullable<operations["listProtocolDomains"]["parameters"]["query"]>;
export type GetProtocolDomainParams = operations["getProtocolDomain"]["parameters"]["path"];
export type PushGatewayConfigParams = operations["pushGatewayConfig"]["parameters"]["path"];
export type UpdateIsolationPolicyParams = operations["updateIsolationPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListProtocolDomainsResponse = operations["listProtocolDomains"]["responses"]["200"]["content"]["application/json"];
export type OnboardProtocolDomainResponse = operations["onboardProtocolDomain"]["responses"]["201"]["content"]["application/json"];
export type GetProtocolDomainResponse = operations["getProtocolDomain"]["responses"]["200"]["content"]["application/json"];
export type PushGatewayConfigResponse = operations["pushGatewayConfig"]["responses"]["200"]["content"]["application/json"];
export type UpdateIsolationPolicyResponse = operations["updateIsolationPolicy"]["responses"]["200"]["content"]["application/json"];


