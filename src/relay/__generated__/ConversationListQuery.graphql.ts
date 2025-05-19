/**
 * @generated SignedSource<<bed68f4782ea4a7d9bf47f2d32e5305e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ConversationStatus = "ACTIVE" | "CLOSED" | "PENDING" | "%future added value";
export type ConnectionArgs = {
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
};
export type ConversationListQuery$variables = {
  args: ConnectionArgs;
  workspaceId: string;
};
export type ConversationListQuery$data = {
  readonly conversations: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly assignedTo: {
          readonly id: string;
        } | null | undefined;
        readonly closedAt: any | null | undefined;
        readonly createdAt: any;
        readonly guestIdentifier: string;
        readonly guestName: string | null | undefined;
        readonly id: string;
        readonly lastActivityAt: any;
        readonly latestMessage: {
          readonly content: string;
        } | null | undefined;
        readonly metadata: any | null | undefined;
        readonly status: ConversationStatus;
        readonly subject: string | null | undefined;
        readonly unreadAgentCount: number | null | undefined;
        readonly unreadGuestCount: number | null | undefined;
        readonly updatedAt: any;
      };
    }>;
  };
};
export type ConversationListQuery = {
  response: ConversationListQuery$data;
  variables: ConversationListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "args"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspaceId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "args",
    "variableName": "args"
  },
  {
    "kind": "Variable",
    "name": "workspaceId",
    "variableName": "workspaceId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "guestName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "guestIdentifier",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "subject",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metadata",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "closedAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadGuestCount",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadAgentCount",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "assignedTo",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ConversationConnection",
        "kind": "LinkedField",
        "name": "conversations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Conversation",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
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
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "latestMessage",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ConversationListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ConversationConnection",
        "kind": "LinkedField",
        "name": "conversations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConversationTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Conversation",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
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
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "latestMessage",
                    "plural": false,
                    "selections": [
                      (v17/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff03ef985e75974b249f2854ee078556",
    "id": null,
    "metadata": {},
    "name": "ConversationListQuery",
    "operationKind": "query",
    "text": "query ConversationListQuery(\n  $workspaceId: ID!\n  $args: ConnectionArgs!\n) {\n  conversations(workspaceId: $workspaceId, args: $args) {\n    edges {\n      cursor\n      node {\n        id\n        guestName\n        guestIdentifier\n        status\n        subject\n        metadata\n        createdAt\n        updatedAt\n        lastActivityAt\n        closedAt\n        unreadGuestCount\n        unreadAgentCount\n        assignedTo {\n          id\n        }\n        latestMessage {\n          content\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "98d6733c3e8e21c5f40c4bdfc69cdf16";

export default node;
