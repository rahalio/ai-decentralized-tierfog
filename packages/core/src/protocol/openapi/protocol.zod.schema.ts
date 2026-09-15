import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const onboardProtocolDomain_Body = z
  .object({
    protocolFamily: z.enum([
      'mqtt_coap',
      'rpl_6lowpan',
      'bt_mesh',
      'v2x',
      'http_rich',
      'other',
    ]),
    tierId: z.string(),
    gatewayConfigVersion: z.string().optional(),
    isolationChannelClass: z
      .enum(['high_throughput', 'low_power_mesh'])
      .optional(),
  })
  .passthrough();
const pushGatewayConfig_Body = z
  .object({
    configVersion: z.string(),
    rolloutRing: z.enum(['canary', 'ring1', 'ring2', 'all']).optional(),
  })
  .passthrough();
const updateIsolationPolicy_Body = z
  .object({
    highThroughputWeight: z.number().int().gte(0).lte(100),
    lowPowerWeight: z.number().int().gte(0).lte(100),
    stormProtection: z.boolean().optional(),
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
const ProtocolDomainId = z.string();
const ProtocolFamily = z.enum([
  'mqtt_coap',
  'rpl_6lowpan',
  'bt_mesh',
  'v2x',
  'http_rich',
  'other',
]);
const ProtocolDomainStatus = z.enum([
  'pending',
  'healthy',
  'degraded',
  'failed',
]);
const ChannelClass = z.enum(['high_throughput', 'low_power_mesh']);
const ProtocolDomain = z
  .object({
    id: z.string().regex(/^prd_[0-9a-z]{26}$/),
    protocolFamily: z.enum([
      'mqtt_coap',
      'rpl_6lowpan',
      'bt_mesh',
      'v2x',
      'http_rich',
      'other',
    ]),
    tierId: z.string(),
    gatewayConfigVersion: z.string().optional(),
    status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
    isolationChannelClass: z
      .enum(['high_throughput', 'low_power_mesh'])
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ProtocolDomainListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^prd_[0-9a-z]{26}$/),
          protocolFamily: z.enum([
            'mqtt_coap',
            'rpl_6lowpan',
            'bt_mesh',
            'v2x',
            'http_rich',
            'other',
          ]),
          tierId: z.string(),
          gatewayConfigVersion: z.string().optional(),
          status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
          isolationChannelClass: z
            .enum(['high_throughput', 'low_power_mesh'])
            .optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ProtocolDomainListResponse = z
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
                  id: z.string().regex(/^prd_[0-9a-z]{26}$/),
                  protocolFamily: z.enum([
                    'mqtt_coap',
                    'rpl_6lowpan',
                    'bt_mesh',
                    'v2x',
                    'http_rich',
                    'other',
                  ]),
                  tierId: z.string(),
                  gatewayConfigVersion: z.string().optional(),
                  status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
                  isolationChannelClass: z
                    .enum(['high_throughput', 'low_power_mesh'])
                    .optional(),
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
const ProtocolDomainCreate = z
  .object({
    protocolFamily: z.enum([
      'mqtt_coap',
      'rpl_6lowpan',
      'bt_mesh',
      'v2x',
      'http_rich',
      'other',
    ]),
    tierId: z.string(),
    gatewayConfigVersion: z.string().optional(),
    isolationChannelClass: z
      .enum(['high_throughput', 'low_power_mesh'])
      .optional(),
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
const ProtocolDomainResponse = z
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
            id: z.string().regex(/^prd_[0-9a-z]{26}$/),
            protocolFamily: z.enum([
              'mqtt_coap',
              'rpl_6lowpan',
              'bt_mesh',
              'v2x',
              'http_rich',
              'other',
            ]),
            tierId: z.string(),
            gatewayConfigVersion: z.string().optional(),
            status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
            isolationChannelClass: z
              .enum(['high_throughput', 'low_power_mesh'])
              .optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const GatewayConfigPush = z
  .object({
    configVersion: z.string(),
    rolloutRing: z.enum(['canary', 'ring1', 'ring2', 'all']).optional(),
  })
  .passthrough();
const IsolationPolicyUpdate = z
  .object({
    highThroughputWeight: z.number().int().gte(0).lte(100),
    lowPowerWeight: z.number().int().gte(0).lte(100),
    stormProtection: z.boolean().optional(),
  })
  .passthrough();
const IsolationPolicy = z
  .object({
    domainId: z.string(),
    highThroughputWeight: z.number().int().gte(0).lte(100),
    lowPowerWeight: z.number().int().gte(0).lte(100),
    stormProtection: z.boolean().optional().default(true),
  })
  .passthrough();
const IsolationPolicyResponse = z
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
            domainId: z.string(),
            highThroughputWeight: z.number().int().gte(0).lte(100),
            lowPowerWeight: z.number().int().gte(0).lte(100),
            stormProtection: z.boolean().optional().default(true),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  onboardProtocolDomain_Body,
  pushGatewayConfig_Body,
  updateIsolationPolicy_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  ProtocolDomainId,
  ProtocolFamily,
  ProtocolDomainStatus,
  ChannelClass,
  ProtocolDomain,
  ProtocolDomainListData,
  ProtocolDomainListResponse,
  ProtocolDomainCreate,
  DataEnvelope,
  ProtocolDomainResponse,
  GatewayConfigPush,
  IsolationPolicyUpdate,
  IsolationPolicy,
  IsolationPolicyResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/domains',
    alias: 'listProtocolDomains',
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
                      id: z.string().regex(/^prd_[0-9a-z]{26}$/),
                      protocolFamily: z.enum([
                        'mqtt_coap',
                        'rpl_6lowpan',
                        'bt_mesh',
                        'v2x',
                        'http_rich',
                        'other',
                      ]),
                      tierId: z.string(),
                      gatewayConfigVersion: z.string().optional(),
                      status: z.enum([
                        'pending',
                        'healthy',
                        'degraded',
                        'failed',
                      ]),
                      isolationChannelClass: z
                        .enum(['high_throughput', 'low_power_mesh'])
                        .optional(),
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
    path: '/v1/domains',
    alias: 'onboardProtocolDomain',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: onboardProtocolDomain_Body,
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
                id: z.string().regex(/^prd_[0-9a-z]{26}$/),
                protocolFamily: z.enum([
                  'mqtt_coap',
                  'rpl_6lowpan',
                  'bt_mesh',
                  'v2x',
                  'http_rich',
                  'other',
                ]),
                tierId: z.string(),
                gatewayConfigVersion: z.string().optional(),
                status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
                isolationChannelClass: z
                  .enum(['high_throughput', 'low_power_mesh'])
                  .optional(),
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
    path: '/v1/domains/:domainId',
    alias: 'getProtocolDomain',
    requestFormat: 'json',
    parameters: [
      {
        name: 'domainId',
        type: 'Path',
        schema: z.string().regex(/^prd_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^prd_[0-9a-z]{26}$/),
                protocolFamily: z.enum([
                  'mqtt_coap',
                  'rpl_6lowpan',
                  'bt_mesh',
                  'v2x',
                  'http_rich',
                  'other',
                ]),
                tierId: z.string(),
                gatewayConfigVersion: z.string().optional(),
                status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
                isolationChannelClass: z
                  .enum(['high_throughput', 'low_power_mesh'])
                  .optional(),
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
    path: '/v1/domains/:domainId/gateway-config',
    alias: 'pushGatewayConfig',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: pushGatewayConfig_Body,
      },
      {
        name: 'domainId',
        type: 'Path',
        schema: z.string().regex(/^prd_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^prd_[0-9a-z]{26}$/),
                protocolFamily: z.enum([
                  'mqtt_coap',
                  'rpl_6lowpan',
                  'bt_mesh',
                  'v2x',
                  'http_rich',
                  'other',
                ]),
                tierId: z.string(),
                gatewayConfigVersion: z.string().optional(),
                status: z.enum(['pending', 'healthy', 'degraded', 'failed']),
                isolationChannelClass: z
                  .enum(['high_throughput', 'low_power_mesh'])
                  .optional(),
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
    method: 'put',
    path: '/v1/domains/:domainId/isolation',
    alias: 'updateIsolationPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateIsolationPolicy_Body,
      },
      {
        name: 'domainId',
        type: 'Path',
        schema: z.string().regex(/^prd_[0-9a-z]{26}$/),
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
                domainId: z.string(),
                highThroughputWeight: z.number().int().gte(0).lte(100),
                lowPowerWeight: z.number().int().gte(0).lte(100),
                stormProtection: z.boolean().optional().default(true),
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
