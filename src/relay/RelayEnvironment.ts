import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import Cookies from 'js-cookie';

const fetchQuery = async (operation: any, variables: any) => {
  const accessToken = Cookies.get('_access_token');
  const response = await fetch('https://api.sombes.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return await response.json();
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
