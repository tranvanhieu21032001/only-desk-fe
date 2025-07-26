/**
 * @generated SignedSource<<2af72db13ec7c4cd126e33ee1ac71be3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkspaceMemberRole = "ADMIN" | "DEVELOPER" | "%future added value";
export type WorkspaceMemberStatus = "APPROVED" | "PENDING" | "REJECTED" | "%future added value";
export type OperatorsQuery$variables = Record<PropertyKey, never>;
export type OperatorsQuery$data = {
  readonly operators: ReadonlyArray<{
    readonly id: string;
    readonly rawId: string;
    readonly role: WorkspaceMemberRole | null | undefined;
    readonly status: WorkspaceMemberStatus | null | undefined;
    readonly user: {
      readonly avatar: string | null | undefined;
      readonly email: string;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
      readonly rawId: string;
    } | null | undefined;
  }>;
};
export type OperatorsQuery = {
  response: OperatorsQuery$data;
  variables: OperatorsQuery$variables;
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
  "name": "rawId",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "WorkspaceMember",
    "kind": "LinkedField",
    "name": "operators",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
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
    "name": "OperatorsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OperatorsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f296a6eff91a5835fb4e176649bffb60",
    "id": null,
    "metadata": {},
    "name": "OperatorsQuery",
    "operationKind": "query",
    "text": "query OperatorsQuery {\n  operators {\n    id\n    rawId\n    user {\n      id\n      avatar\n      firstName\n      lastName\n      email\n      rawId\n    }\n    role\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "b76ec3f97deee3770f36f026810725e2";

export default node;
