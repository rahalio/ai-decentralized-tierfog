/**
 * Sites Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/sites.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Site = components["schemas"]["Site"];
export type SiteClass = components["schemas"]["SiteClass"];
export type SiteCreate = components["schemas"]["SiteCreate"];
export type SiteId = components["schemas"]["SiteId"];
export type SiteListData = components["schemas"]["SiteListData"];
export type SiteUpdate = components["schemas"]["SiteUpdate"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterSiteRequestInput = NonNullable<operations["registerSite"]["requestBody"]>["content"]["application/json"];
export type UpdateSiteRequestInput = NonNullable<operations["updateSite"]["requestBody"]>["content"]["application/json"];
export type UpdateSiteRequest = UpdateSiteRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSitesParams = NonNullable<operations["listSites"]["parameters"]["query"]>;
export type GetSiteParams = operations["getSite"]["parameters"]["path"];
export type UpdateSiteParams = operations["updateSite"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSitesResponse = operations["listSites"]["responses"]["200"]["content"]["application/json"];
export type RegisterSiteResponse = operations["registerSite"]["responses"]["201"]["content"]["application/json"];
export type GetSiteResponse = operations["getSite"]["responses"]["200"]["content"]["application/json"];
export type UpdateSiteResponse = operations["updateSite"]["responses"]["200"]["content"]["application/json"];


