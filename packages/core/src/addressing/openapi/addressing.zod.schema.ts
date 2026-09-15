import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerDataAddress_Body = z
  .object({ ref: z.string().min(1), owningTierId: z.string() })
  .passthrough();
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
const DataAddressId = z.string();
const DataAddressStatus = z.enum(['active', 'revoked', 'blocked']);
const DataAddress = z
  .object({
    id: z.string().regex(/^adr_[0-9a-z]{26}$/),
    ref: z.string(),
    owningTierId: z.string(),
    status: z.enum(['active', 'revoked', 'blocked']),
    grantedTierIds: z.array(z.string()).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DataAddressListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^adr_[0-9a-z]{26}$/),
          ref: z.string(),
          owningTierId: z.string(),
          status: z.enum(['active', 'revoked', 'blocked']),
          grantedTierIds: z.array(z.string()).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const DataAddressListResponse = z
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
                  id: z.string().regex(/^adr_[0-9a-z]{26}$/),
                  ref: z.string(),
                  owningTierId: z.string(),
                  status: z.enum(['active', 'revoked', 'blocked']),
                  grantedTierIds: z.array(z.string()).optional(),
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
const DataAddressCreate = z
  .object({ ref: z.string().min(1), owningTierId: z.string() })
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
const DataAddressResponse = z
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
            id: z.string().regex(/^adr_[0-9a-z]{26}$/),
            ref: z.string(),
            owningTierId: z.string(),
            status: z.enum(['active', 'revoked', 'blocked']),
            grantedTierIds: z.array(z.string()).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const DataAddressGrant = z.object({ tierId: z.string() }).passthrough();

export const schemas: any = {
  registerDataAddress_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  DataAddressId,
  DataAddressStatus,
  DataAddress,
  DataAddressListData,
  DataAddressListResponse,
  DataAddressCreate,
  DataEnvelope,
  DataAddressResponse,
  DataAddressGrant,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/addresses',
    alias: 'listDataAddresses',
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
        name: 'owningTierId',
        type: 'Query',
        schema: z.string().optional(),
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
                      id: z.string().regex(/^adr_[0-9a-z]{26}$/),
                      ref: z.string(),
                      owningTierId: z.string(),
                      status: z.enum(['active', 'revoked', 'blocked']),
                      grantedTierIds: z.array(z.string()).optional(),
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
    path: '/v1/addresses',
    alias: 'registerDataAddress',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerDataAddress_Body,
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
                id: z.string().regex(/^adr_[0-9a-z]{26}$/),
                ref: z.string(),
                owningTierId: z.string(),
                status: z.enum(['active', 'revoked', 'blocked']),
                grantedTierIds: z.array(z.string()).optional(),
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
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/addresses/:addressId/grant',
    alias: 'grantDataAddressResolve',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ tierId: z.string() }).passthrough(),
      },
      {
        name: 'addressId',
        type: 'Path',
        schema: z.string().regex(/^adr_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^adr_[0-9a-z]{26}$/),
                ref: z.string(),
                owningTierId: z.string(),
                status: z.enum(['active', 'revoked', 'blocked']),
                grantedTierIds: z.array(z.string()).optional(),
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
    path: '/v1/addresses/:addressId/revoke',
    alias: 'revokeDataAddress',
    requestFormat: 'json',
    parameters: [
      {
        name: 'addressId',
        type: 'Path',
        schema: z.string().regex(/^adr_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^adr_[0-9a-z]{26}$/),
                ref: z.string(),
                owningTierId: z.string(),
                status: z.enum(['active', 'revoked', 'blocked']),
                grantedTierIds: z.array(z.string()).optional(),
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
