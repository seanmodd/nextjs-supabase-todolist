import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const isServer = typeof window === 'undefined';
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;

let CLIENT;

export function getApolloClient(forceNew) {
  if (!CLIENT || forceNew) {
    CLIENT = new ApolloClient({
      ssrMode: isServer,
      uri: 'https://api.shopcarx.com/graphql',
      cache: new InMemoryCache().restore(windowApolloState || {}),

      /**
        // Default options to disable SSR for all queries.
        defaultOptions: {
          // Skip queries when server side rendering
          // https://www.apollographql.com/docs/react/data/queries/#ssr
          watchQuery: {
            ssr: false
          },
          query: {
            ssr: false
          }
          // Selectively enable specific queries like so:
          // `useQuery(QUERY, { ssr: true });`
        }
      */
    });
  }

  return CLIENT;
}

export const CARSQUERY = gql`
  query Variants {
    variants(limit: 1000) {
      year
      vin: car_vin
      make
      model
      status: vehicle_status
      dealership: car_dealership
    }
  }
`;
