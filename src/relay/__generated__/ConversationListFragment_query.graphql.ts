/**
 * @generated SignedSource<<7187b6a8b4c87fd11e8de6354eecb3b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationListFragment_query$data = {
  readonly conversations: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly assignedTo: {
          readonly id: string;
        } | null | undefined;
        readonly closedAt: any | null | undefined;
        readonly contact: {
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
        readonly createdAt: any | null | undefined;
        readonly id: string;
        readonly lastActivityAt: any | null | undefined;
        readonly latestMessage: {
          readonly content: string;
        } | null | undefined;
        readonly metadata: any | null | undefined;
        readonly rawId: string;
        readonly resolved: boolean | null | undefined;
        readonly subject: string | null | undefined;
        readonly unreadCount: number | null | undefined;
        readonly updatedAt: any | null | undefined;
      };
    }>;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
  };
  readonly " $fragmentType": "ConversationListFragment_query";
};
export type ConversationListFragment_query$key = {
  readonly " $data"?: ConversationListFragment_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationListFragment_query">;
};

import ConversationListPaginationQuery_graphql from './ConversationListPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "conversations"
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
  "name": "rawId",
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
      "defaultValue": 10,
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
      "operation": ConversationListPaginationQuery_graphql
    }
  },
  "name": "ConversationListFragment_query",
  "selections": [
    {
      "alias": "conversations",
      "args": null,
      "concreteType": "ConversationConnection",
      "kind": "LinkedField",
      "name": "__ConversationListFragment_conversations_connection",
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
          "concreteType": "ConversationTypeEdge",
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
              "concreteType": "Conversation",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Contact",
                  "kind": "LinkedField",
                  "name": "contact",
                  "plural": false,
                  "selections": [
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
                    (v1/*: any*/),
                    (v2/*: any*/),
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
                  "name": "resolved",
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
                  "name": "lastActivityAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "closedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "unreadCount",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "assignedTo",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Message",
                  "kind": "LinkedField",
                  "name": "latestMessage",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "content",
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

(node as any).hash = "be23205696035a9eb9a918f96c10d647";

export default node;
