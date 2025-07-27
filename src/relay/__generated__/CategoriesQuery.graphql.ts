/**
 * @generated SignedSource<<da07fa1e2585f54f5b06c8da949f708a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoriesQuery$variables = Record<PropertyKey, never>;
export type CategoriesQuery$data = {
  readonly helpdeskCategories: ReadonlyArray<{
    readonly articles: ReadonlyArray<{
      readonly content: string;
      readonly createdAt: any | null | undefined;
      readonly id: string;
      readonly rawId: string;
      readonly title: string;
      readonly updatedAt: any | null | undefined;
    }> | null | undefined;
    readonly createdAt: any | null | undefined;
    readonly desc: string | null | undefined;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
    readonly sections: ReadonlyArray<{
      readonly articles: ReadonlyArray<{
        readonly content: string;
        readonly createdAt: any | null | undefined;
        readonly id: string;
        readonly rawId: string;
        readonly title: string;
        readonly updatedAt: any | null | undefined;
      }> | null | undefined;
      readonly createdAt: any | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly updatedAt: any | null | undefined;
    }> | null | undefined;
    readonly updatedAt: any | null | undefined;
  }>;
};
export type CategoriesQuery = {
  response: CategoriesQuery$data;
  variables: CategoriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "HelpdeskArticle",
  "kind": "LinkedField",
  "name": "articles",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rawId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "HelpdeskCategory",
    "kind": "LinkedField",
    "name": "helpdeskCategories",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "desc",
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskCategorySection",
        "kind": "LinkedField",
        "name": "sections",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
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
    "name": "CategoriesQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "514c786ebc100db29474bfdebc21af2e",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  helpdeskCategories {\n    id\n    name\n    image\n    desc\n    createdAt\n    updatedAt\n    articles {\n      id\n      rawId\n      title\n      content\n      createdAt\n      updatedAt\n    }\n    sections {\n      id\n      name\n      createdAt\n      updatedAt\n      articles {\n        id\n        rawId\n        title\n        content\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d81ebd4cec668fb7a6f6ed373bb3447";

export default node;
