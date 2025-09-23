/**
 * @generated SignedSource<<ca9749fe0395e83065a40c62ba2d2962>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PluginCategory = "AUTOMATION" | "FEATURE" | "MARKETING" | "MESSAGING" | "OTHER" | "%future added value";
export type PluginType = "ESSENTIALS" | "FREE" | "MINI" | "PLUS" | "%future added value";
export type AllpluginsQuery$variables = {
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  keyword?: string | null | undefined;
  last?: number | null | undefined;
};
export type AllpluginsQuery$data = {
  readonly plugins: {
    readonly edges: ReadonlyArray<{
      readonly node: {
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
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
  };
};
export type AllpluginsQuery = {
  response: AllpluginsQuery$data;
  variables: AllpluginsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "keyword"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "after",
        "variableName": "after"
      },
      {
        "kind": "Variable",
        "name": "before",
        "variableName": "before"
      },
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      },
      {
        "kind": "Variable",
        "name": "last",
        "variableName": "last"
      }
    ],
    "concreteType": "PluginConnection",
    "kind": "LinkedField",
    "name": "plugins",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PluginTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Plugin",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
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
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPreviousPage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endCursor",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AllpluginsQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "AllpluginsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "93c48b0a85f938863855767a19596767",
    "id": null,
    "metadata": {},
    "name": "AllpluginsQuery",
    "operationKind": "query",
    "text": "query AllpluginsQuery(\n  $first: Float\n  $after: String\n  $last: Float\n  $before: String\n  $keyword: String\n) {\n  plugins(first: $first, after: $after, last: $last, before: $before, keyword: $keyword) {\n    edges {\n      node {\n        id\n        key\n        name\n        isInstalled\n        shortDesc\n        version\n        category\n        type\n        iconUrl\n        docUrl\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0221a378a6c9e02f0c5395d1ddec8ff4";

export default node;
