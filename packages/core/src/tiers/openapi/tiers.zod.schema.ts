import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerTier_Body = z
  .object({
    siteId: z.string(),
    role: z.enum(['device', 'fog', 'edge', 'cloud']),
    parentTierId: z.string().optional(),
  })
  .passthrough();
const TierStatus = z.enum(['active', 'quarantined']);
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
const TierNodeId = z.string();
const TierRole = z.enum(['device', 'fog', 'edge', 'cloud']);
const TierNode = z
  .object({
    id: z.string().regex(/^tir_[0-9a-z]{26}$/),
    siteId: z.string(),
    role: z.enum(['device', 'fog', 'edge', 'cloud']),
    parentTierId: z.string().optional(),
    status: z.enum(['active', 'quarantined']),
    healthScore: z.number().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TierNodeListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^tir_[0-9a-z]{26}$/),
          siteId: z.string(),
          role: z.enum(['device', 'fog', 'edge', 'cloud']),
          parentTierId: z.string().optional(),
          status: z.enum(['active', 'quarantined']),
          healthScore: z.number().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const TierNodeListResponse = z
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
                  id: z.string().regex(/^tir_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  role: z.enum(['device', 'fog', 'edge', 'cloud']),
                  parentTierId: z.string().optional(),
                  status: z.enum(['active', 'quarantined']),
                  healthScore: z.number().optional(),
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
const TierNodeCreate = z
  .object({
    siteId: z.string(),
    role: z.enum(['device', 'fog', 'edge', 'cloud']),
    parentTierId: z.string().optional(),
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
const TierNodeResponse = z
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
            id: z.string().regex(/^tir_[0-9a-z]{26}$/),
            siteId: z.string(),
            role: z.enum(['device', 'fog', 'edge', 'cloud']),
            parentTierId: z.string().optional(),
            status: z.enum(['active', 'quarantined']),
            healthScore: z.number().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  registerTier_Body,
  TierStatus,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  TierNodeId,
  TierRole,
  TierNode,
  TierNodeListData,
  TierNodeListResponse,
  TierNodeCreate,
  DataEnvelope,
  TierNodeResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/tiers',
    alias: 'listTiers',
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
        name: 'siteId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'quarantined']).optional(),
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
                      id: z.string().regex(/^tir_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      role: z.enum(['device', 'fog', 'edge', 'cloud']),
                      parentTierId: z.string().optional(),
                      status: z.enum(['active', 'quarantined']),
                      healthScore: z.number().optional(),
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
    path: '/v1/tiers',
    alias: 'registerTier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerTier_Body,
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
                id: z.string().regex(/^tir_[0-9a-z]{26}$/),
                siteId: z.string(),
                role: z.enum(['device', 'fog', 'edge', 'cloud']),
                parentTierId: z.string().optional(),
                status: z.enum(['active', 'quarantined']),
                healthScore: z.number().optional(),
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
    path: '/v1/tiers/:tierId',
    alias: 'getTier',
    requestFormat: 'json',
    parameters: [
      {
        name: 'tierId',
        type: 'Path',
        schema: z.string().regex(/^tir_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^tir_[0-9a-z]{26}$/),
                siteId: z.string(),
                role: z.enum(['device', 'fog', 'edge', 'cloud']),
                parentTierId: z.string().optional(),
                status: z.enum(['active', 'quarantined']),
                healthScore: z.number().optional(),
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
