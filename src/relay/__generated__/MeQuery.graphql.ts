/**
 * @generated SignedSource<<6255e494df9de2b128f5a39338a2611e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MeQuery$variables = Record<PropertyKey, never>;
export type MeQuery$data = {
  readonly me:
    | {
        readonly avatar: string | null | undefined;
        readonly email: string;
        readonly firstName: string | null | undefined;
        readonly id: string;
        readonly lastName: string | null | undefined;
        readonly phone: string | null | undefined;
      }
    | null
    | undefined;
};
export type MeQuery = {
  response: MeQuery$data;
  variables: MeQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      concreteType: 'User',
      kind: 'LinkedField',
      name: 'me',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'id',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'firstName',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'lastName',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'email',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'avatar',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ];
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'MeQuery',
      selections: v0 /*: any*/,
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'MeQuery',
      selections: v0 /*: any*/,
    },
    params: {
      cacheID: '05f49fc08b7b3744c6f75e72dc5d7cc0',
      id: null,
      metadata: {},
      name: 'MeQuery',
      operationKind: 'query',
      text: 'query MeQuery {\n  me {\n    id\n    firstName\n    lastName\n    email\n    avatar\n  }\n}\n',
    },
  };
})();

(node as any).hash = 'f91b5ce5f0577eea62f93a759e394816';

export default node;
