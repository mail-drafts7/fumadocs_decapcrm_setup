// @ts-nocheck -- skip type checking
import * as meta_0 from "../content/docs/meta.json?collection=meta&hash=1759856285669"
import * as docs_2 from "../content/docs/testing.mdx?collection=docs&hash=1759856285669"
import * as docs_1 from "../content/docs/getting-started.mdx?collection=docs&hash=1759856285669"
import * as docs_0 from "../content/docs/api-contract.mdx?collection=docs&hash=1759856285669"
import { _runtime } from "fumadocs-mdx/runtime/next"
import * as _source from "../source.config"
export const docs = _runtime.doc<typeof _source.docs>([{ info: {"path":"api-contract.mdx","fullPath":"content/docs/api-contract.mdx"}, data: docs_0 }, { info: {"path":"getting-started.mdx","fullPath":"content/docs/getting-started.mdx"}, data: docs_1 }, { info: {"path":"testing.mdx","fullPath":"content/docs/testing.mdx"}, data: docs_2 }]);
export const meta = _runtime.meta<typeof _source.meta>([{ info: {"path":"meta.json","fullPath":"content/docs/meta.json"}, data: meta_0 }]);