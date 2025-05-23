/**
 * @generated SignedSource<<f185bdfd6c7f7935748a529c93c8f4e9>>
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
    "cacheID": "35b32769c28784963887e2b5d13741fc",
    "id": null,
    "metadata": {},
    "name": "WorkspaceInfoQuery",
    "operationKind": "query",
    "text": "query WorkspaceInfoQuery {\n  workspaces {\n    id\n    name\n    websiteID\n    websiteUrl\n    logo\n    contactEmail\n    contactPhone\n    metadata\n  }\n}\n"
  }
};
})();

(node as any).hash = "4218a01e7c88085dd535127e895cee03";

export default node;
