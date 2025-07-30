/**
 * @generated SignedSource<<1b167a25d44e3241af6cb2ab3b19be0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HelpdeskSettingsQuery$variables = Record<PropertyKey, never>;
export type HelpdeskSettingsQuery$data = {
  readonly helpdeskSettings: {
    readonly banner: string | null | undefined;
    readonly basicDomain: string;
    readonly customDomain: string | null | undefined;
    readonly languages: ReadonlyArray<string> | null | undefined;
    readonly logo: string | null | undefined;
    readonly name: string;
  };
};
export type HelpdeskSettingsQuery = {
  response: HelpdeskSettingsQuery$data;
  variables: HelpdeskSettingsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "basicDomain",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customDomain",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "logo",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "banner",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "languages",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HelpdeskSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskSettings",
        "kind": "LinkedField",
        "name": "helpdeskSettings",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HelpdeskSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskSettings",
        "kind": "LinkedField",
        "name": "helpdeskSettings",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bbbf61a7d2311719aeb54a50bf8490bb",
    "id": null,
    "metadata": {},
    "name": "HelpdeskSettingsQuery",
    "operationKind": "query",
    "text": "query HelpdeskSettingsQuery {\n  helpdeskSettings {\n    basicDomain\n    customDomain\n    logo\n    banner\n    name\n    languages\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "95fc14392caac9c71c5b34daf8b8a9ea";

export default node;
