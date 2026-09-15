import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const sealArtefactProvenance_Body = z
  .object({
    artefactHash: z.string().min(1),
    tierId: z.string(),
    jobId: z.string().optional(),
    tierPath: z.array(z.string()).optional(),
  })
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
const ArtefactProvenanceId = z.string();
const ArtefactProvenance = z
  .object({
    id: z.string().regex(/^prv_[0-9a-z]{26}$/),
    artefactHash: z.string(),
    tierId: z.string(),
    jobId: z.string().optional(),
    tierPath: z.array(z.string()).optional(),
    sealedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ArtefactProvenanceListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^prv_[0-9a-z]{26}$/),
          artefactHash: z.string(),
          tierId: z.string(),
          jobId: z.string().optional(),
          tierPath: z.array(z.string()).optional(),
          sealedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ArtefactProvenanceListResponse = z
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
                  id: z.string().regex(/^prv_[0-9a-z]{26}$/),
                  artefactHash: z.string(),
                  tierId: z.string(),
                  jobId: z.string().optional(),
                  tierPath: z.array(z.string()).optional(),
                  sealedAt: z.string().datetime({ offset: true }),
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
const ArtefactProvenanceCreate = z
  .object({
    artefactHash: z.string().min(1),
    tierId: z.string(),
    jobId: z.string().optional(),
    tierPath: z.array(z.string()).optional(),
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
const ArtefactProvenanceResponse = z
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
            id: z.string().regex(/^prv_[0-9a-z]{26}$/),
            artefactHash: z.string(),
            tierId: z.string(),
            jobId: z.string().optional(),
            tierPath: z.array(z.string()).optional(),
            sealedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  sealArtefactProvenance_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  ArtefactProvenanceId,
  ArtefactProvenance,
  ArtefactProvenanceListData,
  ArtefactProvenanceListResponse,
  ArtefactProvenanceCreate,
  DataEnvelope,
  ArtefactProvenanceResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/provenance',
    alias: 'listArtefactProvenance',
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
        name: 'tierId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'jobId',
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
                      id: z.string().regex(/^prv_[0-9a-z]{26}$/),
                      artefactHash: z.string(),
                      tierId: z.string(),
                      jobId: z.string().optional(),
                      tierPath: z.array(z.string()).optional(),
                      sealedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/provenance',
    alias: 'sealArtefactProvenance',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: sealArtefactProvenance_Body,
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
                id: z.string().regex(/^prv_[0-9a-z]{26}$/),
                artefactHash: z.string(),
                tierId: z.string(),
                jobId: z.string().optional(),
                tierPath: z.array(z.string()).optional(),
                sealedAt: z.string().datetime({ offset: true }),
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
    path: '/v1/provenance/:provenanceId',
    alias: 'getArtefactProvenance',
    requestFormat: 'json',
    parameters: [
      {
        name: 'provenanceId',
        type: 'Path',
        schema: z.string().regex(/^prv_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^prv_[0-9a-z]{26}$/),
                artefactHash: z.string(),
                tierId: z.string(),
                jobId: z.string().optional(),
                tierPath: z.array(z.string()).optional(),
                sealedAt: z.string().datetime({ offset: true }),
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
