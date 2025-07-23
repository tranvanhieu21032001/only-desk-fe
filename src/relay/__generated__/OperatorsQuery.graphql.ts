/**
 * @generated SignedSource<<72a45a6ddfc2a32eb360ad815eddd9ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkspaceMemberRole = "ADMIN" | "DEVELOPER" | "%future added value";
export type WorkspaceMemberStatus = "APRROVED" | "PENDING" | "REJECTED" | "%future added value";
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OperatorsQuery",
    "selections": [
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OperatorsQuery",
    "selections": [
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v1/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d427d02fa5dadb12dd7555fd146a47ff",
    "id": null,
    "metadata": {},
    "name": "OperatorsQuery",
    "operationKind": "query",
    "text": "query OperatorsQuery {\n  operators {\n    id\n    rawId\n    user {\n      avatar\n      firstName\n      lastName\n      email\n      rawId\n      id\n    }\n    role\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d640090fd9d25bd8f834fe7e2ceb3c9";

export default node;
