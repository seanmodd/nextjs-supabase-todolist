import { createSlice } from '@reduxjs/toolkit';
import { sum, map, filter, uniqBy, reject } from 'lodash';
import { print } from 'graphql';
import { useRouter } from 'next/router';
import { HYDRATE } from 'next-redux-wrapper';
// utils
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';
import axios from '../../utils/axios';
//

const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  sortBy: 'popularity',
  filters: {
    makes: [],
    dealership: [],
    category: '',
    priceRange: [0, 100000],
    milesOdometer: [0, 100000],
    gender: [],
    colors: [],
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading: (state) => {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getVariantsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getVariantSuccess: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    // DELETE PRODUCT
    deleteProduct: (state, action) => {
      state.products = reject(state.products, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts: (state, action) => {
      state.sortBy = action.payload;
    },

    // set initial filters
    // setFilters: (state, action) => {
    //   state.filters.priceRange = [0, action.payload.]
    // }

    filterProducts: (state, action) => {
      state.filters.makes = action.payload.makes;
      state.filters.dealership = action.payload.dealership;
      state.filters.category = action.payload.category;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.milesOdometer = action.payload.milesOdometer;
    },

    // CHECKOUT
    getCart: (state, action) => {
      const cart = action.payload;

      const subtotal = sum(
        cart.map((product) => product.price * product.quantity)
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart: (state, action) => {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart: (state, action) => {
      const updateCart = filter(
        state.checkout.cart,
        (item) => item.id !== action.payload
      );

      state.checkout.cart = updateCart;
    },

    resetCart: (state) => {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep: (state) => {
      state.checkout.activeStep -= 1;
    },

    onNextStep: (state) => {
      state.checkout.activeStep += 1;
    },

    onGotoStep: (state, action) => {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling: (state, action) => {
      state.checkout.billing = action.payload;
    },

    applyDiscount: (state, action) => {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping: (state, action) => {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.subject,
    }),
  },
});

// Reducer
export default slice;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteProduct,
  createBilling,
  applyShipping,
  applyDiscount,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

//! MOVING GRAPHQL HERE

const ALLCARSQUERY = (dataPerPage, pageNum, filters) => gql`
  query Variants {
    variants(
      limit: ${dataPerPage}, 
      start: ${(pageNum - 1) * dataPerPage},
      where: {
        ${
          filters.make?.length
            ? `make_in: ${JSON.stringify(filters.make)},`
            : ''
        }
        ${
          filters.dealership?.length
            ? `car_dealership_in: ${JSON.stringify(filters.dealership)},`
            : ''
        }
        ${filters.type ? `type: ${filters.type},` : ''}
        price_gte: ${filters.price_gte},
        price_lte: ${filters.price_lte},
        int_car_odometer_gte: ${filters.int_car_odometer_gte},
        int_car_odometer_lte: ${filters.int_car_odometer_lte}
      }) {
      id
      car_currentCarURL
      car_name
      car_make_name
      car_price
      price
      year
      vehicle_status
      car_vin
      int_car_views
      int_car_odometer
      car_exteriorColor
      car_imgSrcUrl_1
      car_dealership
      make
      model
      city_mileage
      highway_mileage
      manufacture_data_manufacture_mpg_city
      manufacture_data_manufacture_mpg_highway
    }
  }
`;
const CARSMAKEQUERY = gql`
  query VariantsMake($where: JSON) {
    variants(where: $where) {
      id
      car_carFax_status
      car_currentCarURL
      car_name
      car_make_name
      car_price
      price
      active
      car_year
      year
      vehicle_status
      car_vin
      car_stock
      int_car_views
      int_car_odometer
      int_car_samplePayment
      int_car_samplePaymentDetails_Months
      int_car_samplePaymentDetails_APR
      int_car_samplePaymentDetails_DownPayment
      car_exteriorColor
      car_carFaxUrl
      car_imgSrcUrl_1
      car_imgSrcUrl_2
      car_imgSrcUrl_3
      car_imgSrcUrl_4
      car_imgSrcUrl_5
      car_imgSrcUrl_6
      car_dealership
      car_carFax_details_status
      car_carFax_details_status2
      carfax_previousOwnerCount
      make
      model
      trim
      style
      type
      doors
      fuel_type
      fuel_capacity
      city_mileage
      highway_mileage
      engine
      engine_cylinders
      transmission
      transmission_short
      transmission_type
      transmission_speeds
      drivetrain
      anti_brake_system
      steering_type
      curb_weight
      gross_vehicle_weight_rating
      overall_height
      overall_length
      overall_width
      standard_seating
      invoice_price
      delivery_charges
      manufacturer_suggested_retail_price
      production_seq_number
      front_brake_type
      rear_brake_type
      turning_diameter
      front_suspension
      rear_suspension
      front_spring_type
      rear_spring_type
      front_headroom
      rear_headroom
      front_legroom
      rear_legroom
      standard_towing
      maximum_towing
    }
  }
`;

const MYCARQUERY = gql`
  query Variant($id: ID!) {
    variant(id: $id) {
      id
      car_carFax_status
      car_currentCarURL
      car_name
      car_make_name
      car_price
      price
      active
      car_year
      year
      vehicle_status
      car_vin
      car_stock
      int_car_views
      int_car_odometer
      int_car_samplePayment
      int_car_samplePaymentDetails_Months
      int_car_samplePaymentDetails_APR
      int_car_samplePaymentDetails_DownPayment
      car_exteriorColor
      car_carFaxUrl
      car_imgSrcUrl_1
      car_imgSrcUrl_2
      car_imgSrcUrl_3
      car_imgSrcUrl_4
      car_imgSrcUrl_5
      car_imgSrcUrl_6
      car_dealership
      car_carFax_details_status
      car_carFax_details_status2
      carfax_previousOwnerCount
      make
      model
      trim
      style
      type
      doors
      fuel_type
      fuel_capacity
      city_mileage
      highway_mileage
      engine
      engine_cylinders
      transmission
      transmission_short
      transmission_type
      transmission_speeds
      drivetrain
      anti_brake_system
      steering_type
      curb_weight
      gross_vehicle_weight_rating
      overall_height
      overall_length
      overall_width
      standard_seating
      invoice_price
      delivery_charges
      manufacturer_suggested_retail_price
      production_seq_number
      front_brake_type
      rear_brake_type
      turning_diameter
      front_suspension
      rear_suspension
      front_spring_type
      rear_spring_type
      front_headroom
      rear_headroom
      front_legroom
      rear_legroom
      standard_towing
      maximum_towing
    }
  }
`;

export const GET_DATA_FOR_FILTERS = gql`
  query Variants {
    variantsConnection {
      aggregate {
        count
        max {
          price
        }
        max {
          int_car_odometer
        }
      }
      groupBy {
        car_dealership {
          key
        }
        make {
          key
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

// ----------------------------------------------------------------------
export function getVariants(
  dataPerPage = 24,
  pageNum = 1,
  filters = {
    make: initialState.filters.makes,
    dealership: initialState.filters.dealership,
    type: initialState.filters.category,
    price_gte: initialState.filters.priceRange[0],
    price_lte: initialState.filters.priceRange[1],
    int_car_odometer_gte: initialState.filters.milesOdometer[0],
    int_car_odometer_lte: initialState.filters.milesOdometer[1],
  }
) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const q = ALLCARSQUERY(dataPerPage, pageNum, filters);
      const response = await client.query({
        query: q,
      });

      console.log(
        'product.js	491	response.data.variants',
        print(q),
        response.data.variants
      );

      dispatch(slice.actions.getVariantsSuccess([...response.data.variants]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export const getTotalVehiclesCount = async (filters) => {
  const response = await client.query({
    query: ALLCARSQUERY(0, 0, filters),
  });

  return response.data.variants?.length;
};

// ----------------------------------------------------------------------

export function getVariant(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/api/strapi-graphql/query-singleProduct',
        {
          params: { id },
        }
      );

      dispatch(slice.actions.getVariantSuccess(response.data.variant));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getVariantGraphQl(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await client.query({
        // query: CARQUERY,
        query: MYCARQUERY,
        variables: { id },
      });
      dispatch(slice.actions.getVariantSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getVariantMakeGraphQl(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const where = {
        car_make_name_contains: id,
      };

      const response = await client.query({
        query: CARSMAKEQUERY,
        variables: { where },
      });

      dispatch(slice.actions.getVariantSuccess(response.data.variants));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export const getMakesQuery = async () => {
  const response = await client.query({
    query: GET_DATA_FOR_FILTERS,
  });

  return response.data.variantsConnection;
};
