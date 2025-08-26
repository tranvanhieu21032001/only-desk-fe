/**
 * @generated SignedSource<<608488fde954ea2fd36498251a2d3fda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ContactGender = "FEMALE" | "MALE" | "%future added value";
export type ContactDetailsQuery$variables = {
  id: string;
};
export type ContactDetailsQuery$data = {
  readonly node: {
    readonly address?: string | null | undefined;
    readonly avatar?: string | null | undefined;
    readonly companyInfo?: {
      readonly city: string | null | undefined;
      readonly company: string | null | undefined;
      readonly country: string | null | undefined;
      readonly employees: number | null | undefined;
      readonly jobRole: string | null | undefined;
      readonly jobTitle: string | null | undefined;
      readonly website: string | null | undefined;
    } | null | undefined;
    readonly context?: {
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
    readonly createdAt?: any | null | undefined;
    readonly email?: string | null | undefined;
    readonly gender?: ContactGender | null | undefined;
    readonly id?: string;
    readonly isOnline?: boolean;
    readonly lastActivityAt?: any | null | undefined;
    readonly metadata?: any;
    readonly name?: string | null | undefined;
    readonly notes?: string | null | undefined;
    readonly notification?: boolean;
    readonly phoneNumber?: string | null | undefined;
    readonly rawId?: string;
    readonly segments?: ReadonlyArray<string>;
    readonly updatedAt?: any | null | undefined;
    readonly website?: string | null | undefined;
  } | null | undefined;
};
export type ContactDetailsQuery = {
  response: ContactDetailsQuery$data;
  variables: ContactDetailsQuery$variables;
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
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumber",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "website",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notification",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastActivityAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
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
  "name": "isOnline",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "segments",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notes",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metadata",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "CompanyInfo",
  "kind": "LinkedField",
  "name": "companyInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "company",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jobRole",
      "storageKey": null
    },
    (v9/*: any*/),
    (v19/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "employees",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v21 = {
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
    (v19/*: any*/),
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ContactDetailsQuery",
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
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/)
            ],
            "type": "Contact",
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
    "name": "ContactDetailsQuery",
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
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/)
            ],
            "type": "Contact",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "556963616d16681f9f6f5c31a2c30cb7",
    "id": null,
    "metadata": {},
    "name": "ContactDetailsQuery",
    "operationKind": "query",
    "text": "query ContactDetailsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Contact {\n      id\n      rawId\n      name\n      email\n      phoneNumber\n      address\n      gender\n      website\n      notification\n      lastActivityAt\n      avatar\n      createdAt\n      updatedAt\n      isOnline\n      segments\n      notes\n      metadata\n      companyInfo {\n        company\n        jobTitle\n        jobRole\n        website\n        city\n        country\n        employees\n      }\n      context {\n        countryCode\n        countryName\n        city\n        latitude\n        longitude\n        browser\n        os\n        timezone\n        language\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a6e7088165da61aa24ff93b7ed36be1";

export default node;
