/**
 * @generated SignedSource<<af6db65188d381e1ca66908dcbefaa86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MessageSender = "AGENT" | "GUEST" | "SYSTEM" | "%future added value";
export type SearchMessagesQuery$variables = {
  first?: number | null | undefined;
  keyword: string;
};
export type SearchMessagesQuery$data = {
  readonly searchMessages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: string | null | undefined;
        readonly conversation: {
          readonly id: string;
        } | null | undefined;
        readonly createdAt: any;
        readonly id: string;
        readonly sender: MessageSender;
        readonly user: {
          readonly avatar: string | null | undefined;
          readonly firstName: string | null | undefined;
          readonly id: string;
          readonly lastName: string | null | undefined;
        } | null | undefined;
      };
    }>;
  };
};
export type SearchMessagesQuery = {
  response: SearchMessagesQuery$data;
  variables: SearchMessagesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "keyword"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      }
    ],
    "concreteType": "MessageConnection",
    "kind": "LinkedField",
    "name": "searchMessages",
    "plural": false,
    "selections": [
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
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
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
                  (v2/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "avatar",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Conversation",
                "kind": "LinkedField",
                "name": "conversation",
                "plural": false,
                "selections": [
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchMessagesQuery",
    "selections": (v3/*: any*/),
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
    "name": "SearchMessagesQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "e4d9ea1fa18b0ae692b78ed82df645bc",
    "id": null,
    "metadata": {},
    "name": "SearchMessagesQuery",
    "operationKind": "query",
    "text": "query SearchMessagesQuery(\n  $keyword: String!\n  $first: Float\n) {\n  searchMessages(keyword: $keyword, first: $first) {\n    edges {\n      node {\n        id\n        content\n        user {\n          id\n          firstName\n          lastName\n          avatar\n        }\n        conversation {\n          id\n        }\n        sender\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "85a0dd85f3d5f7d75431888fc6e6916c";

export default node;
