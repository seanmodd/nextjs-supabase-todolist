//* Where there can be a process.env.NEXT_PUBLIC_STRAPI_FETCH variable on line 5 for the ApolloClient
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://admin.shopcarx.com/graphql`,
  cache: new InMemoryCache(),
});

export default client;

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      name
      # description
      id
      # featured
      # description
      variants {
        id
        price
      }
    }
  }
`;

const GET_FEATURED_PRODUCTS_ONLY = gql`
  query FeaturedProducts {
    products(where: { featured: true }) {
      name
      featured
    }
  }
`;
const GET_ALL_VARIANTS = gql`
  query Variants {
    variants {
      id
      # qty
      # color
      # size
      # style
      price
      product {
        id
        name
        category {
          id
          # name
          # description
        }
        id
        # promo
        # featured
        # description
      }
      images {
        id
        url
        height
        width
        name
      }
    }
  }
`;

export {
  GET_CATEGORIES,
  GET_ALL_PRODUCTS,
  GET_ALL_VARIANTS,
  GET_FEATURED_PRODUCTS_ONLY,
};
