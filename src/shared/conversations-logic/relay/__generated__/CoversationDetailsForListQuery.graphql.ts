/**
 * @generated SignedSource<<97534c46df17f0f3850f28ccb92e3a92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MessageTypeEnum = "FILE" | "IMAGE" | "NOTE" | "RESOLVED" | "SYSTEM" | "TEXT" | "%future added value";
export type CoversationDetailsForListQuery$variables = {
  id: string;
};
export type CoversationDetailsForListQuery$data = {
  readonly node: {
    readonly assignedTo?: {
      readonly id: string;
    } | null | undefined;
    readonly contact?: {
      readonly avatar: string | null | undefined;
      readonly context: {
        readonly countryCode: string | null | undefined;
      } | null | undefined;
      readonly email: string | null | undefined;
      readonly id: string;
      readonly isOnline: boolean;
      readonly name: string;
      readonly rawId: string;
    } | null | undefined;
    readonly id?: string;
    readonly lastActivityAt?: any | null | undefined;
    readonly latestMessage?: {
      readonly content: string | null | undefined;
      readonly type: MessageTypeEnum | null | undefined;
    } | null | undefined;
    readonly metadata?: any | null | undefined;
    readonly rawId?: string;
    readonly resolved?: boolean | null | undefined;
    readonly subject?: string | null | undefined;
    readonly unreadCount?: number | null | undefined;
  } | null | undefined;
};
export type CoversationDetailsForListQuery = {
  response: CoversationDetailsForListQuery$data;
  variables: CoversationDetailsForListQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rawId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Contact",
  "kind": "LinkedField",
  "name": "contact",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
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
      "name": "name",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ContactContext",
      "kind": "LinkedField",
      "name": "context",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subject",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resolved",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metadata",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "assignedTo",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CoversationDetailsForListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "latestMessage",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Conversation",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CoversationDetailsForListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "latestMessage",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Conversation",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "305ab6cde1771a67ec38290734a11f2b",
    "id": null,
    "metadata": {},
    "name": "CoversationDetailsForListQuery",
    "operationKind": "query",
    "text": "query CoversationDetailsForListQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Conversation {\n      id\n      rawId\n      contact {\n        id\n        rawId\n        avatar\n        name\n        isOnline\n        email\n        context {\n          countryCode\n        }\n      }\n      subject\n      resolved\n      metadata\n      lastActivityAt\n      unreadCount\n      assignedTo {\n        id\n      }\n      latestMessage {\n        content\n        type\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f295bf8c24f1a7ad5c00906045ca73d";

export default node;
