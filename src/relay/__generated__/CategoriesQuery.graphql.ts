/**
 * @generated SignedSource<<960e6ca5dd823d8d4e4b7ca7776a4401>>
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
    readonly createdAt: any | null | undefined;
    readonly desc: string | null | undefined;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly name: string;
    readonly sections: ReadonlyArray<{
      readonly articles: ReadonlyArray<{
        readonly content: string;
        readonly id: string;
        readonly title: string;
      }> | null | undefined;
      readonly createdAt: any | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly updatedAt: any | null | undefined;
    }> | null | undefined;
    readonly slug: string;
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
v4 = [
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      (v2/*: any*/),
      (v3/*: any*/),
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
              }
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
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "52d145045071cbdb4e171627537c286a",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  helpdeskCategories {\n    id\n    name\n    image\n    desc\n    slug\n    createdAt\n    updatedAt\n    sections {\n      id\n      name\n      createdAt\n      updatedAt\n      articles {\n        id\n        title\n        content\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "84d3c4128860bbb183525f720b8f6be2";

export default node;
