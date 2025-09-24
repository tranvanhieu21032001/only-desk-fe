/**
 * @generated SignedSource<<e96768241b3863ebdd24996172a7baab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContactGender = "FEMALE" | "MALE" | "%future added value";
export type CreateConversationForContactMutation$variables = {
  contactId: string;
};
export type CreateConversationForContactMutation$data = {
  readonly createConversationForContact: {
    readonly contact: {
      readonly address: string | null | undefined;
      readonly email: string | null | undefined;
      readonly gender: ContactGender | null | undefined;
      readonly id: string;
      readonly name: string | null | undefined;
      readonly phoneNumber: string | null | undefined;
    } | null | undefined;
    readonly createdAt: any | null | undefined;
    readonly id: string;
    readonly segments: ReadonlyArray<string> | null | undefined;
    readonly subject: string | null | undefined;
  };
};
export type CreateConversationForContactMutation = {
  response: CreateConversationForContactMutation$data;
  variables: CreateConversationForContactMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "contactId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "contactId",
        "variableName": "contactId"
      }
    ],
    "concreteType": "Conversation",
    "kind": "LinkedField",
    "name": "createConversationForContact",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subject",
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
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Contact",
        "kind": "LinkedField",
        "name": "contact",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "name": "gender",
            "storageKey": null
          }
        ],
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
    "name": "CreateConversationForContactMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateConversationForContactMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "adf900cbf0df6908fea95908357e6c75",
    "id": null,
    "metadata": {},
    "name": "CreateConversationForContactMutation",
    "operationKind": "mutation",
    "text": "mutation CreateConversationForContactMutation(\n  $contactId: ID!\n) {\n  createConversationForContact(contactId: $contactId) {\n    id\n    subject\n    segments\n    createdAt\n    contact {\n      id\n      name\n      email\n      phoneNumber\n      address\n      gender\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e1f3e7850c5e41f8879976dbf812f35";

export default node;
