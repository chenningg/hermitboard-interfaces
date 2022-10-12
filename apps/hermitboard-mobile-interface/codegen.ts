import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  debug: true,
  schema: "http://192.168.1.251:5050/api",
  documents: "./src/graphql/queries/*.graphql",
  generates: {
    "./src/graphql/generated/index.ts": {
      plugins: [
        {
          typescript: {},
        },
        {
          "typescript-operations": {},
        },
        {
          "typed-document-node": {},
        },
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
