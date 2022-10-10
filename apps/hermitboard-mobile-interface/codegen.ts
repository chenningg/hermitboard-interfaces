import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://192.168.1.251:5050/api",
  documents: "src/graphql/*.ts",
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
        namingConvention: {
          enumValues: "keep",
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
