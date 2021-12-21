/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require("esbuild");

const opts = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  logLevel: "debug",
};

const cjsOpts = {
  ...opts,
  format: "cjs",
  platform: "node",
  target: "node14",
};

const esmOpts = {
  ...opts,
  format: "esm",
  platform: "browser",
  target: "ES2017",
};

// CJS (node)
esbuild
  .build({
    ...cjsOpts,
    minify: false,
    outfile: "dist/scalingo.js",
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...cjsOpts,
    minify: true,
    outfile: "dist/scalingo.min.js",
  })
  .catch(() => process.exit(1));

// ESM (browser or before transpiling)
esbuild
  .build({
    ...esmOpts,
    minify: false,
    outfile: "dist/scalingo.esm.js",
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...esmOpts,
    minify: true,
    outfile: "dist/scalingo.min.esm.js",
  })
  .catch(() => process.exit(1));
