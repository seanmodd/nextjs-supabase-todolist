import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'src/graphql/apolloClient_and_queries';


export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
