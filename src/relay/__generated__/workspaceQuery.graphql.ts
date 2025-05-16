/**
 * @generated SignedSource<<c22519b3ac0fcb49a08e027db7a178d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkspaceMemberRole = "ADMIN" | "DEVELOPER" | "SUPPORTER" | "VIEWER" | "%future added value";
export type workspaceQuery$variables = Record<PropertyKey, never>;
export type workspaceQuery$data = {
  readonly workspaces: ReadonlyArray<{
    readonly contactEmail: string | null | undefined;
    readonly contactPhone: string | null | undefined;
    readonly id: string;
    readonly logo: string | null | undefined;
    readonly name: string;
    readonly owner: {
      readonly email: string;
      readonly firstName: string | null | undefined;
    } | null | undefined;
    readonly role: WorkspaceMemberRole | null | undefined;
    readonly websiteID: string;
    readonly websiteUrl: string;
  }>;
};
export type workspaceQuery = {
  response: workspaceQuery$data;
  variables: workspaceQuery$variables;
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
  "name": "websiteID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "websiteUrl",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "logo",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactEmail",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPhone",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "workspaceQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspaces",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
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
    "name": "workspaceQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspaces",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "75b31f5e3c7f195ad7c5059bc4efef44",
    "id": null,
    "metadata": {},
    "name": "workspaceQuery",
    "operationKind": "query",
    "text": "query workspaceQuery {\n  workspaces {\n    id\n    name\n    websiteID\n    websiteUrl\n    logo\n    contactEmail\n    contactPhone\n    owner {\n      firstName\n      email\n      id\n    }\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f286a6c8d9db77e2cfbcc96dafbcc13";

export default node;
