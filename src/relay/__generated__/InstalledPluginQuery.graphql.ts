/**
 * @generated SignedSource<<036c09794e6fed0def3cc8ad488c614b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PluginCategory = "AUTOMATION" | "FEATURE" | "MARKETING" | "MESSAGING" | "OTHER" | "%future added value";
export type PluginType = "ESSENTIALS" | "FREE" | "MINI" | "PLUS" | "%future added value";
export type InstalledPluginQuery$variables = Record<PropertyKey, never>;
export type InstalledPluginQuery$data = {
  readonly installedPlugins: ReadonlyArray<{
    readonly category: PluginCategory;
    readonly docUrl: string | null | undefined;
    readonly iconUrl: string | null | undefined;
    readonly id: string;
    readonly isInstalled: boolean | null | undefined;
    readonly key: string;
    readonly name: string;
    readonly shortDesc: string;
    readonly type: PluginType;
    readonly version: string;
  }>;
};
export type InstalledPluginQuery = {
  response: InstalledPluginQuery$data;
  variables: InstalledPluginQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Plugin",
    "kind": "LinkedField",
    "name": "installedPlugins",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "key",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isInstalled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "shortDesc",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "version",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "iconUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "docUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InstalledPluginQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InstalledPluginQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5622c6422b557f78d7993b8a67185622",
    "id": null,
    "metadata": {},
    "name": "InstalledPluginQuery",
    "operationKind": "query",
    "text": "query InstalledPluginQuery {\n  installedPlugins {\n    id\n    key\n    name\n    isInstalled\n    shortDesc\n    version\n    category\n    type\n    iconUrl\n    docUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f3ff8ceed8fa94130ccc0c00cca47b7";

export default node;
