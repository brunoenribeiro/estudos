import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export interface IGraphQLClient {
  query: (query: string, variables?: Record<string, any>) => Promise<any>;
  mutate: (mutation: string, variables?: Record<string, any>) => Promise<any>;
} 

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export const getGraphQLClient = (): IGraphQLClient => ({
  query(queryString, variables) {
    return client.query({ query: gql`${queryString}`, variables });
  },
  mutate(mutation, variables) {
    return client.mutate({ mutation: gql`${mutation}`, variables });
  }
})