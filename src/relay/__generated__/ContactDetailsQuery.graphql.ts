/**
 * @generated SignedSource<<a616717769bf78c38b7dca7cc1f9e164>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContactDetailsQuery$variables = {
  id: string;
};
export type ContactDetailsQuery$data = {
  readonly node: {
    readonly address?: string | null | undefined;
    readonly companyInfo?: {
      readonly company: string | null | undefined;
      readonly jobTitle: string | null | undefined;
    } | null | undefined;
    readonly email?: string | null | undefined;
    readonly id?: string;
    readonly lastActivityAt?: any | null | undefined;
    readonly name?: string;
    readonly phoneNumber?: string | null | undefined;
    readonly segments?: ReadonlyArray<string>;
  } | null | undefined;
};
export type ContactDetailsQuery = {
  response: ContactDetailsQuery$data;
  variables: ContactDetailsQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "CompanyInfo",
  "kind": "LinkedField",
  "name": "companyInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "company",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobTitle",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "segments",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactDetailsQuery",
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
              (v9/*: any*/)
            ],
            "type": "Contact",
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
    "name": "ContactDetailsQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
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
              (v9/*: any*/)
            ],
            "type": "Contact",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "87efe076a1e4a6c846229f4d9818022d",
    "id": null,
    "metadata": {},
    "name": "ContactDetailsQuery",
    "operationKind": "query",
    "text": "query ContactDetailsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Contact {\n      id\n      name\n      email\n      phoneNumber\n      address\n      companyInfo {\n        company\n        jobTitle\n      }\n      segments\n      lastActivityAt\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d310e0e1624c5bf794b451fc8120c63";

export default node;
