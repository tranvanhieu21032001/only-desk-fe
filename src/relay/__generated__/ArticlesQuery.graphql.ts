/**
 * @generated SignedSource<<b87920d0504baf368cb2df80c4c7e6f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ArticlesQuery$variables = {
  keyword?: string | null | undefined;
};
export type ArticlesQuery$data = {
  readonly helpdeskArticles: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: string;
        readonly createdAt: any | null | undefined;
        readonly id: string;
        readonly title: string;
        readonly updatedAt: any | null | undefined;
        readonly url: string;
      };
    }>;
  };
};
export type ArticlesQuery = {
  response: ArticlesQuery$data;
  variables: ArticlesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      }
    ],
    "concreteType": "HelpdeskArticleConnection",
    "kind": "LinkedField",
    "name": "helpdeskArticles",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskArticleTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "HelpdeskArticle",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArticlesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArticlesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "061e9d781584f8b8bb49a3505fc53c94",
    "id": null,
    "metadata": {},
    "name": "ArticlesQuery",
    "operationKind": "query",
    "text": "query ArticlesQuery(\n  $keyword: String\n) {\n  helpdeskArticles(keyword: $keyword) {\n    edges {\n      node {\n        id\n        title\n        content\n        url\n        createdAt\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f758d87ebe210c5992c2efd9f46e2c66";

export default node;
