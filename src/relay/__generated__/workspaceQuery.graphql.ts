/**
 * @generated SignedSource<<c4777db0db887db56939c1b87e4192ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type WorkspaceQuery$variables = Record<PropertyKey, never>;
export type WorkspaceQuery$data = {
  readonly workspaces: ReadonlyArray<{
    readonly id: string;
    readonly logo: string | null | undefined;
    readonly name: string;
    readonly websiteID: string;
    readonly websiteUrl: string;
  }>;
};
export type WorkspaceQuery = {
  response: WorkspaceQuery$data;
  variables: WorkspaceQuery$variables;
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
    "name": "WorkspaceQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkspaceQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b4e6dc1833e580193fb15901f0a68b75",
    "id": null,
    "metadata": {},
    "name": "WorkspaceQuery",
    "operationKind": "query",
    "text": "query WorkspaceQuery {\n  workspaces {\n    id\n    name\n    websiteID\n    websiteUrl\n    logo\n  }\n}\n"
  }
};
})();

(node as any).hash = "10a673caa673d5aaa0430edd2b5266b0";

export default node;
