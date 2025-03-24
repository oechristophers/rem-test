import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const generalApiSlice = createApi({
  reducerPath: 'generalApi', // Used to store this API's state in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://app.wewantwaste.co.uk/api/', // Your base URL for API requests
    prepareHeaders: (headers) => {
      // Setting common headers, like Authorization
      headers.set('Content-Type', 'application/json');
     
      return headers;
    },
  }),
  endpoints: () => ({}), // This slice will not define any specific endpoints, just the base config
});

export default generalApiSlice;