/**
 * @generated SignedSource<<76ee86773063184acd10aeeb19110e02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PluginCategory = "AUTOMATION" | "FEATURE" | "MARKETING" | "MESSAGING" | "OTHER" | "%future added value";
export type PluginType = "ESSENTIALS" | "FREE" | "MINI" | "PLUS" | "%future added value";
export type PluginDetailQuery$variables = {
  id: string;
};
export type PluginDetailQuery$data = {
  readonly node: {
    readonly __typename: "Plugin";
    readonly author: {
      readonly domain: string | null | undefined;
      readonly name: string | null | undefined;
      readonly photo: string | null | undefined;
    } | null | undefined;
    readonly category: PluginCategory;
    readonly desc: string;
    readonly iconUrl: string | null | undefined;
    readonly id: string;
    readonly isInstalled: boolean | null | undefined;
    readonly key: string;
    readonly name: string;
    readonly rawId: string;
    readonly type: PluginType;
    readonly version: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type PluginDetailQuery = {
  response: PluginDetailQuery$data;
  variables: PluginDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "desc",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iconUrl",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstalled",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthorInfo",
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "photo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "domain",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PluginDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/)
            ],
            "type": "Plugin",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PluginDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v13/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "type": "Plugin",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9241b01897e1172d3fff64c9461367ef",
    "id": null,
    "metadata": {},
    "name": "PluginDetailQuery",
    "operationKind": "query",
    "text": "query PluginDetailQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Plugin {\n      id\n      rawId\n      key\n      name\n      type\n      desc\n      version\n      category\n      iconUrl\n      isInstalled\n      author {\n        name\n        photo\n        domain\n      }\n      __typename\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "28689136844de8464af5760f99a9d67c";

export default node;
