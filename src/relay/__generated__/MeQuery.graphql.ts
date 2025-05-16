/**
 * @generated SignedSource<<00a496272c1230ea8ed7017220ba0d24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MeQuery$variables = Record<PropertyKey, never>;
export type MeQuery$data = {
  readonly me: {
    readonly avatar: string | null | undefined;
    readonly email: string;
    readonly firstName: string | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type MeQuery = {
  response: MeQuery$data;
  variables: MeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "firstName",
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
        "name": "avatar",
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
    "name": "MeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "82515e8d41b4e076cd53f8ba06fc66c3",
    "id": null,
    "metadata": {},
    "name": "MeQuery",
    "operationKind": "query",
    "text": "query MeQuery {\n  me {\n    id\n    firstName\n    email\n    avatar\n  }\n}\n"
  }
};
})();

(node as any).hash = "f8db9de83a3655d85457d3e1aeacdccc";

export default node;
