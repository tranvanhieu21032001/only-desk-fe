/**
 * @generated SignedSource<<418bb340470071157f70c2e949389ec6>>
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
    readonly baseDomain: string;
    readonly customDomain: string | null | undefined;
    readonly languages: ReadonlyArray<string> | null | undefined;
    readonly logo: string | null | undefined;
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
  "name": "baseDomain",
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
          (v4/*: any*/)
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
    "cacheID": "ec068bbdf107addee5b5e27750c6cdaa",
    "id": null,
    "metadata": {},
    "name": "HelpdeskSettingsQuery",
    "operationKind": "query",
    "text": "query HelpdeskSettingsQuery {\n  helpdeskSettings {\n    baseDomain\n    customDomain\n    logo\n    banner\n    languages\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "aecf50c8fd9a6bcbd9d932d76e3ece20";

export default node;
