/**
 * Jobs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/jobs.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnalyticsJob = components["schemas"]["AnalyticsJob"];
export type AnalyticsJobCreate = components["schemas"]["AnalyticsJobCreate"];
export type AnalyticsJobId = components["schemas"]["AnalyticsJobId"];
export type AnalyticsJobListData = components["schemas"]["AnalyticsJobListData"];
export type JobPlacementOverride = components["schemas"]["JobPlacementOverride"];
export type TierRole = components["schemas"]["TierRole"];
export type Job = operations["listAnalyticsJobs"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ScheduleAnalyticsJobRequestInput = NonNullable<operations["scheduleAnalyticsJob"]["requestBody"]>["content"]["application/json"];
export type OverrideJobPlacementRequestInput = NonNullable<operations["overrideJobPlacement"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAnalyticsJobsParams = NonNullable<operations["listAnalyticsJobs"]["parameters"]["query"]>;
export type GetAnalyticsJobParams = operations["getAnalyticsJob"]["parameters"]["path"];
export type OverrideJobPlacementParams = operations["overrideJobPlacement"]["parameters"]["path"];
export type PauseAnalyticsJobParams = operations["pauseAnalyticsJob"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAnalyticsJobsResponse = operations["listAnalyticsJobs"]["responses"]["200"]["content"]["application/json"];
export type ScheduleAnalyticsJobResponse = operations["scheduleAnalyticsJob"]["responses"]["201"]["content"]["application/json"];
export type GetAnalyticsJobResponse = operations["getAnalyticsJob"]["responses"]["200"]["content"]["application/json"];
export type OverrideJobPlacementResponse = operations["overrideJobPlacement"]["responses"]["200"]["content"]["application/json"];
export type PauseAnalyticsJobResponse = operations["pauseAnalyticsJob"]["responses"]["200"]["content"]["application/json"];


