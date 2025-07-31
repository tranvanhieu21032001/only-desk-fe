/**
 * @generated SignedSource<<49498bd88e63051ca58d31d7855da0db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HelpdeskPublicSettingsQuery$variables = Record<PropertyKey, never>;
export type HelpdeskPublicSettingsQuery$data = {
  readonly helpdeskPublicSettings: {
    readonly banner: string | null | undefined;
    readonly basicDomain: string;
    readonly customDomain: string | null | undefined;
    readonly languages: ReadonlyArray<string> | null | undefined;
    readonly logo: string | null | undefined;
    readonly name: string;
  };
};
export type HelpdeskPublicSettingsQuery = {
  response: HelpdeskPublicSettingsQuery$data;
  variables: HelpdeskPublicSettingsQuery$variables;
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
    "name": "HelpdeskPublicSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskSettings",
        "kind": "LinkedField",
        "name": "helpdeskPublicSettings",
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
    "name": "HelpdeskPublicSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HelpdeskSettings",
        "kind": "LinkedField",
        "name": "helpdeskPublicSettings",
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
    "cacheID": "eba933ea92f4cb0e83a0a49cf839e65f",
    "id": null,
    "metadata": {},
    "name": "HelpdeskPublicSettingsQuery",
    "operationKind": "query",
    "text": "query HelpdeskPublicSettingsQuery {\n  helpdeskPublicSettings {\n    basicDomain\n    customDomain\n    logo\n    banner\n    name\n    languages\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b709aaeca25c8512709a7c00468698dc";

export default node;
