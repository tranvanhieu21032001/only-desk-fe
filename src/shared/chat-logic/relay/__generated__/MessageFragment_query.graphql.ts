/**
 * @generated SignedSource<<61dba8606bf2c1acd94ab829feaca31e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type MessageSender = "AGENT" | "GUEST" | "SYSTEM" | "%future added value";
export type MessageStatus = "DELIVERED" | "FAILED" | "READ" | "SENT" | "%future added value";
export type MessageTypeEnum = "FILE" | "IMAGE" | "INPUT" | "NOTE" | "REMINDER" | "RESOLVED" | "SYSTEM" | "TEXT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MessageFragment_query$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly content: string | null | undefined;
        readonly createdAt: any;
        readonly id: string;
        readonly metadata: any | null | undefined;
        readonly replyTo: {
          readonly content: string | null | undefined;
          readonly id: string;
          readonly metadata: any | null | undefined;
          readonly type: MessageTypeEnum | null | undefined;
          readonly user: {
            readonly avatar: string | null | undefined;
            readonly firstName: string | null | undefined;
            readonly id: string;
            readonly lastName: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
        readonly sender: MessageSender;
        readonly status: MessageStatus;
        readonly type: MessageTypeEnum | null | undefined;
        readonly updatedAt: any;
        readonly user: {
          readonly avatar: string | null | undefined;
          readonly firstName: string | null | undefined;
          readonly id: string;
          readonly lastName: string | null | undefined;
          readonly rawId: string;
        } | null | undefined;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  };
  readonly " $fragmentType": "MessageFragment_query";
};
export type MessageFragment_query$key = {
  readonly " $data"?: MessageFragment_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageFragment_query">;
};

import MessageFragmentPaginationQuery_graphql from './MessageFragmentPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "messages"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metadata",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "conversationId"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": MessageFragmentPaginationQuery_graphql
    }
  },
  "name": "MessageFragment_query",
  "selections": [
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Variable",
          "name": "conversationId",
          "variableName": "conversationId"
        }
      ],
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__MessageFragment_messages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "MessageTypeEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "sender",
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
                (v3/*: any*/),
                (v4/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "user",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "rawId",
                      "storageKey": null
                    },
                    (v5/*: any*/),
                    (v6/*: any*/),
                    (v7/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Message",
                  "kind": "LinkedField",
                  "name": "replyTo",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/),
                    (v4/*: any*/),
                    (v3/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "User",
                      "kind": "LinkedField",
                      "name": "user",
                      "plural": false,
                      "selections": [
                        (v1/*: any*/),
                        (v5/*: any*/),
                        (v6/*: any*/),
                        (v7/*: any*/)
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
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
};
})();

(node as any).hash = "bba7271f5eea04336b899d0cfb95b0c9";

export default node;
