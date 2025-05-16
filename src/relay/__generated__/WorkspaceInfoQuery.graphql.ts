/**
 * @generated SignedSource<<2f3f106a5c1012a09528851edb85d85a>>
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
    readonly id: string;
    readonly logo: string | null | undefined;
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
    "cacheID": "927328982470f3e181a51c62254122e3",
    "id": null,
    "metadata": {},
    "name": "WorkspaceInfoQuery",
    "operationKind": "query",
    "text": "query WorkspaceInfoQuery {\n  workspaces {\n    id\n    name\n    websiteID\n    websiteUrl\n    logo\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2b09d0b9f2c33789bf3eb74b5678e03";

export default node;
