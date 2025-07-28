/**
 * @generated SignedSource<<c0158e350e8b6c03dc8fac3ebed49a76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ArticleStatus = "ARCHIVED" | "DRAFT" | "PUBLISHED" | "%future added value";
export type CategoriesQuery$variables = Record<PropertyKey, never>;
export type CategoriesQuery$data = {
  readonly helpdeskCategories: ReadonlyArray<{
    readonly articles: ReadonlyArray<{
      readonly content: string;
      readonly createdAt: any | null | undefined;
      readonly id: string;
      readonly rawId: string;
      readonly status: ArticleStatus | null | undefined;
      readonly title: string;
      readonly updatedAt: any | null | undefined;
      readonly viewCount: number;
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
        readonly status: ArticleStatus | null | undefined;
        readonly title: string;
        readonly updatedAt: any | null | undefined;
        readonly viewCount: number;
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
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = [
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
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskArticle",
        "kind": "LinkedField",
        "name": "articles",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
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
          {
            "alias": null,
            "args": null,
            "concreteType": "HelpdeskArticle",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesQuery",
    "selections": (v9/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "93faf9e3ee148f808872662c01b923c0",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  helpdeskCategories {\n    id\n    name\n    image\n    desc\n    createdAt\n    updatedAt\n    articles {\n      id\n      rawId\n      title\n      content\n      viewCount\n      status\n      createdAt\n      updatedAt\n    }\n    sections {\n      id\n      name\n      createdAt\n      updatedAt\n      articles {\n        id\n        rawId\n        title\n        status\n        content\n        viewCount\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c72c5065622b4d354da4d2bb16535e62";

export default node;
