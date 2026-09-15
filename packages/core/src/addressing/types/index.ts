/**
 * Addressing Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/addressing.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataAddress = components["schemas"]["DataAddress"];
export type DataAddressCreate = components["schemas"]["DataAddressCreate"];
export type DataAddressGrant = components["schemas"]["DataAddressGrant"];
export type DataAddressId = components["schemas"]["DataAddressId"];
export type DataAddressListData = components["schemas"]["DataAddressListData"];
export type DataAddressStatus = components["schemas"]["DataAddressStatus"];
export type Address = operations["listDataAddresses"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterDataAddressRequestInput = NonNullable<operations["registerDataAddress"]["requestBody"]>["content"]["application/json"];
export type GrantDataAddressResolveRequestInput = NonNullable<operations["grantDataAddressResolve"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDataAddressesParams = NonNullable<operations["listDataAddresses"]["parameters"]["query"]>;
export type GrantDataAddressResolveParams = operations["grantDataAddressResolve"]["parameters"]["path"];
export type RevokeDataAddressParams = operations["revokeDataAddress"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDataAddressesResponse = operations["listDataAddresses"]["responses"]["200"]["content"]["application/json"];
export type RegisterDataAddressResponse = operations["registerDataAddress"]["responses"]["201"]["content"]["application/json"];
export type GrantDataAddressResolveResponse = operations["grantDataAddressResolve"]["responses"]["200"]["content"]["application/json"];
export type RevokeDataAddressResponse = operations["revokeDataAddress"]["responses"]["200"]["content"]["application/json"];


