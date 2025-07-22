/**
 * @generated SignedSource<<db5904ef72d2ad566dcfa3ad94329d92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContactByCoversationIdQuery$variables = {
  id: string;
};
export type ContactByCoversationIdQuery$data = {
  readonly node: {
    readonly assignedTo?: {
      readonly id: string;
    } | null | undefined;
    readonly closedAt?: any | null | undefined;
    readonly contact?: {
      readonly avatar: string | null | undefined;
      readonly email: string | null | undefined;
      readonly id: string;
      readonly isOnline: boolean;
      readonly name: string;
      readonly rawId: string;
    } | null | undefined;
    readonly createdAt?: any | null | undefined;
    readonly id?: string;
    readonly lastActivityAt?: any | null | undefined;
    readonly latestMessage?: {
      readonly content: string;
    } | null | undefined;
    readonly metadata?: any | null | undefined;
    readonly rawId?: string;
    readonly segments?: ReadonlyArray<string> | null | undefined;
    readonly subject?: string | null | undefined;
    readonly unreadCount?: number | null | undefined;
    readonly updatedAt?: any | null | undefined;
  } | null | undefined;
};
export type ContactByCoversationIdQuery = {
  response: ContactByCoversationIdQuery$data;
  variables: ContactByCoversationIdQuery$variables;
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
      "name": "email",
      "storageKey": null
    },
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
  "name": "metadata",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "segments",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadCount",
  "storageKey": null
},
v13 = {
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactByCoversationIdQuery",
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
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "latestMessage",
                "plural": false,
                "selections": [
                  (v14/*: any*/)
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
    "name": "ContactByCoversationIdQuery",
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
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "latestMessage",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
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
    "cacheID": "090c222e6aafa6e3007caec0337d1e86",
    "id": null,
    "metadata": {},
    "name": "ContactByCoversationIdQuery",
    "operationKind": "query",
    "text": "query ContactByCoversationIdQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Conversation {\n      id\n      rawId\n      contact {\n        id\n        rawId\n        email\n        avatar\n        name\n        isOnline\n      }\n      subject\n      metadata\n      segments\n      createdAt\n      updatedAt\n      lastActivityAt\n      closedAt\n      unreadCount\n      assignedTo {\n        id\n      }\n      latestMessage {\n        content\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc14e858ecb33bc115876e39f8bec875";

export default node;
