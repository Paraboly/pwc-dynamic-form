import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "pwc-dynamic-form",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],

  // ideally we want to use the cache, but when fscache gets corrupted stencil can't get anything done.
  enableCache: false
};
