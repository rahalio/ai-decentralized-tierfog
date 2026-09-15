/**
 * Provenance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/provenance.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ArtefactProvenance = components["schemas"]["ArtefactProvenance"];
export type ArtefactProvenanceCreate = components["schemas"]["ArtefactProvenanceCreate"];
export type ArtefactProvenanceId = components["schemas"]["ArtefactProvenanceId"];
export type ArtefactProvenanceListData = components["schemas"]["ArtefactProvenanceListData"];
export type Provenance = operations["listArtefactProvenance"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SealArtefactProvenanceRequestInput = NonNullable<operations["sealArtefactProvenance"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListArtefactProvenanceParams = NonNullable<operations["listArtefactProvenance"]["parameters"]["query"]>;
export type GetArtefactProvenanceParams = operations["getArtefactProvenance"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListArtefactProvenanceResponse = operations["listArtefactProvenance"]["responses"]["200"]["content"]["application/json"];
export type SealArtefactProvenanceResponse = operations["sealArtefactProvenance"]["responses"]["201"]["content"]["application/json"];
export type GetArtefactProvenanceResponse = operations["getArtefactProvenance"]["responses"]["200"]["content"]["application/json"];


