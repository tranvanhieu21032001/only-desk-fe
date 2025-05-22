/**
 * @generated SignedSource<<fb6a083d7613ecb367071e4ca212a752>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PaginationArgs = {
  first?: number | null | undefined;
  last?: number | null | undefined;
  offset?: number | null | undefined;
};
export type ContactsQuery$variables = {
  args: PaginationArgs;
  workspaceId: string;
};
export type ContactsQuery$data = {
  readonly contacts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly address: string | null | undefined;
        readonly companyInfo: any;
        readonly email: string;
        readonly id: string;
        readonly lastActivityAt: any | null | undefined;
        readonly name: string;
        readonly segments: ReadonlyArray<string>;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null | undefined;
    };
    readonly totalCount: number;
  };
};
export type ContactsQuery = {
  response: ContactsQuery$data;
  variables: ContactsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "args"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspaceId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "args",
        "variableName": "args"
      },
      {
        "kind": "Variable",
        "name": "workspaceId",
        "variableName": "workspaceId"
      }
    ],
    "concreteType": "ContactPagination",
    "kind": "LinkedField",
    "name": "contacts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ContactTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Contact",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "address",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "segments",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastActivityAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "companyInfo",
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
        "kind": "ScalarField",
        "name": "totalCount",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ContactsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ef93ec1a37f6814e8ce19ba64e772dc8",
    "id": null,
    "metadata": {},
    "name": "ContactsQuery",
    "operationKind": "query",
    "text": "query ContactsQuery(\n  $workspaceId: ID!\n  $args: PaginationArgs!\n) {\n  contacts(workspaceId: $workspaceId, args: $args) {\n    edges {\n      node {\n        name\n        id\n        email\n        address\n        segments\n        lastActivityAt\n        companyInfo\n      }\n    }\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "30d8b0befec8df75b63b81d6822a8a6f";

export default node;
