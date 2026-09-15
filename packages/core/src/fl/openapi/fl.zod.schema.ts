import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const evaluateFlRoundEligibility_Body = z
  .object({
    roundId: z.string(),
    tierId: z.string(),
    healthScore: z.number().optional(),
  })
  .passthrough();
const FlEligibilityStatus = z.enum(['eligible', 'denied', 'waived']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PageInfo = z
  .object({
    page: z.number().int().gte(1),
    limit: z.number().int().gte(1),
    total: z.number().int().gte(0),
    cursor: z.string(),
  })
  .partial()
  .passthrough();
const PagedDataEnvelope = z
  .object({
    data: z.object({ items: z.array(z.unknown()) }).passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const FlRoundId = z.string();
const FlDenyReason = z.enum(['mesh_loss', 'quarantine', 'unhealthy', 'other']);
const FlRoundEligibility = z
  .object({
    id: z.string().regex(/^flr_[0-9a-z]{26}$/),
    roundId: z.string(),
    tierId: z.string(),
    status: z.enum(['eligible', 'denied', 'waived']),
    denyReason: z
      .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
      .optional(),
    healthScore: z.number().optional(),
    waiverNote: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const FlRoundEligibilityListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^flr_[0-9a-z]{26}$/),
          roundId: z.string(),
          tierId: z.string(),
          status: z.enum(['eligible', 'denied', 'waived']),
          denyReason: z
            .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
            .optional(),
          healthScore: z.number().optional(),
          waiverNote: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const FlRoundEligibilityListResponse = z
  .object({
    data: z.object({ items: z.array(z.unknown()) }).passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^flr_[0-9a-z]{26}$/),
                  roundId: z.string(),
                  tierId: z.string(),
                  status: z.enum(['eligible', 'denied', 'waived']),
                  denyReason: z
                    .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
                    .optional(),
                  healthScore: z.number().optional(),
                  waiverNote: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const FlRoundEligibilityCreate = z
  .object({
    roundId: z.string(),
    tierId: z.string(),
    healthScore: z.number().optional(),
  })
  .passthrough();
const DataEnvelope = z
  .object({
    data: z.unknown(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const FlRoundEligibilityResponse = z
  .object({
    data: z.unknown(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            id: z.string().regex(/^flr_[0-9a-z]{26}$/),
            roundId: z.string(),
            tierId: z.string(),
            status: z.enum(['eligible', 'denied', 'waived']),
            denyReason: z
              .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
              .optional(),
            healthScore: z.number().optional(),
            waiverNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const FlHealthGateWaive = z
  .object({ waiverNote: z.string().min(1) })
  .passthrough();

export const schemas: any = {
  evaluateFlRoundEligibility_Body,
  FlEligibilityStatus,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  FlRoundId,
  FlDenyReason,
  FlRoundEligibility,
  FlRoundEligibilityListData,
  FlRoundEligibilityListResponse,
  FlRoundEligibilityCreate,
  DataEnvelope,
  FlRoundEligibilityResponse,
  FlHealthGateWaive,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/fl/eligibility',
    alias: 'listFlRoundEligibility',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'roundId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['eligible', 'denied', 'waived']).optional(),
      },
    ],
    response: z
      .object({
        data: z.object({ items: z.array(z.unknown()) }).passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .and(
            z
              .object({
                pagination: z
                  .object({
                    page: z.number().int().gte(1),
                    limit: z.number().int().gte(1),
                    total: z.number().int().gte(0),
                    cursor: z.string(),
                  })
                  .partial()
                  .passthrough(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                items: z.array(
                  z
                    .object({
                      id: z.string().regex(/^flr_[0-9a-z]{26}$/),
                      roundId: z.string(),
                      tierId: z.string(),
                      status: z.enum(['eligible', 'denied', 'waived']),
                      denyReason: z
                        .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
                        .optional(),
                      healthScore: z.number().optional(),
                      waiverNote: z.string().optional(),
                      createdAt: z.string().datetime({ offset: true }),
                      updatedAt: z.string().datetime({ offset: true }),
                    })
                    .passthrough()
                ),
                nextCursor: z.string().optional(),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'post',
    path: '/v1/fl/eligibility',
    alias: 'evaluateFlRoundEligibility',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: evaluateFlRoundEligibility_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^flr_[0-9a-z]{26}$/),
                roundId: z.string(),
                tierId: z.string(),
                status: z.enum(['eligible', 'denied', 'waived']),
                denyReason: z
                  .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
                  .optional(),
                healthScore: z.number().optional(),
                waiverNote: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'get',
    path: '/v1/fl/eligibility/:eligibilityId',
    alias: 'getFlRoundEligibility',
    requestFormat: 'json',
    parameters: [
      {
        name: 'eligibilityId',
        type: 'Path',
        schema: z.string().regex(/^flr_[0-9a-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^flr_[0-9a-z]{26}$/),
                roundId: z.string(),
                tierId: z.string(),
                status: z.enum(['eligible', 'denied', 'waived']),
                denyReason: z
                  .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
                  .optional(),
                healthScore: z.number().optional(),
                waiverNote: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/fl/eligibility/:eligibilityId/waive',
    alias: 'waiveFlHealthGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ waiverNote: z.string().min(1) }).passthrough(),
      },
      {
        name: 'eligibilityId',
        type: 'Path',
        schema: z.string().regex(/^flr_[0-9a-z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^flr_[0-9a-z]{26}$/),
                roundId: z.string(),
                tierId: z.string(),
                status: z.enum(['eligible', 'denied', 'waived']),
                denyReason: z
                  .enum(['mesh_loss', 'quarantine', 'unhealthy', 'other'])
                  .optional(),
                healthScore: z.number().optional(),
                waiverNote: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.tierfog.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
