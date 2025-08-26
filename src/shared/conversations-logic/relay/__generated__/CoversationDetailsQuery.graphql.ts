/**
 * @generated SignedSource<<bc5e27867335b3e34330839e4f5514a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CoversationDetailsQuery$variables = {
  id: string;
};
export type CoversationDetailsQuery$data = {
  readonly node: {
    readonly assignedTo?: {
      readonly id: string;
    } | null | undefined;
    readonly closedAt?: any | null | undefined;
    readonly contact?: {
      readonly avatar: string | null | undefined;
      readonly context: {
        readonly browser: string | null | undefined;
        readonly city: string | null | undefined;
        readonly countryCode: string | null | undefined;
        readonly countryName: string | null | undefined;
        readonly language: string | null | undefined;
        readonly latitude: number | null | undefined;
        readonly longitude: number | null | undefined;
        readonly os: string | null | undefined;
        readonly timezone: string | null | undefined;
      } | null | undefined;
      readonly email: string | null | undefined;
      readonly guestId: string | null | undefined;
      readonly id: string;
      readonly isOnline: boolean;
      readonly name: string | null | undefined;
      readonly notification: boolean;
      readonly rawId: string;
    } | null | undefined;
    readonly createdAt?: any | null | undefined;
    readonly id?: string;
    readonly lastActivityAt?: any | null | undefined;
    readonly metadata?: any | null | undefined;
    readonly participants?: ReadonlyArray<{
      readonly avatar: string | null | undefined;
      readonly email: string;
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly isOnline: boolean;
      readonly lastName: string | null | undefined;
    }> | null | undefined;
    readonly rawId?: string;
    readonly resolved?: boolean | null | undefined;
    readonly segments?: ReadonlyArray<string> | null | undefined;
    readonly subject?: string | null | undefined;
    readonly unreadCount?: number | null | undefined;
    readonly updatedAt?: any | null | undefined;
  } | null | undefined;
};
export type CoversationDetailsQuery = {
  response: CoversationDetailsQuery$data;
  variables: CoversationDetailsQuery$variables;
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
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOnline",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Contact",
  "kind": "LinkedField",
  "name": "contact",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "guestId",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timezone",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "language",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "browser",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "os",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "participants",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/),
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
      "name": "lastName",
      "storageKey": null
    },
    (v5/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subject",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metadata",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resolved",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "segments",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closedAt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadCount",
  "storageKey": null
},
v18 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CoversationDetailsQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/)
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
    "name": "CoversationDetailsQuery",
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/)
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
    "cacheID": "6e04f51e90583357b32de4db5a21b37e",
    "id": null,
    "metadata": {},
    "name": "CoversationDetailsQuery",
    "operationKind": "query",
    "text": "query CoversationDetailsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Conversation {\n      id\n      rawId\n      contact {\n        id\n        rawId\n        email\n        avatar\n        name\n        isOnline\n        guestId\n        notification\n        context {\n          countryCode\n          countryName\n          city\n          timezone\n          language\n          latitude\n          longitude\n          browser\n          os\n        }\n      }\n      participants {\n        id\n        email\n        firstName\n        lastName\n        avatar\n        isOnline\n      }\n      subject\n      metadata\n      resolved\n      segments\n      createdAt\n      updatedAt\n      lastActivityAt\n      closedAt\n      unreadCount\n      assignedTo {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5ba0abb2d66007e425e9d7175ddc7bc6";

export default node;
