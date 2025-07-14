/**
 * @generated SignedSource<<0b49267f9ad017f716cd5bbbbb406be1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkspaceInfoQuery$variables = Record<PropertyKey, never>;
export type WorkspaceInfoQuery$data = {
  readonly workspaces: ReadonlyArray<{
    readonly contactEmail: string | null | undefined;
    readonly contactPhone: string | null | undefined;
    readonly id: string;
    readonly logo: string | null | undefined;
    readonly metadata: any | null | undefined;
    readonly name: string;
    readonly rawId: string;
    readonly websiteID: string;
    readonly websiteUrl: string;
  }>;
};
export type WorkspaceInfoQuery = {
  response: WorkspaceInfoQuery$data;
  variables: WorkspaceInfoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Workspace",
    "kind": "LinkedField",
    "name": "workspaces",
    "plural": true,
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
        "name": "rawId",
        "storageKey": null
      },
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
        "name": "websiteID",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "websiteUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "logo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "contactEmail",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "contactPhone",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "metadata",
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
    "name": "WorkspaceInfoQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkspaceInfoQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "88e71166d3afb7662111a8ae59055aa7",
    "id": null,
    "metadata": {},
    "name": "WorkspaceInfoQuery",
    "operationKind": "query",
    "text": "query WorkspaceInfoQuery {\n  workspaces {\n    id\n    rawId\n    name\n    websiteID\n    websiteUrl\n    logo\n    contactEmail\n    contactPhone\n    metadata\n  }\n}\n"
  }
};
})();

(node as any).hash = "6775fe7115412da8f2ea9843a9bc2892";

export default node;
