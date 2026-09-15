import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: false,
  outDir: 'dist',
  external: [
    '@tierfog/core',
    '@tierfog/services',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-s3',
    'ulid',
    'pdf-lib',
    '@pdf-lib/fontkit',
  ],
});
