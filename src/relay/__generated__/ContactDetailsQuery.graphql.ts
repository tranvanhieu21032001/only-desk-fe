/**
 * @generated SignedSource<<c6bf4434708892a873ea8b0ad35edc61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContactGender = "FEMALE" | "MALE" | "%future added value";
export type ContactDetailsQuery$variables = {
  id: string;
};
export type ContactDetailsQuery$data = {
  readonly contact: {
    readonly address: string | null | undefined;
    readonly companyInfo: any;
    readonly createdAt: any | null | undefined;
    readonly email: string | null | undefined;
    readonly gender: ContactGender | null | undefined;
    readonly id: string;
    readonly isOnline: boolean;
    readonly lastActivityAt: any | null | undefined;
    readonly metadata: any;
    readonly name: string;
    readonly notes: string | null | undefined;
    readonly notification: boolean;
    readonly phoneNumber: string | null | undefined;
    readonly segments: ReadonlyArray<string>;
    readonly trackingInfo: any;
    readonly updatedAt: any | null | undefined;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Contact",
    "kind": "LinkedField",
    "name": "contact",
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
        "name": "name",
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
        "name": "phoneNumber",
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
        "name": "notification",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "companyInfo",
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
        "name": "metadata",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "trackingInfo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "notes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isOnline",
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
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gender",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactDetailsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ContactDetailsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f92f750c8f883b1179a6912c58eacd6c",
    "id": null,
    "metadata": {},
    "name": "ContactDetailsQuery",
    "operationKind": "query",
    "text": "query ContactDetailsQuery(\n  $id: String!\n) {\n  contact(id: $id) {\n    id\n    name\n    email\n    phoneNumber\n    address\n    notification\n    companyInfo\n    segments\n    metadata\n    trackingInfo\n    notes\n    isOnline\n    lastActivityAt\n    createdAt\n    updatedAt\n    gender\n  }\n}\n"
  }
};
})();

(node as any).hash = "876040208a7d1f2f7ec78e07b937cbf4";

export default node;
